// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { LogsItem } from './LogsItem'
import { SpiderwebService } from '../services/SpiderwebService'
import { useState, useEffect } from 'react'

interface Props {
  spiderwebService: SpiderwebService,
}
export const Logs:React.FC<Props> = ({ spiderwebService }) => {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    spiderwebService.client.listen('Log', (data) => {
      console.log(data)
      if (data.action === 'read') {
        console.log(data.data)
        setLogs(data.data)
      } else if (data.action === 'create') {
        console.log('CREATE')
        setLogs((prevActions: string[]) => [...prevActions, data.data])
      }
    })
    spiderwebService.client.send('Log', {
      action: 'read',
      data: {},
    })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Server</TableCell>
            <TableCell align="center">Timestamp</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((row: any, index: any) => (
            <LogsItem key={index} serverId={row.serverId} timestamp={row.timestamp} data={row.data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}
