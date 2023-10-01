import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // useParams,
  // Outlet
} from 'react-router-dom'

import SignNav from './components/SignInPageNavBar';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import IntroductionPage from './components/IntroductionPage';
import Homepage from './components/Homepage';
import HomeNav from './components/HomepageNavBar';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';




function App() {
	const [token, setToken] = React.useState(null)

	function manageTokenSet (token) {
		setToken(token.toString());
		localStorage.setItem('token', token.toString());
	}


	return (



		<BrowserRouter>
			{(token == 'null') &&
				<SignNav />
			}
			{(token !== 'null') &&
				<HomeNav />
			}
			<Routes>
				<Route path="/" element={<IntroductionPage />} />
				<Route path="/login" element={<SignIn onSuccess={manageTokenSet} />} />
				<Route path="/register" element={<SignUp onSuccess={manageTokenSet} />} />
				<Route path="/Homepage" element={<Homepage token={token} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;