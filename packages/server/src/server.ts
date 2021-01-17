import mongoose from 'mongoose'
import { createServer, Server as HttpServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { MONGODB_URI, mongooseConfig } from './config'
import { watchCollections } from './utils/watchCollections'
import { models } from './models/index'

export default class SpiderwebServer {
  private httpServer: HttpServer
  io: SocketServer

  constructor() {
    this.httpServer = createServer()
    this.io = new SocketServer(this.httpServer)
  }

  start(port: number): void {
    this.httpServer.listen(port)

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
}
