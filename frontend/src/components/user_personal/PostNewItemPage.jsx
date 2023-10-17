//This is where user can post a new item

import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
// import Divider from "@mui/joy/Divider"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
// import FormHelperText from "@mui/joy/FormHelperText"
import Input from "@mui/joy/Input"
// import IconButton from "@mui/joy/IconButton"
import Textarea from "@mui/joy/Textarea"
import Stack from "@mui/joy/Stack"
// import Select from "@mui/joy/Select"
// import Option from "@mui/joy/Option"
import Typography from "@mui/joy/Typography"
// import Tabs from "@mui/joy/Tabs"
// import TabList from "@mui/joy/TabList"
// import Tab, { tabClasses } from "@mui/joy/Tab"
// import Breadcrumbs from "@mui/joy/Breadcrumbs"
// import Link from "@mui/joy/Link"
import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import CardCover from '@mui/joy/CardCover';
// import CardContent from '@mui/joy/CardContent';
// import CardMedia from '@mui/material/CardMedia';


// import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
// import EmailRoundedIcon from "@mui/icons-material/EmailRounded"
// import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded"
// import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded"
// import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded"
// import EditRoundedIcon from "@mui/icons-material/EditRounded"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
// import { styled } from '@mui/joy';
// import SvgIcon from '@mui/joy/SvgIcon';

// import DropZone from "../user_general/DropZone"
// import FileUpload from "../user_general/FileUpload"
// import CountrySelector from "./CountrySelector"
// import EditorToolbar from "./EditorToolbar"

// import { fileToDataURL } from '../user_general/FileToURL.js';


import UploadFileButton from "../user_general/UploadFileButton.jsx"



export default function PostNewItemPage({ token, profileData }) {

  const [itemName, setItemName] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [picture, setPicture] = React.useState('')


  const handleItemNameChange = (event) => {
    setItemName(event.target.value)
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }


  React.useEffect(()=>{
		// console.log("profileData on postNewItemPage: ", profileData)
    // console.log("token on postNewItemPage: ", token)
  }, [profileData])


  async function postNewItem(){
    if (!(itemName && amount && price && description)) {
      alert('Please provide all information.')
    } else {
      const response = await fetch('http://127.0.0.1:5000/Items/uploadPersonalItem', {
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : `Bearer ${token}`,
        },
        body:JSON.stringify({
          "item_name": itemName,
          "image":picture,
          "description": description,
          "price": parseFloat(price),
          "num": parseInt(amount),
          "class1": "coles",
          "class2": "study",
          "class3": "stationery"
        })
      });
      if (response.status===200){
        // const data = await response.json();
        // console.log(data);
        alert('Success')
        window.location.href='/myposts'
      }else{
        const data = await response.json();
        alert(data)
      }
    }
  }


  return (
    
    <Box sx={{ flex: 1, width: "100%", minWidth: '500px' }} >

      
					<Stack sx={{ mb: 2 }}>
						<Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
							<Button style={{margin:'15px', width:'100px'}} startDecorator={<ArrowBackIosIcon/>} component="a" href="/myposts" variant="soft" size="sm" >
								Back
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
                  maxHeight={400}
                  sx={{ flex: 1, minWidth: 400, borderRadius: "3%" }}
                >
      
      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <img
            src={picture}
            loading="lazy"
            alt="picture"
          />
        </CardCover>
        {/* <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            Image
          </Typography>
        </CardContent> */}
      </Card>

                </AspectRatio>
                {/* <IconButton
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
                  <VisuallyHiddenInput type="file" />
                  <EditRoundedIcon />
                  
                </IconButton> */}
              </Stack>



            {/* </Stack> */}

						<Stack spacing={1} sx={{ flexGrow: 1 }} direction='column'>


<UploadFileButton setPicture={setPicture}/>
                  
<FormControl >
<FormLabel>Name of the item</FormLabel>
	<Input style={{width: '100%'}} size="sm" value={itemName} onChange={handleItemNameChange}/>
</FormControl>

<FormControl>
	<FormLabel>Amount of the item</FormLabel>
	<Input type="number" style={{width: '100%'}}  size="sm" value={amount} onChange={handleAmountChange}/>
</FormControl>

<FormControl sx={{ flexGrow: 1 }}>
	<FormLabel>Price / want to exchange for</FormLabel>
	<Input
		style={{width: '100%'}} 
		size="sm"
		sx={{ flexGrow: 1 }}
    value={price}
    onChange={handlePriceChange}
	/>
</FormControl>

<FormControl sx={{ flexGrow: 1 }}>
	<FormLabel>Description</FormLabel>
	<Textarea
    minRows={3}
		style={{width: '100%'}} 
		size="sm"
		sx={{ flexGrow: 1 }}
    value={description}
    onChange={handleDescriptionChange}
	/>
</FormControl>

</Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button style={{margin:'15px', width:'100px'}} startDecorator={<CheckIcon/>} variant="soft" size="sm" 
              onClick={postNewItem}
            >
								Confirm
							</Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  )
}
