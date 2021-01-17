import faker from 'faker'
import Server, { IServer } from '../../src/models/server.model'

export async function createRandomServerModel(): Promise<IServer> {
  return Server.create({
    name: faker.name.jobDescriptor(),
    data: faker.internet.ip(),
  })
}
