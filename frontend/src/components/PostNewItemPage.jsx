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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';

import DropZone from "./DropZone"
import FileUpload from "./FileUpload"
// import CountrySelector from "./CountrySelector"
import EditorToolbar from "./EditorToolbar"

export default function PostNewItemPage({ token, profileData }) {
  React.useEffect(()=>{
		console.log("profileData on profile:", profileData)
    console.log( profileData.identity)
  }, [profileData])

  return (
    
    <Box sx={{ flex: 1, width: "100%", minWidth: '600px' }} >
								<Stack sx={{ mb: 2 }}>
						<Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
							<Button style={{margin:'15px', width:'100px'}} startDecorator={<ArrowBackIosIcon/>} component="a" href="/myposts" variant="soft" size="sm" >
								Back
							</Button>
							<Button style={{margin:'15px', width:'100px'}} startDecorator={<CheckIcon/>} component="a" href="/myposts/postnewitem" variant="soft" size="sm" >
								Confirm
							</Button>
							
						</Stack>
					</Stack>
      <Box sx={{ position: "sticky", top: { sm: -100, md: -110 }, bgcolor: "background.body", zIndex: 9995 }} >
        
        <Box sx={{ px: { xs: 2, md: 6 } }} >
          <Typography
            level="h2"
            sx={{
              mt: 1,
              mb: 2
            }}
          >
            Post new item
          </Typography>
        </Box>

      </Box>

      <Stack spacing={4} sx={{ display: "flex", maxWidth: "700px", mx: "auto", px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } }} >
        <Card>
          {/* <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider /> */}


          <Stack
            direction="column"
            spacing={2}
            sx={{ my: 1 }}
          >
            {/* <Stack direction="row" spacing={2}> */}
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={500}
                  sx={{ flex: 1, minWidth: 500, borderRadius: "3%" }}
                >
                  <img
                    src="https://glamadelaide.com.au/wp-content/uploads/2022/06/Coles-Collectable-Harry-Potter.jpg"
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
                    borderRadius: "30%",
                    left: 40,
                    top: 40,
                    boxShadow: "sm"
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>



            {/* </Stack> */}

						<Stack spacing={1} sx={{ flexGrow: 1 }} direction='column'>



                  
<FormControl >
<FormLabel>Title</FormLabel>
	<Input style={{width: '100%'}} size="sm" />
</FormControl>

<FormControl>
	<FormLabel>Identity</FormLabel>
	<Input style={{width: '100%'}} disabled size="sm" value={profileData.identity === 'User'? 'User' : 'Manager'} />
</FormControl>

<FormControl sx={{ flexGrow: 1 }}>
	<FormLabel>Email</FormLabel>
	<Input
		style={{width: '100%'}} 
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
      </Stack>
    </Box>
  )
}
