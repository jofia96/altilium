import { combineReducers } from 'redux'
import fixtureReducer from './fixtureReducer'
import chartReducer from './chartReducer'

export default combineReducers({
     fixture : fixtureReducer,
     chart:chartReducer
})