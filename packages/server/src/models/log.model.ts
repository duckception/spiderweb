import mongoose, { Schema, Document } from 'mongoose'
import { IServer } from './server.model'

export interface ILog extends Document {
  serverId: IServer['_id'],
  timestamp: Date,
  data: string,
}

const Log: Schema = new Schema({
  serverId: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, required: true },
  data: { type: String, required: true },
})

export default mongoose.model<ILog>('Log', Log)
