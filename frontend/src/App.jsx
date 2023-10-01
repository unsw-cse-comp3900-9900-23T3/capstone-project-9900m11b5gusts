import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  // useParams,
  // Outlet
} from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


// pages = signup, signin, dashboard


function DashBoard(){
      return(
            <>
            DashBoard
            </>
      )
}

function AboutUs(){
      return(
          <>
                <header>
                App name Our brand
                </header>
                <body>
                Our company is a trading and management platform for ....
                </body>
          </>
      )
}


const SignNav = () => {
      const url = window.location.href.split('/')
      const [currentURL, setCurrentURL] = React.useState('/' + url[url.length - 1])
    
      return (
        <>
        <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
                  BigBrain
                </Link>
              </Typography>
              {(currentURL !== '/play') &&
                <Button onClick={() => { setCurrentURL('/play') }} color="inherit" ><Link to="/play" style={{ color: 'white', textDecoration: 'none' }}>Join a game</Link></Button>
              }
              {(currentURL !== '/login') &&
                <Button color="inherit" onClick={() => { setCurrentURL('/login') }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></Button>
              }
              {(currentURL !== '/register') &&
                <Button color="inherit" onClick={() => { setCurrentURL('/register') }}><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></Button>
              }
            </Toolbar>
          </AppBar>
        </Box>
        </div>
        </>
      );
    }


function App() {
      return (
            <BrowserRouter>
              <SignNav />
              <Routes>
                <Route path="/" element={<SignUp />} />
                {/* <Route path="/login" element={<SignIn onSuccess={manageTokenSet} />} /> */}
                {/* <Route path="/register" element={<SignUp onSuccess={manageTokenSet} />} /> */}
                {/* <Route path="/play/" element={<EnterSessionPage />} /> */}
                {/* <Route path="/play/:playerId" element={<PlayGamePage />} /> */}
              </Routes>
            </BrowserRouter>
          );
}

export default App;