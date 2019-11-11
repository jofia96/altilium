import { MQTT_SUBSCRIBED, MQTT_FAIL, MQTT_RECONNECT, ADD_MQTT_FIXTURE_LOG, ADD_API_FIXTURE_LOG, TIMER } from '../actions/type'
import moment from 'moment'

const initialState = {
    isSubscribed: false,
    isApi: null,
    status: null,
    msg: []
}

export default function (state = initialState, action) {
    const { payload } = action
    switch (action.type) {
        case MQTT_SUBSCRIBED:
            return {
                ...state,
                isSubscribed: true,
                status: 'subscribed',
                url: payload
            }
        case MQTT_FAIL:
            return {
                ...state,
                isSubscribed: false,
                status: 'subscribtion failed'
            }
        case MQTT_RECONNECT:
            return {
                ...state,
                isSubscribed: false,
                status: 'reconnecting'
            }
        case ADD_API_FIXTURE_LOG:
            let apiArray = state.msg.slice()
            payload.map(row => {
                moment().diff(row.updatedAt, 'seconds') >= 30 && moment().diff(row.updatedAt, 'seconds') < 5 ?
                (row.last_received = 3)
                :
                moment().diff(row.updatedAt, 'seconds') < 30 ?
                    row.last_received = 0
                    : 
                    row.last_received = 5
                apiArray.push(row)
            }
            )
           
            return {
                ...state,
                status: "recieving api fixture_log",
                isApi: 'yes',
                msg: apiArray
            }
        case ADD_MQTT_FIXTURE_LOG:
            let mqttArray = state.msg.slice()
            mqttArray.push(payload)
          
            return {
                ...state,
                isApi: 'no',
                status: "recieving mqtt fixture_log",
                msg: mqttArray
            }
        case TIMER:
            let updateArray = state.msg.slice()
            updateArray.map(row =>
                row.last_received = row.last_received + 1)
           
            return {
                ...state,
                isApi: 'no',
                msg: updateArray
            }
        default:
            return state
    }

}