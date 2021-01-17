import Action from './action.model'
import Log from './log.model'
import Server from './server.model'

const models = [
  Action,
  Log,
  Server,
] as const

type Models = typeof models

export {
  models,
  Models,
}
