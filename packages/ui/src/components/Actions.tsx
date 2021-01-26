import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined'
import { SpiderwebService } from '../services/SpiderwebService'
import { useState, useEffect } from 'react'
import { SpiderwebClient } from '@spiderweb/client'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

interface Props {
  spiderwebService: SpiderwebService,
}

export const Actions: React.FC<Props> = ({ spiderwebService }) => {
  const classes = useStyles()
  const [actions, setActions] = useState<any[]>([])

  useEffect(() => {
    spiderwebService.client.listen('Action', (data) => {
      console.log(data)
      if (data.action === 'read') {
        console.log(data.data)
        setActions(data.data)
      } else if (data.action === 'create') {
        console.log('CREATE')
        setActions((prevActions: string[]) => [...prevActions, data.data])
      }
    })
    spiderwebService.client.send('Action', {
      action: 'read',
      data: {},
    })
  }, [])

  const handleExecute = (client: SpiderwebClient, commandName: string) => {
    client.send('Action', {
      action: 'execute',
      data: {
        name: commandName,
      },
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Server</TableCell>
            <TableCell align="right">Command</TableCell>
            <TableCell align="right">Execute  </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actions.map((action: any, index: number) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" >
                {action.name}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {action.command}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleExecute(spiderwebService.client, action.name)}
                >
                  <CodeOutlinedIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}
