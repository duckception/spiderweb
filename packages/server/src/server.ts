import mongoose from 'mongoose'
import express, { Express } from 'express'
import { Server as SocketServer } from 'socket.io'
import { apiModel, IApi, IServer, models, Operation, serverModel } from '@spiderweb/models'
import { MONGODB_URI, mongooseConfig, PORT } from './config'
import { watchCollections } from './utils/watchCollections'
import cors from 'cors'

export default class SpiderwebServer {
  app: Express
  io: SocketServer
  activeAgents = new Set()

  constructor() {
    this.app = express()
    this.app.use(cors({
      origin: 'http://localhost:3000',
    }))
    this.app
    const server = this.app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`)
    })
    this.io = new SocketServer(server, {
      cors: {
        origin: 'http://localhost:3000',
      },
    })

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.setupAPI()

    void mongoose.connect(
      MONGODB_URI,
      mongooseConfig,
      (err) => {
        if (err) {
          throw err
        }

        console.log('Database connected')

        watchCollections(this.io, models)
      })
  }

  async setupAPI(): Promise<void> {
    this.io.on('connection', (socket: SocketServer) => {
      let agentId: string
      let server: IServer

      socket.on('Validation', async (data) => {
        console.log(data)
        await apiModel.findOne({ apiKey: data.apiKey }, async (err: any, doc: IApi): Promise<void> => {
          if (err) throw err
          if (!doc) {
            console.log('[Server] Closing socket connection due to invalid api key!')
            ;(socket as any).disconnect()
          }

          if (doc && data.agentName) {
            await serverModel.findOne({ agentName: data.agentName }, (err: any, doc: IServer): void => {
              if (err) throw err
              if (!doc) {
                console.log('[Server] Closing socket connection due to invalid agent name!')
                ;(socket as any).disconnect()
              } else {
                this.activeAgents.add(data.agentName)
                server = doc
                agentId = data.agentName
                console.log(`[server]: New agent connected - ${agentId}`)
                this.io.emit('Agent', [...this.activeAgents])
              }
            })
          }
        })
      })

      socket.on('disconnect', () => {
        if (agentId) {
          this.activeAgents.delete(agentId)
          console.log(`[server]: Agent disconnected - ${agentId}`)
          this.io.emit('Agent', [...this.activeAgents])
        } else {
          console.log('[server]: Connection disconnected')
        }
      })

      socket.on('Agent', (data) => {
        if (data.action === 'read') {
          this.io.emit('Agent', [...this.activeAgents])
        }
      })

      for (let i = 0; i < models.length; i++) {
        // * Type "any" is used to bamboozle TS intellisense
        const model = models[i] as any

        socket.on(model.modelName, (operation: Operation) => {
          console.log(operation)
          if (operation.action === 'read') {
            model.find(operation.data).populate('serverId').exec((err: any, docs: any) => {
              if (err) throw err
              const data: Operation = {
                action: 'read',
                data: docs,
              }
              this.io.emit(model.modelName, data)
            })
          } else if (operation.action === 'create') {
            if (agentId && server) {
              operation.data = {
                timestamp: Date.now(),
                ...operation.data,
                serverId: server._id,
              }
            }

            model.create(operation.data)

            const data: Operation = {
              action: 'create',
              data: operation.data,
            }

            this.io.emit(model.modelName, data)
          } else if (operation.action === 'delete') {
            // * Due to unknown reason this is randomly not working
            // // model.findOneAndDelete(operation.data)
          } else if (operation.action === 'update') {
            // * Same issue as with "delete"
          } else if (operation.action === 'execute') {
            model.findOne(operation.data, (err: any, docs: any) => {
              if (err) throw err
              console.log(`Executing script: ${docs.name}`)
              const data: Operation = {
                action: 'execute',
                data: docs.command,
              }
              this.io.emit(model.modelName, data)
            })
          }
        })
      }
    })
  }
}

// eslint-disable-next-line no-new
new SpiderwebServer()
