import React from 'react'
import SignUp from './components/SignUp'
import DashBoard from './components/DashBoard'
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


function App() {
      const [page, setPage] = React.useState('aboutus')
      const [token, setToken] = React.useState(null)
      function manageTokenSet(token){
          setToken(token);
          localStorage.setItem('token', token);
      }
      function logout() {
          setToken(null);
          localStorage.removeItem('token')
      }
      function handleAboutUsPage(){
          setPage('aboutus');
      }
      function handleSignInPage(){
          setPage('signin');
      }
      function handleSignUpPage(){
          setPage('signup');
      }

      React.useEffect(()=>{
          if (localStorage.getItem('token')){
          setToken(localStorage.getItem('token'))
          }
      }, [token])

      return (
      <>
      <header>
          { token
              ? null
              
              : <div style={{margin:'10px' ,display: 'flex', justifyContent: 'flex-end'}}>
                  <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
                    <List role="menubar" orientation="horizontal">
                    <ListItem role="none">
                    <ListItemButton onClick={handleAboutUsPage}
                    role="menuitem"
                    component="a"
                    href="#horizontal-list"
                    aria-label="Home"
                    >
                    <Home />
                    </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none">
                    <ListItemButton onClick={handleSignInPage} role="menuitem" component="a" href="#horizontal-list">
                    SignIn
                    </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none">
                        <ListItemButton onClick={handleSignUpPage} role="menuitem" component="a" href="#horizontal-list">
                        SignUp
                    </ListItemButton>
                    </ListItem>
                    <ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
                    <ListItemButton
                        role="menuitem"
                        component="a"
                        href="#horizontal-list"
                        aria-label="Profile"
                    >
                </ListItemButton>
                </ListItem>
                </List>
                </Box>

              </div>}
      </header>
      <main>
      {token != null
          ? <MainDashboard token={token} logout={logout}/>
          // ? <DashBoard token={token}/>
          :page === 'aboutus'
          ?(<AboutUs handleSignInPage={handleSignInPage} handleSignUpPage={handleSignUpPage}/>)
          :page === 'signup'
      // ? (<SignUp onSuccess={manageTokenSet}/>)
          ?(<Register onSuccess={manageTokenSet}/>)
      : page === 'signin' 
      // ? (<SignIn onSuccess={manageTokenSet}/>)
          ?(<Login onSuccess={manageTokenSet}/>)
      : (<MainDashboard token={token} logout={logout}/>)}
      </main>
      </>
      );

}

export default App;