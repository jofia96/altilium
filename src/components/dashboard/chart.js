import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BatteryChart from './batteryChart'
import LuminarChart1 from './luminarChart1'
import LuminarChart2 from './luminarChart2'
import { batteryStatus, OnBattery, OnGrid } from '../../actions/chartAction'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    height: 400
  },
  grid: {
    marginLeft: 50
  },
  text: {
    marginLeft: 45,
    marginTop: 20
  }
}));
const Chart = ({ batteryStatus }) => {
  const classes = useStyles();
  useEffect(() => {
    batteryStatus()
  }, [batteryStatus])

  return (
    <div>
      <Grid container spacing={5} className={classes.grid}>
        <Grid item xs={4}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title}>
                Battery Status
            </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.root}>
            <BatteryChart />
          </Paper>
        </Grid>
        <Grid item xs={7} >
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title}>
                Luminarie Statistics
            </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.root}>
            <Grid container>
              <Grid item xs={6} >
                <LuminarChart1 />
              </Grid>
              <Grid item xs={6} >
                <LuminarChart2 />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
Chart.propTypes = {
  batteryStatus: PropTypes.func.isRequired,
  OnGrid: PropTypes.func.isRequired,
  OnBattery: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({})
export default connect(mapStateToProps, { batteryStatus, OnGrid, OnBattery })(Chart)