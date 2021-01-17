import { config } from 'dotenv'
import { ConnectOptions } from 'mongoose'

config({
  path: '../../.env',
})

const mongooseConfig: ConnectOptions = {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
}

const MONGODB_URI = process.env.MONGODB_URI as string
const PORT = Number(process.env.PORT)

export {
  mongooseConfig,
  MONGODB_URI,
  PORT,
}
