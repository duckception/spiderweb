/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line no-use-before-define
import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Logs } from './components/Logs'
import { Actions } from './components/Actions'
import { ServerList } from './components/ServerList'
import { SpiderwebClient } from '@spiderweb/client'
interface TabPanelProps {
  children?: React.ReactNode,
  index: any,
  value: any,
}
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={10}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.paper,
  },
}))

const App = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [actions, setActions] = React.useState<any>([])
  const [serverList, setServerList] = React.useState<any>([])
  const [logs, setLogs] = React.useState<any>([])
  // const [executeReady, setExecuteReady] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  let client: SpiderwebClient
  // let handleExecute: (command: string) => void
  React.useEffect(() => {
    client = new SpiderwebClient('AlfaAgent')
    client.listen('Action', (data) => {
      console.log(data)
      if (data.action === 'read') {
        console.log(data.data)
        setActions(data.data)
      } else if (data.action === 'create') {
        console.log('CREATE')
        setActions((prevActions: string[]) => [...prevActions, data.data])
      }
    })
    client.send('Action', {
      action: 'read',
      data: {},
    })

    client.listen('Agent', (data) => {
      setServerList(data)
    })

    client.listen('Log', (data) => {
      console.log(data)
      if (data.action === 'read') {
        console.log(data.data)
        setLogs(data.data)
      } else if (data.action === 'create') {
        console.log('CREATE')
        setLogs((prevActions: string[]) => [...prevActions, data.data])
      }
    })
    client.send('Log', {
      action: 'read',
      data: {},
    })

    // setExecuteReady(true)
  }, [])

  const handleExecute = (command: string) => {
    client.send('Action', {
      action: 'execute',
      data: command,
    })
  }
  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
            <Tab label="Logs" {...a11yProps(0)} />
            <Tab label="Actions" {...a11yProps(1)} />
            <Tab label="Servers" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Logs logs={logs}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {client && <Actions actions={actions} handleExecute={handleExecute} />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ServerList serverList={serverList}/>
        </TabPanel>
      </div>
    </div>

  )
}

export default App
