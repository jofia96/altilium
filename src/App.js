import React from 'react'
import Tab from './components/home/tab'
import Menu from './components/home/menu'
import { Provider} from 'react-redux'
import store from './store';
const App = () => {
  return (
		<Provider store = { store}>
      <div className="App">
        <Menu/>
        <Tab />
       
      </div>
		</Provider>
  )
}
export default App

