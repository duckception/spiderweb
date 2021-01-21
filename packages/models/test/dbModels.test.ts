import { expect } from 'chai'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { prepareMongoMemoryServer } from './setup'
import { logModel } from '../src/db/log.model'
import { serverModel } from '../src/db/server.model'
import faker from 'faker'
import { createRandomServerModel } from './helpers/createRandomServerModel'
import { actionModel } from '../src/db/action.model'

let mongoServer: MongoMemoryServer

before(async () => {
  mongoServer = await prepareMongoMemoryServer()
})

after(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('database models', () => {
  it('server', async () => {
    await createRandomServerModel()
    expect(await serverModel.countDocuments()).to.equal(1)
  })

  it('log', async () => {
    const server = await createRandomServerModel()

    await logModel.create({
      serverId: server._id,
      timestamp: faker.time.recent(),
      data: faker.lorem.words(),
    })

    expect(await logModel.countDocuments()).to.equal(1)
  })

  it('action', async () => {
    const server = await createRandomServerModel()

    await actionModel.create({
      serverId: server._id,
      name: faker.name.findName(),
      command: faker.lorem.words(),
    })

    expect(await actionModel.countDocuments()).to.equal(1)
  })
})
