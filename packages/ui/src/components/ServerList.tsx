import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Container, TableContainer } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  connected: {
    backgroundColor: '#02BD62',
    borderRadius: 3,
    color: 'white',
    padding: '0 30px',
    maxWidth: '10rem',
  },
  canceled: {
    backgroundColor: '#46333A',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(105, 255, 137, .3)',
    color: 'white',
    padding: '0 30px',
    maxWidth: '10rem',
  },
  connecting: {
    backgroundColor: '#F19B24',
    borderRadius: 2,
    boxShadow: '0 3px 5px 2px rgba(105, 255, 137, .3)',
    color: 'white',
    padding: '0 30px',
    maxWidth: '10rem',
  },
})
interface Props {
  serverList: any,
}
export const ServerList:React.FC<Props> = ({ serverList }) => {
  const classes = useStyles()
  const checkStatusClass = (status: number) => {
    if (status === 0) {
      return classes.connecting
    } else if (status === 1) {
      return classes.canceled
    }
    return classes.connected
  }
  const checkStatus = (status: number) => {
    if (status === 0) {
      return 'connecting'
    } else if (status === 1) {
      return 'canceled'
    }
    return 'connected'
  }
  console.log(serverList)
  console.log('SERVERRRRRLLLLLLLL')
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Server</TableCell>
            <TableCell align='center' scope='row' component='th'><Container>Status</Container></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serverList.map((row: any) => (
            <TableRow key={row.name}>
              <TableCell >
                {row}
              </TableCell>
              <TableCell align='center' scope='row' component='th'>
                <Container maxWidth='xs' className={checkStatusClass(row.status)}>
                  {checkStatus(row.status)}
                </Container>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
