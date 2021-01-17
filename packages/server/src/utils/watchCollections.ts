import { Server } from 'socket.io'
import { Models } from '../models/index'

export function watchCollections(io: Server, models: Models): void {
  for (const model of models) {
    model.watch().on('change', (change) => {
      io.emit(model.modelName, change)
    })
  }
}
