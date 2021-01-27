import { Action, IAction, actionModel } from './db/action.model'
import { Api, IApi, apiModel } from './db/api.model'
import { Log, ILog, logModel } from './db/log.model'
import { Server, IServer, serverModel } from './db/server.model'
import { Operation } from './server/operation.interface'
import { Channel } from './server/channel.interface'

const models = [
  actionModel,
  logModel,
  serverModel,
] as const

type Models = typeof models

export {
  models,
  Models,
  Action,
  IAction,
  actionModel,
  Api,
  IApi,
  apiModel,
  Log,
  ILog,
  logModel,
  Server,
  IServer,
  serverModel,
  Operation,
  Channel,
}
