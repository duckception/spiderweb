import { SERVER_URL, PORT } from './config'
import { io, Socket } from 'socket.io-client'

export class SpiderwebClient {
  socket: Socket

  constructor() {
    this.socket = io(`${SERVER_URL}:${PORT}`)
  }

  listen(modelName: string, callback: (data: any) => void): void {
    this.socket.on(modelName, callback)
  }
}
