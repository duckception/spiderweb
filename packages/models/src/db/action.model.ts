import mongoose, { Schema, Document } from 'mongoose'
import { IServer } from './server.model'

interface IAction extends Document {
  name: string,
  serverId: IServer['_id'],
  command: string,
}

const Action: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  serverId: { type: Schema.Types.ObjectId, required: true },
  command: { type: String, required: true },
})

const actionModel = mongoose.model<IAction>('Action', Action)

export {
  Action,
  actionModel,
  IAction,
}
