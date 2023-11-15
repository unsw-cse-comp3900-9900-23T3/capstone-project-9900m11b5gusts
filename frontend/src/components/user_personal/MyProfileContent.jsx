// This page displays user's profile content. 
// It also allows editing. 

import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"

import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import UploadFileButton from "../user_general/UploadFileButton"


export default function MyProfileContent({ token, profileData }) {


  React.useEffect(()=>{
    if(profileData) {
      console.log("profileData on profile:", profileData)
      setUsername(profileData.username)
      setGender(profileData.gender)
      setState(profileData.state)
      setSuburb(profileData.suburb)
      setPicture(profileData.image)
    }
  }, [profileData])


  const [username, setUsername] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [state, setState] = React.useState('')
  const [suburb, setSuburb] = React.useState('')
  const [picture, setPicture] = React.useState('')
  const [editSateFlag, setEditStateFlag] =React.useState(false)


  const handleNameChange = (event)=>{
    setUsername(event.target.value)
  }

  const handleCancel = ()=>{
    setEditStateFlag(false)
    setUsername(profileData.username)
    setGender(profileData.gender)
    setState(profileData.state)
    setSuburb(profileData.suburb)
    setPicture(profileData.image)
  }


  async function updateProfile(){

    const response = await fetch('http://127.0.0.1:5000/Authors/profile', {
      method:'POST',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body:JSON.stringify({
        "username": username,
        "gender": gender,
        "state": state,
        "suburb": suburb,
        'image': picture
      })
    });
    if (response.status===200){
      const data = await response.json();
      console.log(data);
      setEditStateFlag(false)
    }else{
      const data = await response.json();
      console.log(data);
    }
  }


  return (
    <Box sx={{ flex: 1, width: "100%", minWidth: '600px' }} >
      <Box
        sx={{
          backgroundColor: "background.surface",
          px: { xs: 2, md: 4 },
          py: 2,
          borderBottom: "1px solid",
          borderColor: "divider"
      }}>
        
        <Box  >
          <Typography
            level="h2"
            sx={{
              mt: 1,
              mb: 2
            }}
          >
            My profile
          </Typography>
        </Box>

      </Box>

      <Stack spacing={4} sx={{ display: "flex", maxWidth: "700px", mx: "auto", px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } }} >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />

          {editSateFlag
          ? 
          <>    
            <Stack
              direction="column"
              spacing={2}
              sx={{ my: 1 }}
            >
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1}>
                  <AspectRatio
                    ratio="1"
                    maxHeight={130}
                    sx={{ flex: 1, minWidth: 130, borderRadius: "100%" }}
                  >

                    <img
                      src={picture}
                      alt=""
                    />

                  </AspectRatio>

                  <UploadFileButton setPicture={setPicture} words="New Icon"/>
                </Stack>

                <Stack spacing={1} sx={{ flexGrow: 1 }} direction='column'>

                  <Stack spacing={1} sx={{ flexGrow: 1 }} direction='row'>

                    <FormControl >
                    <FormLabel>Name</FormLabel>
                      <Input style={{width: '250px'}} size="sm" value={username} onChange={handleNameChange}/>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>Identity</FormLabel>
                      <Input style={{width: '120px'}} disabled size="sm" value={profileData.identity} />
                    </FormControl>

                  </Stack>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      style={{width: '379px'}} 
                      disabled
                      size="sm"
                      type="email"
                      startDecorator={<EmailRoundedIcon />}
                      value={profileData.email}
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                  <Stack spacing={1} sx={{ flexGrow: 1 }} direction='row'>
                    <FormControl >
                    <FormLabel>Suburb</FormLabel>
                      <Input style={{width: '185px'}} size="sm" value={suburb} onChange={(e)=>{setSuburb(e.target.value)}}/>
                    </FormControl>
                    
                    <FormControl>
                      <FormLabel>State</FormLabel>
                      <Input style={{width: '185px'}} size="sm" value={state} onChange={(e)=>{setState(e.target.value)}}/>
                    </FormControl>
                  </Stack>

                </Stack>
              </Stack>
            </Stack>
          </>
          : 
            <>
              <Stack
                direction="column"
                spacing={2}
                sx={{ my: 1 }}
              >
                <Stack direction="row" spacing={2}>
                  <Stack direction="column" spacing={1}>
                    <AspectRatio
                      ratio="1"
                      maxHeight={130}
                      sx={{ flex: 1, minWidth: 130, borderRadius: "100%" }}
                    >

                      <img
                        src={picture}
                        alt=""
                      />

                    </AspectRatio>

                  </Stack>

                  <Stack spacing={1} sx={{ flexGrow: 1 }} direction='column'>

                    <Stack spacing={1} sx={{ flexGrow: 1 }} direction='row'>
                      <FormControl >
                      <FormLabel>Name</FormLabel>
                        <Input style={{width: '250px'}} size="sm" value={username} disabled/>
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>Identity</FormLabel>
                        <Input style={{width: '120px'}} disabled size="sm" value={profileData.identity} />
                      </FormControl>
                    </Stack>

                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        style={{width: '379px'}} 
                        disabled
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        value={profileData.email}
                        sx={{ flexGrow: 1 }}
                      />
                    </FormControl>

                    <Stack spacing={1} sx={{ flexGrow: 1 }} direction='row'>
                      <FormControl >
                      <FormLabel>Suburb</FormLabel>
                        <Input style={{width: '185px'}} size="sm" value={suburb} disabled/>
                      </FormControl>
                      
                      <FormControl>
                        <FormLabel>State</FormLabel>
                        <Input style={{width: '185px'}} disabled size="sm" value={state} />
                      </FormControl>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            

            </>
          }

          {editSateFlag
            ?
            <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" variant="solid" onClick={updateProfile}>
                  Save
                </Button>
              </CardActions>
            </CardOverflow>
            :
            <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button size="sm" variant="outlined" color="neutral" onClick={()=>{setEditStateFlag(true)}}>
                  Edit
                </Button>
              </CardActions>
            </CardOverflow>
          }

        </Card>
      </Stack>
    </Box>
  )
}
