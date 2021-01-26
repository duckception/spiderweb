// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { createServices } from './services'
import { ServiceContext } from './hooks/useServices'
import { SpiderwebService } from './services/SpiderwebService'

const services = createServices()
const spiderwebService = new SpiderwebService()

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={services}>
      <App spiderwebService={spiderwebService} />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
