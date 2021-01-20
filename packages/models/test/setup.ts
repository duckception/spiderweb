import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { mongooseConfig } from '../src/config'

chai.use(chaiAsPromised)

export async function prepareMongoMemoryServer(): Promise<MongoMemoryServer> {
  const mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri, mongooseConfig)

  return mongoServer
}
