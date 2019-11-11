import React,{useEffect,useState} from 'react'
import {subscribeMqtt} from '../../actions/fixtureAction'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { subscribeApi,timer} from '../../actions/apiFixtureAction';
import { Grid, Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import FixtureTable from './fixtureTable'


const useStyles = makeStyles(theme => ({
  card: {
    height:30,
    width:30
  },
}));

const Fixture = ({subscribeMqtt,subscribeApi,timer,msg,}) => {
  const classes = useStyles();
  const [ message , setMessage ] = useState("")
  
 

  useEffect(()=> {
    //subscribeApi()
    subscribeMqtt('ws://192.168.33.118:9001')
    setInterval(()=>{
      setMessage(timer())
    },10000)
  },[timer,subscribeMqtt,subscribeApi])

  return(
  <div>
    <Grid container spacing={2}>
            {   
              msg.map(fixture => 
                <Grid item xs key={fixture.fixtureid}>
                  <Card className={classes.card}
                    style = { {backgroundColor: fixture.last_received < 3 ? ("green") :
                    (fixture.last_received >= 3 && fixture.last_received < 5 ? "orange" : "red")}}
                  ></Card>
                </Grid>
              )  
            }  
            
    </Grid>
    <br/>
    <FixtureTable/> 
  </div>
  )
} 
Fixture.propTypes ={
  subscribeApi: PropTypes.func.isRequired,
  subscribeMqtt :PropTypes.func.isRequired,
  
  isSubscribed:PropTypes.bool,
  timer: PropTypes.func.isRequired,
  msg:PropTypes.array.isRequired
}
const mapStateToProps = state => ({
  isSubscribed: state.fixture.isSubscribed,
  isApi :state.fixture.isApi,
  msg: state.fixture.msg
})
export default connect(mapStateToProps,{subscribeMqtt,subscribeApi,timer})(Fixture)