import mongoose, { Schema, Document } from 'mongoose'

export interface IServer extends Document {
  name: string,
  data: string,
}

const Server: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  data: { type: String, required: true },
})

export default mongoose.model<IServer>('Server', Server)
