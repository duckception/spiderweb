import faker from 'faker'
import { serverModel, IServer } from '../../src/db/server.model'

export async function createRandomServerModel(): Promise<IServer> {
  return serverModel.create({
    name: faker.lorem.words(10),
    agentName: faker.lorem.words(10),
    data: {
      ip: faker.internet.ip(),
    },
  })
}
