import { expect } from 'chai'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { prepareMongoMemoryServer } from './setup'
import Log from '../src/models/log.model'
import Server from '../src/models/server.model'
import faker from 'faker'
import { createRandomServerModel } from './helpers/createRandomServerModel'
import Action from '../src/models/action.model'

let mongoServer: MongoMemoryServer

before(async () => {
  mongoServer = await prepareMongoMemoryServer()
})

after(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('models', () => {
  it('server', async () => {
    await createRandomServerModel()
    expect(await Server.countDocuments()).to.equal(1)
  })

  it('log', async () => {
    const server = await createRandomServerModel()

    await Log.create({
      serverId: server._id,
      timestamp: faker.time.recent(),
      data: faker.lorem.words(),
    })

    expect(await Log.countDocuments()).to.equal(1)
  })

  it('action', async () => {
    const server = await createRandomServerModel()

    await Action.create({
      serverId: server._id,
      name: faker.name.findName(),
      command: faker.lorem.words(),
    })

    expect(await Action.countDocuments()).to.equal(1)
  })
})
