import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { LogsItem } from './LogsItem'
import faker from 'faker/locale/cz'

//   const ServerLogsData:ILog= {
//     serverId: 2,
//     timestamp: new Date,
//     data: faker.lorem.words(),
//   }
interface ILog {
  serverId: number,
  timestamp: Date,
  data: string,
}

const serverLogsData:ILog[] = [{
  serverId: 1,
  timestamp: new Date(),
  data: faker.lorem.words(),
},
{
  serverId: 2,
  timestamp: new Date(),
  data: faker.lorem.words(),
}]

// export const Logs:React.FC<ILog> = ({serverId, timestamp, data}) => {
export const Logs:React.FC = () => {
// export const Logs = ({ILog}) => {

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
          {serverLogsData.map((row, index) => (
            <LogsItem key={index} serverId={row.serverId} timestamp={row.timestamp} data={row.data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}
