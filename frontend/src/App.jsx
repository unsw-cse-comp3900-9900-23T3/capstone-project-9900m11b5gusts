import React from 'react'
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import AboutUs from './components/Aboutus';
import Login from './components/Login';
import Register from './components/Register';
import MainDashboard from './components/MainDashboard'
import LoginPageHeader from './components/LoginPageHeader';
import ForgetPasswordPage from './ForgetPasswordPage';
import MyProfilePage from './components/MyProfilePage';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // useParams,
  // Outlet
} from 'react-router-dom'



export default function App() {
	const [token, setToken] = React.useState(null)

	function manageTokenSet(token){
		setToken(token);
		localStorage.setItem('token', token);
	}

	function logout() {
		setToken(null);
		localStorage.removeItem('token')
		window.location.href = '/'
	}

	React.useEffect(()=>{
		if (localStorage.getItem('token')){
		setToken(localStorage.getItem('token'))
		}
	}, [token])

	if (token===null) {
		return(
			<BrowserRouter>

				<LoginPageHeader />

				<Routes>
					<Route path="/" element={<AboutUs />} />
					<Route path="/login" element={<Login onSuccess={manageTokenSet} />} />
					<Route path="/register" element={<Register onSuccess={manageTokenSet} />} />
					<Route path="/forgetpasswordpage" element={<ForgetPasswordPage />} />

				</Routes>
			</BrowserRouter>
		)
	} else {
		return(
			<BrowserRouter>
				<Routes>
					<Route path="/homepage" element={<MainDashboard token={token} logout={logout} />} />
					<Route path="/homepage/myprofile" element={<MyProfilePage token={token} logout={logout} />} />

				</Routes>
			</BrowserRouter>
		)
	}
}