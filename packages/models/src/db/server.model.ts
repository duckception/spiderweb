import mongoose, { Schema, Document } from 'mongoose'

interface IServer extends Document {
  name: string,
  data: string,
}

const Server: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  data: { type: String, required: true },
})

const serverModel = mongoose.model<IServer>('Server', Server)

export {
  Server,
  serverModel,
  IServer,
}
