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

import LoginPageHeader from './components/LoginPageHeader';
import ForgetPasswordPage from './ForgetPasswordPage';
import Homepage from './components/Homepage';
import MyPosts from './components/MyPosts';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // useParams,
  // Outlet
} from 'react-router-dom'


import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyProfileContent from './components/MyProfileContent';
import PostNewItemPage from './components/PostNewItemPage';



export default function App() {
	const [token, setToken] = React.useState(null)
	const [profileData, setProfileData] = React.useState('')


  React.useEffect(()=>{
		if (!localStorage.getItem('token')) {
			console.log('getting profile');
			fetch('http://localhost:5000/Authors/profile', {
				method: 'GET',
				headers:{
							'Content-type': 'application/json',
							'Authorization' : `Bearer ${token}`,
				}
			}).then(response => response.json())
				.then(data=>setProfileData(data));
		}
		console.log('token: ', token)
  }, [token])




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
			
			<>
			
				<LoginPageHeader />
				
				<BrowserRouter>

					

					<Routes>
						<Route path="/" element={<AboutUs />} />
						<Route path="/login" element={<Login onSuccess={manageTokenSet} />} />
						<Route path="/register" element={<Register onSuccess={manageTokenSet} />} />
						<Route path="/forgetpasswordpage" element={<ForgetPasswordPage />} />

					</Routes>
				</BrowserRouter>
			
			</>
			

		)
	} else {
		return(
			<>
			  <CssVarsProvider disableTransitionOnChange>
					<CssBaseline />
					<Box sx={{ display: 'flex', minHeight: '100dvh' }}>
						<Sidebar logout={logout} profileData={profileData} />
						<Header />
						<Box
							component="main"
							className="MainContent"
							sx={{
								pt: {
									xs: 'calc(12px + var(--Header-height))',
									md: 3,
								},
								pb: {
									xs: 2,
									sm: 2,
									md: 3,
								},
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								minWidth: 0,
								height: '100dvh',
								gap: 1,
								overflow: 'auto',
							}}
						>
							<BrowserRouter>
								<Routes>
									<Route path="/market" element={<Homepage token={token} />} />
									<Route path="/myprofile" element={<MyProfileContent token={token} profileData={profileData} />} />
									<Route path="/myposts" element={<MyPosts token={token} profileData={profileData} />} />
									<Route path="/myposts/postnewitem" element={<PostNewItemPage token={token} profileData={profileData} />} />
								</Routes>
							</BrowserRouter>

						</Box>
					</Box>
				</CssVarsProvider>


			</>

	

		)
	}
}