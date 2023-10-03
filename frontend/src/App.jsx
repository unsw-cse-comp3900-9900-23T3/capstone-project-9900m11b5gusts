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



function App() {
	const [token, setToken] = React.useState('null')

	function manageTokenSet (token) {
		setToken(token.toString());
		localStorage.setItem('token', token.toString());
	}

	React.useEffect(() => {
		if (localStorage.getItem('token')) {
			setToken(localStorage.getItem('token'));
		}
	},[])


	return (

		<BrowserRouter>
			{(token !== 'null') &&
				<HomeNav manageTokenSet={manageTokenSet}/>
			}
			{(token === 'null') &&
				<SignNav />
			}

			<Routes>
				<Route path="/" element={<IntroductionPage />} />
				<Route path="/login" element={<SignIn onSuccess={manageTokenSet} />} />
				<Route path="/register" element={<SignUp onSuccess={manageTokenSet} />} />
				<Route path="/homepage" element={<Homepage token={token} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;