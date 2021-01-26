import { SERVER_URL, PORT } from './config'
import { io, Socket } from 'socket.io-client'
import { Operation, Channel } from '@spiderweb/models'
import mongoose from 'mongoose'
import faker from 'faker'

export class SpiderwebClient {
  socket: Socket

  constructor(agentName?: string) {
    // this.socket = io(`${SERVER_URL}:${PORT}`)
    this.socket = io('http://localhost:4444')
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

  disconnect(): void {
    this.socket.disconnect()
  }
}

const client = new SpiderwebClient('Spidi')
// const id = mongoose.mongo.ObjectId.createFromTime(Date.now())
// client.send('Action', {
//   action: 'create',
//   data: {
//     name: faker.random.words(3),
//     command: faker.random.words(3),
//     serverId: id,
//   },
// })
