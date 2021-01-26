import { SpiderwebClient } from '@spiderweb/client'

export interface Server {
  name: string,
  status: 0 | 1,
}

export class SpiderwebService {
  client: SpiderwebClient

  constructor() {
    this.client = new SpiderwebClient({ apiKey: 'YOUR_API_KEY_GOES_HERE' })
  }

  createAgentsList(prevAgents: Server[], newAgentsRaw: string[]): Server[] {
    const differenceRaw: string[] = prevAgents
      .map((server) => server.name)
      .filter(x => !newAgentsRaw.includes(x))
    const difference: Server[] = differenceRaw
      .map((serverName: string) => { return { name: serverName, status: 1 } })
    const newAgents: Server[] = newAgentsRaw
      .map((serverName: string) => { return { name: serverName, status: 0 } })

    return [...difference, ...newAgents]
  }
}
