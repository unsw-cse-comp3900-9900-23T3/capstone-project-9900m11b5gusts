import React from 'react';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

function BasicButtons() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </Box>
  );
}

function DashBoard({ token }){
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



      return(
            <>
                  <BasicButtons onClick={()=>setShowProfile(!showProfile)}>
                  {showProfile ? 'Hide' : 'Show' } show profile
                  </BasicButtons>
                  {showProfile && (
                      <>profile</>

                  )}
            DashBoard,{profileData.email}
            </>
      )
}

export default DashBoard;