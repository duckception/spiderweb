import mongoose, { Schema, Document } from 'mongoose'

interface IApi extends Document {
  apiKey: string,
}

const Api: Schema = new Schema({
  apiKey: { type: String, required: true, unique: true },
})

const apiModel = mongoose.model<IApi>('Action', Api)

export {
  Api,
  apiModel,
  IApi,
}
