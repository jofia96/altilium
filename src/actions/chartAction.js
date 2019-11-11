import { BATTERY_STATUS, ON_GRID, ON_BATTERY, OPMODE_ON, OPMODE_OFF, LITALITY_NODES } from './type'
import axios from 'axios'


export const batteryStatus = () => async dispatch => {
    try {
        const res = await axios.get('http://192.168.33.106:8080/api/v1/batterystatus')
        dispatch({
            type: BATTERY_STATUS,
            payload: res.data
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

export const OnGrid = () => async dispatch => {
    try {
        const res = await axios.get('http://192.168.33.106:8080/api/v1/ONGrid')
        dispatch({
            type: ON_GRID,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const OnBattery = () => async dispatch => {
    try {
        const res = await axios.get('http://192.168.33.106:8080/api/v1/ONBattery')
        dispatch({
            type: ON_BATTERY,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const opModeOff = () => async dispatch => {
    try {
        const res = await axios.get('http://192.168.33.106:8080/api/v1/opmodeoff')
        dispatch({
            type: OPMODE_OFF,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const opModeOn = () => async dispatch => {
    try {
        const res = await axios.get('http://192.168.33.106:8080/api/v1/opmodeon')
        dispatch({
            type: OPMODE_ON,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
export const litalityNodes = () => async dispatch => {
    try {
        const res = await axios.get('http://192.168.33.106:8080/api/v1/litalitynodes')
        dispatch({
            type: LITALITY_NODES,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }
}
