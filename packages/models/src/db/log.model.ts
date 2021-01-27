import mongoose, { Schema, Document } from 'mongoose'
import { IServer } from './server.model'

interface ILog extends Document {
  serverId: IServer['_id'],
  timestamp: Date,
  data: Record<string, unknown>,
}

const Log: Schema = new Schema({
  serverId: { type: Schema.Types.ObjectId, required: true, ref: 'Server' },
  timestamp: { type: Date, required: true },
  data: { type: Object, required: true },
})

const logModel = mongoose.model<ILog>('Log', Log)

export {
  Log,
  logModel,
  ILog,
}
