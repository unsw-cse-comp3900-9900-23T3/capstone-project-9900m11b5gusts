import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';

import MenuListComposition from './HomepageDropDownMenu';


import {
  // BrowserRouter,
  // Routes,
  // Route,
  Link,
  // useParams,
  // Outlet
} from 'react-router-dom'


function HomeNav({ manageTokenSet }) {
    const url = window.location.href.split('/')
    const [currentURL, setCurrentURL] = React.useState('/' + url[url.length - 1])
  
    return (
      <>
      <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => { setCurrentURL('/homepage') }}>
              <Link to='/homepage' style={{ color: 'white', textDecoration: 'none' }}>
                <MenuItem style={{width:'200px'}}>
                  <HomeIcon fontSize='medium'/>
                  Platform Name
                </MenuItem>

              </Link>
            </Typography>


            <MenuListComposition manageTokenSet={ manageTokenSet }/>


            {/* {(currentURL == '/register') &&
            <>
              <Button color="primary" variant="outlined" onClick={() => { setCurrentURL('/login') }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></Button>
              <Button color="inherit" variant="outlined" onClick={() => { setCurrentURL('/register') }}><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></Button>
            </>
            }
            {(currentURL == '/login') &&
            <>
              <Button color="inherit" variant="outlined" onClick={() => { setCurrentURL('/login') }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></Button>
              <Button color="primary" variant="outlined" onClick={() => { setCurrentURL('/register') }}><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></Button>
            </>
            }
            {(currentURL !== '/register') && (currentURL !== '/login') &&
              <>
                <Button color="primary" variant="outlined" onClick={() => { setCurrentURL('/login') }}><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link></Button>
                <Button color="primary" variant="outlined" onClick={() => { setCurrentURL('/register') }}><Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link></Button>
              </>
            } */}
          </Toolbar>
        </AppBar>
      </Box>
      </div>
      </>
    );
  }

export default HomeNav;