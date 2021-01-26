import { SERVER_URL, PORT } from './config'
import { io, Socket } from 'socket.io-client'
import { Operation, Channel } from '@spiderweb/models'
import mongoose from 'mongoose'
import faker from 'faker'

interface SpiderwebClientConfig {
  apiKey: string,
  agentName?: string,
}

export class SpiderwebClient {
  socket: Socket

  constructor(config: SpiderwebClientConfig) {
    // this.socket = io(`${SERVER_URL}:${PORT}`)
    this.socket = io('http://localhost:4444')
    console.log(`[client]: Connected to ${SERVER_URL}:${PORT}`)

    if (config.apiKey) {
      this.socket.emit('Validation', { apiKey: config.apiKey, agentName: config.agentName })
    }
  }

  listen(channel: Channel, callback: (data: any) => void): void {
    console.log(`[client]: Listening on channel - ${channel}`)
    this.socket.on(channel, callback)
  }

  send(channel: Channel, data: Operation): void {
    this.socket.emit(channel, data)
  }

  disconnect(): void {
    this.socket.disconnect()
  }
}
