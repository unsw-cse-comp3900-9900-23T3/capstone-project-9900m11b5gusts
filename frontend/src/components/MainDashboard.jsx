import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Sidebar from './Sidebar';
import Header from './Header';
// import MyProfile from './components/MyProfile';


export default function MainDashboard({ token, logout }) {
    const [showProfile, setShowProfile] = React.useState(false)
      const [profileData, setProfileData] = React.useState('')
      React.useEffect(()=>{
            fetch('http://localhost:5000/Authors/profile', {
            method: 'GET',
            headers:{
                  'Content-type': 'application/json',
                  'Authorization' : `Bearer ${token}`,
            }
      }).then(response => response.json())
          .then(data=>setProfileData(data));
            console.log('fetch ...');
      }, [token])

    React.useEffect(()=>{
         if(profileData !== ''){
        console.log(profileData)
        }
    }, [profileData])

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar logout={logout}/>
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
          {/*<MyProfile />*/}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
