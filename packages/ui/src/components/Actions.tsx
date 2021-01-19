import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import faker from 'faker'
import { Button } from '@material-ui/core'
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const actons = [{
  serverId: 1,
  name: faker.lorem.words(),
  command: faker.lorem.words(),
}]
export const Actions:React.FC = () => {
  // export const Logs = ({ILog}) => {
  // const { row } = props;
  const classes = useStyles()

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
          {actons.map((action, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" >
                {action.name}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {action.command}
              </TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="primary">
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
