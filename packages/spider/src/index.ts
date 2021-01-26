import { SpiderwebClient } from '@spiderweb/client'
import { Operation } from '@spiderweb/models'
import { exec, spawn } from 'child_process'

interface SpiderOptions {
  plugins?: string[],
}

export class Spider {
  client: SpiderwebClient

  constructor(apiKey: string, agentName: string, options?: SpiderOptions) {
    this.client = new SpiderwebClient({ apiKey, agentName })
    void this.prepareServerConnection()
  }

  async prepareServerConnection(): Promise<void> {
    this.client.listen('Action', (operation: Operation) => {
      if (operation.action === 'execute') {
        void this.executeCommand(operation.data)
      }
    })
  }

  async saveLog(data: string): Promise<void> {
    const operation: Operation = {
      action: 'create',
      data: {
        timestamp: Date.now(),
        data,
      },
    }
    this.client.send('Log', operation)
  }

  async executeScript(file: string, shell: string, interval?: number): Promise<void> {
    const execute = () => {
      const child = spawn(shell, [file])
      child.on('close', (status: string) => {
        console.log(status)
        void this.saveLog(status)
      })
    }

    if (interval) {
      setInterval(execute, interval)
    } else {
      execute()
    }
  }

  async executeCommand(command: string, interval?: number): Promise<void> {
    const execute = () => {
      exec(command, (err, stdout) => {
        if (err) throw err

        console.log(stdout.trim())
        void this.saveLog(stdout.trim())
      })
    }

    if (interval) {
      setInterval(execute, interval)
    } else {
      execute()
    }
  }
}
