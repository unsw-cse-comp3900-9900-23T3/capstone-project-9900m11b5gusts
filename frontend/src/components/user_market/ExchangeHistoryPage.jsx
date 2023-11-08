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
import MessageCard from "./MessageCard";



export default function MessagePage ({ token, profileData }) {
  const [posts, setPosts] = React.useState([])


  React.useEffect(()=>{
    checkMessage()
  },[])

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
        console.log('posts: ', data.success)
        if (data.success){
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
  	return(
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

              <Typography level="h2">Message</Typography>
							
							
						</Stack>
					</Stack>
        </Stack>

        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Stack spacing={2} sx={{ overflow: "auto" }}>

            {posts.map((item, index) => {
              return(
                <MessageCard key={index} 
                  token={token}
                  index={index}
                  item={item}
                />
                )  
              })
            }
            
           
          </Stack>
        </Stack>

      </Box>
    </CssVarsProvider>
    )
}