import { SERVER_URL, PORT } from './config'
import { io, Socket } from 'socket.io-client'
import { Operation, Channel } from '@spiderweb/models'

export class SpiderwebClient {
  socket: Socket

  constructor(agentName?: string) {
    this.socket = io(`${SERVER_URL}:${PORT}`)
    console.log(`[client]: Connected to ${SERVER_URL}:${PORT}`)
    if (agentName) {
      this.socket.emit('Agent Registration', agentName)
    }
  }

  listen(channel: Channel, callback: (data: any) => void): void {
    console.log(`[client]: Listening on channel - ${channel}`)
    this.socket.on(channel, callback)
  }

  send(channel: Channel, data: Operation): void {
    this.socket.emit(channel, data)
  }
}
