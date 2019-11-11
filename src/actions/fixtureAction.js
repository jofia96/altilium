import {   MQTT_SUBSCRIBED ,MQTT_FAIL, MQTT_RECONNECT ,ADD_MQTT_FIXTURE_LOG ,UPDATE_FIXTURE_LOG} from './type'
import mqtt from 'mqtt'
import store from '../store'
import moment from 'moment'
export const subscribeMqtt = (mqttUrl) => dispatch => {
const client  = mqtt.connect(mqttUrl)
    client.on('connect', function () {
        client.subscribe('fixture_status', function (err) {
            if(err){}
            dispatch ({
                type:MQTT_SUBSCRIBED,
                payload : mqttUrl
            })
        })
     })
     client.stream.on('error', function(err) {
        dispatch({
            type: MQTT_FAIL,
            payload:null
            
        })
    })
    client.on('reconnect' , function() {
        dispatch({
            type: MQTT_RECONNECT,
            payload:null
        })
    })

    client.on('message', function (topic, message) {

        var fixture_log =store.getState().fixture.msg 
        //HERE FIXTURE IS FIXTUREREDUCER

        var jsonStr = JSON.parse(message.toString());
        const buf=Buffer.from(jsonStr.data);
        var fixtureid = buf.toString('hex', 3, 11)
        //var fixtureid = id.toUpperCase()
        var fixturePowermode = buf.readUInt8(11)
        var fixtureOccupancy = buf.readUInt8(11)
        var fixtureBattery = buf.readUInt8(12)
        var fixtureBrightness = buf.readUInt8(21)
        var fixtureOpmode = buf.readUInt8(19)

            if((fixtureOccupancy & 0x20) === 0x20) {
                fixtureOccupancy = "Present"
            }
            else{
                fixtureOccupancy = "Absent"
            }
        
           if((fixtureBattery & 0x80 )=== 0x80 ) {
            fixtureBattery = (fixtureBattery & 0x7f) 
            }
            else{
                fixtureBattery="Invalid"
            }
            if((fixturePowermode & 0xc0)=== 0x00){
                fixturePowermode = "Battery" 
            }
            else if( (fixturePowermode & 0xc0) === 0x40){
                fixturePowermode = "Grid" 
            }
            else {
                fixturePowermode = "Charge"
            }
        if(fixture_log.length > 0){
            var found = fixture_log.find(function(element){
              if(element.fixtureid === fixtureid) {
                if(element.powerMode !== fixturePowermode || element.occupancy !== fixtureOccupancy ||element.Brightnesslevel !== fixtureBrightness || element.batteryLevel !== fixtureBattery || element.LuminariesOpMode !==fixtureOpmode){

                  element.fixtureid = fixtureid
                  element.powerMode =fixturePowermode 
                  element.occupancy =fixtureOccupancy
                  element.Brightnesslevel=fixtureBrightness
                  element.batteryLevel=fixtureBattery
                  element.LuminariesOpMode = fixtureOpmode.toString()
                  element.last_received = 0
                  element.timeStamp = moment().format('hh:mm A')

                }
                return true
              }
            })
            if(!found) {
                dispatch ({
                    type:ADD_MQTT_FIXTURE_LOG,
                    payload : {fixtureid : fixtureid, powerMode : fixturePowermode ,occupancy:fixtureOccupancy ,Brightnesslevel : fixtureBrightness,batteryLevel : fixtureBattery, LuminariesOpMode : fixtureOpmode.toString() ,last_received : 0,timeStamp : moment().format('hh:mm A') }
                })
            } 
          }
        else{
            dispatch ({
                type:ADD_MQTT_FIXTURE_LOG,
                payload : {fixtureid : fixtureid, powerMode : fixturePowermode , occupancy:fixtureOccupancy ,Brightnesslevel : fixtureBrightness,batteryLevel : fixtureBattery, LuminariesOpMode : fixtureOpmode.toString() ,last_received : 0 ,timeStamp : moment().format('hh:mm A')}
            })
        }
    })
}

// export  const updateFixtureLog = () =>  dispatch => {
        
//     dispatch({
//         type: UPDATE_FIXTURE_LOG,
     
//     })
    
// }