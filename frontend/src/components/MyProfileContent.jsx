import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Input from "@mui/joy/Input"
import IconButton from "@mui/joy/IconButton"
import Textarea from "@mui/joy/Textarea"
import Stack from "@mui/joy/Stack"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import Typography from "@mui/joy/Typography"
import Tabs from "@mui/joy/Tabs"
import TabList from "@mui/joy/TabList"
import Tab, { tabClasses } from "@mui/joy/Tab"
import Breadcrumbs from "@mui/joy/Breadcrumbs"
import Link from "@mui/joy/Link"
import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"

import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded"
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded"
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded"
import EditRoundedIcon from "@mui/icons-material/EditRounded"

import DropZone from "./DropZone"
import FileUpload from "./FileUpload"
// import CountrySelector from "./CountrySelector"
import EditorToolbar from "./EditorToolbar"

export default function MyProfileContent({ token, profileData }) {
  React.useEffect(()=>{
    if(profileData) {
      console.log("profileData on profile:", profileData)
      setUsername(profileData.username)
      setGender(profileData.gender)
      setState(profileData.state)
      setSuburb(profileData.suburb)
    }
  }, [profileData])


  const [username, setUsername] = React.useState('')
  const [gender, setGender] = React.useState('')
  const [state, setState] = React.useState('')
  const [suburb, setSuburb] = React.useState('')


  const handleNameChange = (event)=>{
    setUsername(event.target.value)
  }

  const handleCancel = ()=>{
    setUsername(profileData.username)
    setGender(profileData.gender)
    setState(profileData.state)
    setSuburb(profileData.suburb)
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
        'image': ''
      })
    });
    if (response.status===200){
      const data = await response.json();
      console.log(data);
    }else{
      const data = await response.json();
      console.log(data);
    }
  }

  return (
    <Box sx={{ flex: 1, width: "100%", minWidth: '600px' }} >
      <Box sx={{ position: "sticky", top: { sm: -100, md: -110 }, bgcolor: "background.body", zIndex: 9995 }} >
        
        <Box sx={{ px: { xs: 2, md: 6 } }} >
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
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 85,
                    top: 180,
                    boxShadow: "sm"
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>

              <Stack spacing={1} sx={{ flexGrow: 1 }} direction='column'>

                <Stack spacing={1} sx={{ flexGrow: 1 }} direction='row'>

                  
                  <FormControl >
                  <FormLabel>Name</FormLabel>
                    <Input style={{width: '250px'}} size="sm" value={username} onChange={handleNameChange}/>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Identity</FormLabel>
                    <Input style={{width: '120px'}} disabled size="sm" value={profileData.identity === 'User'? 'User' : 'Manager'} />
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
              </Stack>


            </Stack>



            <iframe src="AddressSelector.html"
              width="100%" height="320px"
              style={{border: '0'}}
              loading="lazy">
            </iframe>


          </Stack>
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
        </Card>


        {/* <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Bio</Typography>
            <Typography level="body-sm">
              Write a short introduction to be displayed on your profile
            </Typography>
          </Box>
          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <EditorToolbar />
            <Textarea
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              defaultValue="I'm a software developer based in Bangkok, Thailand. My goal is to solve UI problems with neat CSS without using too much JavaScript."
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Portfolio projects</Typography>
            <Typography level="body-sm">
              Share a few snippets of your work.
            </Typography>
          </Box>

          <Divider />
          <Stack spacing={2} sx={{ my: 1 }}>
            <DropZone />
            <FileUpload
              icon={<InsertDriveFileRoundedIcon />}
              fileName="Tech design requirements.pdf"
              fileSize="200 kB"
              progress={100}
            />
            <FileUpload
              icon={<VideocamRoundedIcon />}
              fileName="Dashboard prototype recording.mp4"
              fileSize="16 MB"
              progress={40}
            />
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button>
              <Button size="sm" variant="solid">
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card> */}
      </Stack>
    </Box>
  )
}
