//MyPosts page will display a listing of all the posts that user has created

import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography"
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';

import ItemCard from "../user_general/ItemCard";
import { useLocation } from 'react-router-dom';


export default function Posts({ token, profileData, manageItemID }) {
  const [email, setEmail] = React.useState(null)
  const [posts, setPosts] = React.useState([])

  
  console.log('email: ', window.location.hash.slice(1))


  React.useEffect(() => {

      if (window.location.hash.slice(1)){
        
        setEmail(window.location.hash.slice(1))
      } else {
        setEmail(profileData.email)
      }
      
  }, [profileData])

  React.useEffect(() => {
    
    if (email !== null && email !== undefined){
      window.location.href=`/posts#${email}`
      checkPersonalItem()
    }
  },[email])

  React.useEffect(() => {
    console.log('this is posts: ', posts)
  },[posts])




  async function checkPersonalItem(){
    if (token && email) {
      console.log('email: ', email)
      console.log('token: ', token)
      const response = await fetch('http://127.0.0.1:5000/Items/checkPersonalItem', {
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`,
          },
          body:JSON.stringify({
            'user_email': email
          })
        });
        if (response.status===200){
          const data = await response.json();
          console.log('posts: ', data.success)
          if (data.success !== 'no item'){
              setPosts([])
              Object.entries(data.success).map((item) => {
              setPosts(prev => [...prev, item[1]])
            })
          }
        }else{
          const data = await response.json();
          alert(data)
        }
    }
  }

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box>
        <Stack
          sx={{
            backgroundColor: "background.surface",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider"
          }}
        >
					<Stack sx={{ mb: 2 }}>
						<Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
              {email === profileData.email
                ?
                <Typography level="h2">My Posts</Typography>
                :
                <Typography level="h2">Post of {window.location.hash.slice(1)}</Typography>
              }
							


							<Button component="a" href="/myposts/postnewitem" variant="soft" size="sm" startDecorator={<AddIcon />}>
								Post New Item
							</Button>
							
						</Stack>
					</Stack>
        </Stack>


        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Stack spacing={2} sx={{ overflow: "auto" }}>

            {posts.map((item, index) => {
              return(
                <ItemCard key={index} 
                  token={token}
                  index={index}
                  item={item}
                  manageItemID={manageItemID}
                  current_user_email = {profileData.email}
                />
                )  
              })
            }
            
           
          </Stack>
        </Stack>

        {/* <Pagination /> */}


      </Box>
    </CssVarsProvider>
  );
}
