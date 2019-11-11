import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import PersonIcon from '@material-ui/icons/Person'
import BatteryFullIcon from '@material-ui/icons/BatteryFull'
import Slider from '@material-ui/core/Slider'
import React from 'react'
import { updateFixtureLog } from '../../actions/fixtureAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  rows: {
    border: '1px solid',
    borderColor: '#0362fc',
  }
})
const marks = [
  {
    value: 0,
    value: 100,
  }
];
const FixtureTable = ({ msg }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Icon></Icon>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow className={classes.rows}>
            <TableCell align="center">All Floors</TableCell>
            <TableCell align="center">All Groups</TableCell>
            <TableCell align="center">Fixture ID</TableCell>
            <TableCell align="center">All Nodes</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">PowerMode</TableCell>
            <TableCell align="center">Charge</TableCell>
            <TableCell align="center">Brightness</TableCell>
            <TableCell align="center">Last Read</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {msg.map(row => (
            <TableRow spacing={10} className={classes.rows}>
              <TableCell align="center" >{row.AllFloors}</TableCell>
              <TableCell align="center">{row.AllGroups}</TableCell>
              <TableCell align="center">{row.fixtureid}</TableCell>
              <TableCell align="center">{row.ALLNodes}</TableCell>
              <TableCell align="center">{ (row.occupancy === "Present") ? <PersonIcon color="primary" /> : <PersonIcon />}
              </TableCell>
              <TableCell align="center">{(row.powerMode) }
              </TableCell>
              <TableCell align="center">
                <BatteryFullIcon /> <br />
                {(row.batteryLevel) } %
              </TableCell>
              <TableCell align="center">
                <Slider
                  value={row.Brightnesslevel}
                  marks={marks}
                /><br />
                {row.Brightnesslevel} % </TableCell>
              <TableCell align="center">{row.timeStamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
FixtureTable.propTypes = {
  
  msg: PropTypes.array.isRequired
}
const mapStateToProps = state => ({
 
  msg: state.fixture.msg
})
export default connect(mapStateToProps, {})(FixtureTable)
