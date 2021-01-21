import { Server } from 'socket.io'
import { Models, Operation } from '@spiderweb/models'

export function watchCollections(io: Server, models: Models): void {
  for (const model of models) {
    model.watch().on('change', (change) => {
      const operation: Operation = {
        action: 'raw',
        data: change,
      }
      console.log(operation)
      io.emit(model.modelName, operation)
    })
  }
}
