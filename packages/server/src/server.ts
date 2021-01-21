import mongoose from 'mongoose'
import express, { Express } from 'express'
import { Server as SocketServer } from 'socket.io'
import { models, Operation } from '@spiderweb/models'
import { MONGODB_URI, mongooseConfig, PORT } from './config'
import { watchCollections } from './utils/watchCollections'

export default class SpiderwebServer {
  app: Express
  io: SocketServer
  activeAgents = new Set()

  constructor() {
    this.app = express()
    this.app
    const server = this.app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`)
    })
    this.io = new SocketServer(server)

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

      socket.on('Agent Registration', (data) => {
        agentId = data
        this.activeAgents.add(data)
        console.log(`[server]: New agent connected - ${agentId}`)
        this.io.emit('Agent', [...this.activeAgents])
      })

      socket.on('disconnect', () => {
        this.activeAgents.delete(agentId)
        console.log(`[server]: Agent disconnected - ${agentId}`)
        this.io.emit('Agent', [...this.activeAgents])
      })

      for (let i = 0; i < models.length; i++) {
        // * Type "any" is used to bamboozle TS intellisense
        const model = models[i] as any

        socket.on(model.modelName, (operation: Operation) => {
          console.log(operation)
          if (operation.action === 'read') {
            model.find(operation.data, (err: any, docs: any) => {
              if (err) throw err
              const data: Operation = {
                action: 'read',
                data: docs,
              }
              this.io.emit(model.modelName, data)
            })
          } else if (operation.action === 'create') {
            model.create(operation.data)
          } else if (operation.action === 'delete') {
            // * Due to unknown reason this is randomly not working
            // // model.findOneAndDelete(operation.data)
          } else if (operation.action === 'update') {
            // * Same issue as with "delete"
          } else if (operation.action === 'execute') {
            model.find(operation.data, (err: any, docs: any) => {
              if (err) throw err
              const data: Operation = {
                action: 'execute',
                data: docs,
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
