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

// const useRowStyles = makeStyles({
//   root: {
//     '& > *': {
//       borderBottom: 'unset',
//     },
//   },
// })

//   const ServerLogsData:ILog= {
//     serverId: 2,
//     timestamp: new Date,
//     data: faker.lorem.words(),
//   }

interface Props {
  logs: any,
}
export const Logs:React.FC<Props> = ({ logs }) => {
  console.log(logs)
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
