import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Container, TableContainer } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { useState, useEffect } from 'react'
import { Server, SpiderwebService } from '../services/SpiderwebService'

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
  spiderwebService: SpiderwebService,
}

export const ServerList:React.FC<Props> = ({ spiderwebService }) => {
  const classes = useStyles()
  const checkStatusClass = (status: number) => {
    if (status === 0) {
      return classes.connected
    } else if (status === 1) {
      return classes.canceled
    }
  }

  const [serverList, setServerList] = useState<Server[]>([])

  useEffect(() => {
    spiderwebService.client.listen('Agent', (data) => {
      setServerList((prevServerList: Server[]) => spiderwebService.createAgentsList(prevServerList, data))
    })

    spiderwebService.client.send('Agent', {
      action: 'read',
      data: {},
    })
  }, [])

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
          {serverList.map((server: Server) => (
            <TableRow key={server.name ?? 0}>
              <TableCell >
                {server.name}
              </TableCell>
              <TableCell align='center' scope='row' component='th'>
                <Container maxWidth='xs' className={checkStatusClass(server.status)}>
                  {server.status === 0 ? 'Connected' : 'Disconnected'}
                </Container>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
