import { config } from 'dotenv'

config({
  path: '../../.env',
})

const SERVER_URL = process.env.SERVER_URL as string
const PORT = Number(process.env.PORT)

export {
  SERVER_URL,
  PORT,
}
