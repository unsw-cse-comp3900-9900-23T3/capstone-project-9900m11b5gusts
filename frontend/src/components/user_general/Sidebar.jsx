// This is the sidebar. It is on the left side of the window as long as you have logged in.
// If your screen is narrow, it will hide automatically and can be called by the button on header.
// It has many ListItemButton that navigates you to different sections of our platform.
// It also has a time interval that will fetch every 4 seconds. 
// This is because we don't have the time to built a real messaging system using things like socket.
// Instead, we fetch periodically to see if there's new message.
// I know this is a bad idea if we are facing a large number of users.
// Due to the limit of time, this is the best we can do.
// It works fine when there's only a few users, though.

import React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HomeIcon from '@mui/icons-material/Home';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ColorSchemeToggle from '../blocks/ColorSchemeToggle';




const closeSidebar = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.removeProperty('--SideNavigation-slideIn');
    document.body.style.removeProperty('overflow');
  }
};


function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar({ logout, profileData, token, posts, setPosts}) {
  const [showADFlag, setShowADFlag] = React.useState(true)

  const url = window.location.href.split(':')
  const [currentURL, setCurrentURL] = React.useState(url[url.length - 1])

  const handleCloseAD = () => {
    setShowADFlag(false)
  }

  React.useState(() => {
    console.log('currentURL: ', currentURL)
  }, [currentURL])


  React.useState(() => {
    checkMessage()
    const refreshInterval = setInterval(() =>{
      checkMessage()
    }, 4000)

    return () => clearInterval(refreshInterval);
  }, [])

  async function checkMessage(){
    
    const response = await fetch('http://127.0.0.1:5000/Items/getSellerProcessHistory', {
        method:'GET',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : `Bearer ${token}`,
        }
      });
      if (response.status===200){
        const data = await response.json();
        // console.log('posts: ', data.success)
        if (data.success){
            setPosts([])
            Object.entries(data.success).map((item) => {
            setPosts(prev => [...prev, item[1]])
          })
        }
      }else{
        const data = await response.json();
        console.log(data)
      }
  }


    return(
        <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">Panda Exchange Hub</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton
              selected={currentURL.includes('market')}
              role="menuitem"
              component={currentURL.includes('market') ? undefined : 'a'}
              href='/market'
              onClick={()=>{setCurrentURL('market')}}
            >
              <ShoppingCartIcon />
              <ListItemContent>
                <Typography level="title-sm">Market</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>


          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">My Collectibles</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton 
                    selected={currentURL.includes('posts') || currentURL ==='postnewitem'}
                    onClick={()=>{setCurrentURL(`/posts/#${profileData.email}`)}}
                    component={'a'}
                    href={`/posts/#${profileData.email}`}
                  >
                    Posts
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={currentURL.includes('wishlist')}
                    onClick={()=>{setCurrentURL(`/wishlist/#${profileData.email}`)}}
                    component={currentURL.includes('wishlist') ? undefined : 'a'}
                    href={`/wishlist/#${profileData.email}`}
                  >
                    Wish List
                  </ListItemButton>
                </ListItem>
           
              </List>
            </Toggler>
          </ListItem>

          {profileData.identity == 'manager' &&(
         <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <HomeIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Manager</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                {profileData.identity == 'manager' ?
                  <div>
                    <ListItem sx={{ gap: 0.5 }}>
                      <ListItemButton
                        selected={currentURL === 'compaign'}
                        onClick={() => { setCurrentURL('compaign'); }}
                        component={currentURL === 'compaign' ? undefined : 'a'}
                        href='/compaign'
                      >campaigns</ListItemButton>
                    </ListItem>
                    <ListItem sx={{ gap: 0.5 }}>
                      <ListItemButton
                        selected={currentURL === 'archive_compaign'}
                        onClick={() => { setCurrentURL('archive_compaign'); }}
                        component={currentURL === 'archive_compaign' ? undefined : 'a'}
                        href='/archive_compaign'
                      >archive campaigns</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        selected={currentURL === 'echarts'}
                        onClick={() => { setCurrentURL('echarts'); }}
                        component={currentURL === 'echarts' ? undefined : 'a'}
                        href='/echarts'
                      >Analysis</ListItemButton>
                    </ListItem>
                  </div>: ""}
              </List>
            </Toggler>
         </ListItem>
)}
                {/* admin */}
   {profileData.identity === 'administrator' && (
          <ListItem nested>
       
             <Toggler
             renderToggle={({ open, setOpen }) => (
               <ListItemButton onClick={() => setOpen(!open)}>
                 <AdminIcon />
                 <ListItemContent>
                   <Typography level="title-sm">Admin</Typography>
                 </ListItemContent>
                 <KeyboardArrowDownIcon
                   sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                 />
               </ListItemButton>
             )}
           >
                 <List sx={{ gap: 0.5 }}>
         {profileData.identity == 'administrator'?
                 <div>
                     <ListItem>
                   <ListItemButton
                   selected={currentURL === '/user'}
                   onClick={()=>{setCurrentURL('/user')}}
                   component={currentURL === '/user' ? undefined : 'a'}
                   href='/user'
                   >User Manager System</ListItemButton>
               </ListItem>
               <ListItem>
                   <ListItemButton
                   selected={currentURL === '/admin'}
                   onClick={()=>{setCurrentURL('/admin')}}
                   component={currentURL === '/admin' ? undefined : 'a'}
                   href='/admin'
                   >Admin</ListItemButton>
                     </ListItem>
                   </div> : ""}
                   </List>
               </Toggler>
          </ListItem>
            )}
                                      {/* <div>
                  <ListItem>
                    <ListItemButton
                      selected={currentURL === '/user_compaigns'}
                      onClick={()=>{setCurrentURL('/user_compaigns')}}
                      component={currentURL === '/user_compaigns' ? undefined : 'a'}
                      href='/user_compaigns'
                      >User Compaigns</ListItemButton>
                  </ListItem>
                  </div>     */}
          <ListItem>
            <ListItemButton
              selected={currentURL === '/user_compaigns'}
              onClick={()=>{setCurrentURL('/user_compaigns')}}
              component={currentURL === '/user_compaigns' ? undefined : 'a'}
              href='/user_compaigns'
              >
              <ContactMailIcon />
              <ListItemContent>
                <Typography level="title-sm">User Compaigns</Typography>
              </ListItemContent>
              </ListItemButton>
          </ListItem>

          <ListItem>
          <ListItemButton
              selected={currentURL.includes('message')}
              role="menuitem"
              component='a'
              href='/message'
              onClick={()=>{setCurrentURL('message')}}
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>

              {posts.length>0 &&
                
                <Chip size="sm" color="primary" variant="solid">
                  {posts.length}
                </Chip>
              }


            </ListItemButton>
          </ListItem>
          
          <ListItem>
            <ListItemButton
              selected={currentURL.includes('exchangehistory')}
              role="menuitem"
              component='a'
              href={`/exchangehistory/#${profileData.email}`}
              onClick={()=>{setCurrentURL(`/exchangehistory/#${profileData.email}`)}}
            >
              <HistoryIcon />
              <ListItemContent>
                <Typography level="title-sm">Exchange History</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              selected={currentURL.includes('myprofile')}
              onClick={()=>{setCurrentURL('myprofile')}}
              role="menuitem"
              component={currentURL.includes('myprofile') ? undefined : 'a'}
              href='/myprofile'
              
            >
              <AccountBoxIcon />
              <ListItemContent>
                <Typography level="title-sm">My Profile</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

        </List>

        {/* <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <FeedbackIcon />
              Feedback
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List> */}
        
        {/* {showADFlag && 
          <Card invertedColors variant="soft" color="warning" size="sm" sx={{ boxShadow: 'none' }} >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography level="title-sm">AD TITLE</Typography>
              <IconButton size="sm" onClick={handleCloseAD}>
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
            <Typography level="body-xs">
              sentances
            </Typography>
            <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
            <Button size="sm" variant="solid">
              button
            </Button>
          </Card>
        } */}


      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src={ profileData.image }
        />
        <Box sx={{ minWidth: 0, flex: 1 }} >
          <Typography level="title-sm">{profileData.username}</Typography>
          {/* <Typography level="body-xs">{profileData.email}</Typography> */}

        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRoundedIcon onClick={ logout }/>
        </IconButton>
      </Box>
    </Sheet>
  );



}