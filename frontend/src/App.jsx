import React from 'react'
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';

import AboutUs from './components/authentication/Aboutus';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

import LoginPageHeader from './components/authentication/LoginPageHeader';
import Homepage from './components/user_market/Homepage';
import MyPosts from './components/user_personal/MyPosts';
import ForgetPasswordPage from './components/authentication/ForgetPasswordPage';

import ActivityMainPag from './components/compaigns/MainPage';
import Comments from './components/comments'
import MyEcharts from './components/echart'

import ShowImg from './components/admin/showImage'
import Admin from './components/admin'
import UserMgr from './components/admin/User'

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
import Sidebar from './components/user_general/Sidebar';
import Header from './components/user_general/Header';
import MyProfileContent from './components/user_personal/MyProfileContent';
import PostNewItemPage from './components/user_personal/PostNewItemPage';



export default function App() {
	const [token, setToken] = React.useState(null)
	const [profileData, setProfileData] = React.useState('')

	//Fetch user profile if got a token
  React.useEffect(()=>{
		if (token !== null && profileData==='') {
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


	//Use localStorage to help store and reuse token
	function manageTokenSet(token){
		setToken(token);
		localStorage.setItem('token', token);
	}

	//When logout button is clicked...
	function logout() {
		setToken(null);
		localStorage.removeItem('token')
		window.location.href = '/'
	}

	//Restore token from localStorage after the page is refreshed
	React.useEffect(()=>{
		if (localStorage.getItem('token')){
		setToken(localStorage.getItem('token'))
		}
	}, [token])

	//Different interface is provided based on if the user has logged in or not
	//BrowserRouter allows user to visit different pages by URL
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

						<Route path="/compaign" element={<ActivityMainPag />} token={token}/>
						<Route path="/comments" element={<Comments />} />
						<Route path="/echarts" element={<MyEcharts />} />

						<Route path="/showImg" element={<ShowImg />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="/user" element={<UserMgr />} />

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