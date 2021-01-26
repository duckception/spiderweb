import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { IServer } from '@spiderweb/models'
// eslint-disable-next-line no-use-before-define
import React from 'react'

// export const Logs:React.FC<ILog> = ({serverId, timestamp, data}) => {

interface Props{
  serverId: IServer['_id'],
  timestamp: Date,
  data: any,
}
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

export const LogsItem:React.FC<Props> = ({ serverId, timestamp, data }) => {
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  // const logsData = data.split(' ')
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {serverId} my Server
        </TableCell>
        {/* <TableCell align="center">{timestamp.toLocaleDateString('en-US')}</TableCell> */}
        <TableCell align="center">{timestamp}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                        Logs
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Date</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(data).map((key: any) => (
                    <TableRow>
                      <TableCell key={key} component="th" scope="row">
                        {key} - {data[key]}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableCell align="right"></TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
