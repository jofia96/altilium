import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Fixture from '../nodes/fixture'
import Chart from '../dashboard/chart'

function TabPanel(props) {
  const { children, value, index,fixtureDetails, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={5}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs:{
      marginLeft:65,
      height:55
  }
}));

 function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
  },[props])

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabs}>
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Altilium Nodes" {...a11yProps(1)} />
          <Tab label="Schedules" {...a11yProps(2)} />
          <Tab label="Commissioning" {...a11yProps(3)} />
          <Tab label="Demand Response" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Chart/>
      </TabPanel>
      <TabPanel value={value} index={1}> 
        <Fixture/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Schedules
      </TabPanel>
      <TabPanel value={value} index={3}>
        Commissioning
      </TabPanel>
      <TabPanel value={value} index={4}>
        Demand Response
      </TabPanel>
    </div>
  );
}
export default SimpleTabs