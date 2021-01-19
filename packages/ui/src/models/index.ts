import Action, { IAction } from './action.model'
import Log, { ILog } from './log.model'
import Server, { IServer } from './server.model'

const models = [
  Action,
  Log,
  Server,
] as const

type Models = typeof models

export {
  models,
  // Models,
  // IAction,
  // ILog,
  // IServer,
}
