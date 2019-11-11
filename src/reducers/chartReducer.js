import { BATTERY_STATUS, ON_GRID, ON_BATTERY, OPMODE_ON, OPMODE_OFF, LITALITY_NODES } from '../actions/type'

const initialState = {
    status: null,
    battery: 0,
    onGrid: 0,
    onBattery: 0,
    opmodeOn: 0,
    opmodeOff: 0,
    nodes: 0
}
export default function (state = initialState, action) {
    const { payload } = action
    switch (action.type) {

        case BATTERY_STATUS:
            let batteryLevel
            payload.map(row =>
                batteryLevel = row.batterystatus
            )
            return {
                ...state,
                status: ' getting battery status',
                battery: batteryLevel
            }
        case ON_GRID:
            let onGrid
            payload.map(row =>
                onGrid = row.ONGrid
            )
            return {
                ...state,
                status: 'getting ongrid data ',
                onGrid: onGrid
            }
        case ON_BATTERY:
            let onBattery
            payload.map(row =>
                onBattery = row.ONBattery
            )
            return {
                ...state,
                status: 'getting onbattery data ',
                onBattery: onBattery
            }

        case OPMODE_ON:
            let opmodeOn
            payload.map(row =>
                opmodeOn = row.opmodeCountON
            )
            return {
                ...state,
                status: 'getting opmodeON data  ',
                opmodeOn: opmodeOn
            }

        case OPMODE_OFF:
            let opmodeOff
            payload.map(row =>
                opmodeOff = row.opmodeCountOFF
            )
            return {
                ...state,
                status: 'getting opmodeOFF data  ',
                opmodeOff: opmodeOff
            }
        case LITALITY_NODES:
            let litalityNodes
            payload.map(row =>
                litalityNodes = row.LitalityNodes
            )
            return {
                ...state,
                status: 'getting litality nodes   ',
                nodes: litalityNodes
            }
        default:
            return {
                ...state
            }
    }
}