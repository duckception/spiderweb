import faker from 'faker'
import { serverModel, IServer } from '../../src/db/server.model'

export async function createRandomServerModel(): Promise<IServer> {
  return serverModel.create({
    name: faker.name.jobDescriptor(),
    data: faker.internet.ip(),
  })
}
