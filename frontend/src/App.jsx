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
import ForgetPasswordPage from './components/authentication/ForgetPasswordPage';

import ActivityMainPag from './components/compaigns/MainPage';
import UserCompaignMainPage from './components/user_compaigns/MainPage';
import Comments from './components/comments'
import MyEcharts from './components/echart'

import ShowImg from './components/admin/showImage'
import Admin from './components/admin'
import UserMgr from './components/admin/User'
import Check from './components/admin/Check'
import Post from  './components/post/index'

import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from '@mui/material/styles';

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
import EditItemPage from './components/user_personal/EditItemPage';
import MarketHomePage from './components/user_market/MarketHomePage';
import WishListPage from './components/user_personal/WishListPage';
import Posts from './components/user_personal/Posts';
import MessagePage from './components/user_market/MessagePage';


export default function App() {
	const [token, setToken] = React.useState(null)
	const [profileData, setProfileData] = React.useState('')
	const [itemIndex, setItemIndex]= React.useState(-1)

	//Fetch user profile if got a token
  React.useEffect(()=>{
		if (token !== null && profileData==='') {
			console.log('getting profile');
			fetch('http://127.0.0.1:5000/Authors/profile', {
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

	function manageItemIndex(ID){
		setItemIndex(ID);
		localStorage.setItem('itemID', ID);
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

		if (localStorage.getItem('itemID')){  /////////////////////////remember to remove localstorage
			setItemIndex(localStorage.getItem('itemID'))  
		}
	}, [token])

	const materialTheme = materialExtendTheme();

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
					</Routes>
				</BrowserRouter>
			</>
		)
	} else {
		return(
			<>
				<MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
				
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
										<Route path="/market" element={<MarketHomePage token={token} profileData={profileData}/>} />
										<Route path="/myprofile" element={<MyProfileContent token={token} profileData={profileData} />} />
										<Route path="/posts*" element={<Posts token={token} profileData={profileData} manageItemID={manageItemIndex} />} />
										<Route path="/myposts/postnewitem" element={<PostNewItemPage token={token} />} />
										<Route path="/myposts/edititem" element={<EditItemPage token={token} index={itemIndex} profileData={profileData} />} />
										<Route path="/wishlist" element={<WishListPage token={token} profileData={profileData} />} />
										<Route path="/user_compaigns" element={<UserCompaignMainPage />} token={token} />
										<Route path="/message" element={<MessagePage token={token} />} />
										
										<Route path="/compaign" element={<ActivityMainPag />} token={token} />
										<Route path="/comments" element={<Comments />} />
										<Route path="/echarts" element={<MyEcharts />} />
					
										<Route path="/showImg" element={<ShowImg />} />
										<Route path="/admin" element={<Admin />} />
										<Route path="/user" element={<UserMgr />} />
										<Route path="/check" element={<Check />} />
										<Route path="/post" element={<Post />} />
										
									</Routes>
								</BrowserRouter>

							</Box>
						</Box>
					</CssVarsProvider>
				</MaterialCssVarsProvider>

			</>
		)
	}
}