import { useContext, createContext } from 'react'

import { Services } from '../services/index'

export const ServiceContext = createContext({} as Services)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useServices () {
  return useContext(ServiceContext)
}
