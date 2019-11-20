import React from 'react';
import { createMuiTheme , MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import  Navbar  from './components/layout/Navbar';
import store from './store';
import { Provider } from 'react-redux'
import SignIn from './components/auth/SignIn';
import {BrowserRouter as Router  ,Route , Switch } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute';


const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: '#1b578e',
			// dark: will be calculated from palette.primary.main,
			contrastText: "#fff"
		},
		secondary: {
			//   light: '#0066ff',
		  	main: '#fff',
		  	// dark: will be calculated from palette.secondary.main,
			contrastText: '#1b578e',
		},
		// error: will use the default color
	},
});

function App() {
  return (
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<div>
					<CssBaseline/>
					<Router>
						<Switch>
							<PrivateRoute exact path="/home" component={Navbar}/>
							<Route exact  path="/" component={SignIn}/>
						</Switch>
					</Router>
				</div>
			</MuiThemeProvider>
		</Provider>
  	);
}
export default App;
