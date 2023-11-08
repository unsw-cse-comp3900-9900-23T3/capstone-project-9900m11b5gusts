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
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
// import { styled } from '@mui/joy';
// import SvgIcon from '@mui/joy/SvgIcon';

// import DropZone from "../user_general/DropZone"
// import FileUpload from "../user_general/FileUpload"
// import CountrySelector from "./CountrySelector"
// import EditorToolbar from "./EditorToolbar"

// import { fileToDataURL } from '../user_general/FileToURL.js';


import UploadFileButton from "../user_general/UploadFileButton.jsx"

import SelectCategoryButton from "../user_general/SelectCategoryButton.jsx"


export default function EditItemPage({ token, index, profileData }) {

  const [posts, setPosts] = React.useState([])
  const [email, setEmail] = React.useState(null)


  const [itemName, setItemName] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [picture, setPicture] = React.useState('')
  const [tradeMethod, setTradeMedod] = React.useState('')
  const [itemID, setItemID] = React.useState(0)

  const [classes, setClasses] = React.useState({ c1: '', c2: '', c3: '' });
  const [applyClassesFlag, setApplyClassesFlag] = React.useState(false)
  const [classesString, setClassesString] = React.useState('')

  const handleClearCategory = () => {
    setClasses((p) => ({...p, c1: '', c2: '', c3: ''}))
    setApplyClassesFlag(false)
  }

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


  React.useEffect(() => {
    if (profileData) {
      setEmail(profileData.email)
    }
  }, [profileData])

  React.useEffect(() => {
    if (email !== null){
      checkPersonalItem()
    }
  },[email])

  React.useEffect(() => {
    setClassesString('')
    if (applyClassesFlag) {
      if (classes.c1) {
        setClassesString(p=>(p+classes.c1+' 》'))
      }
      if (classes.c2) {
        setClassesString(p=>(p+classes.c2+' 》'))
      }
      if (classes.c3) {
        setClassesString(p=>(p+classes.c3))
      }
    }

  }, [classes, applyClassesFlag])


  React.useEffect(()=>{
    if (posts.length > 0) {
      console.log('post: ', posts)
      console.log('index: ', index)
      console.log('post: ', posts[index])
      setItemName(posts[index].item_name)
      setAmount(posts[index].item_num)
      setPrice(posts[index].exchange_item)
      setDescription(posts[index].item_desc)
      setPicture(posts[index].image)
      setTradeMedod(posts[index].trading_method)
      setItemID(posts[index].item_id)
      setClasses((p) => ({...p, c1: posts[index].class1, c2: posts[index].class2, c3: posts[index].class3}))
      if (posts[index].class1) {
        setApplyClassesFlag(true)
      }
    }
  }, [posts])

  async function checkPersonalItem(){
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



  async function confirmEdit(){
    
    if (!(itemName && amount && tradeMethod && price && description)) {
      alert('Please provide all information.')
    } else {
      const response = await fetch('http://127.0.0.1:5000/Items/editPersonalItem', {
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : `Bearer ${token}`,
        },
        body:JSON.stringify({
          "item_id": itemID,
          "item_name": itemName,
          "image":picture,
          "description": description,
          "price": isNaN(price) ? "0" : price,
          "num": parseInt(amount),
          "class1": classes.c1,
          "class2": classes.c2,
          "class3": classes.c3,
          "trading_method": tradeMethod,
          "exchange_item": price,
          "change": true
        })
      });
      if (response.status===200){
        alert('Success')
        window.location.href='/posts'
      }else{
        const data = await response.json();
        alert(data.error)
      }
    }
  }


  return (
    <Box sx={{ flex: 1, width: "100%", minWidth: '500px' }} >

      
					<Stack sx={{ mb: 2 }}>
						<Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
							<Button style={{margin:'15px', width:'100px'}} startDecorator={<ArrowBackIosIcon/>} component="a" href="/posts" variant="soft" size="sm" >
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
            Edit Post
          </Typography>
        </Box>
      </Box>

      <Stack spacing={4} sx={{ display: "flex", maxWidth: "700px", mx: "auto", px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 } }} >
        <Card>

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
                      {picture && 
                        <img
                          src={picture}
                          loading="lazy"
                          alt="picture"
                        />
                      }
                    </CardCover>
                  </Card>
                </AspectRatio>
              </Stack>

						<Stack spacing={1} sx={{ flexGrow: 1 }} direction='column'>


              <UploadFileButton setPicture={setPicture} words='Upload a picture'/>

              <FormControl >
                <FormLabel>Select a category</FormLabel>
                <Stack direction="row" spacing={1}>
                  <SelectCategoryButton  token={token} classes={classes} setClasses={setClasses} handleClearCategory={handleClearCategory} setApplyClassesFlag={setApplyClassesFlag}/>
                  <Input style={{width: '100%'}} size="sm" value={classesString} placeholder="Choose a category" disabled/>
                </Stack>
              </FormControl>               
                
              <FormControl >
                <FormLabel>Name of the item</FormLabel>
                <Input style={{width: '100%'}} size="sm" value={itemName} onChange={handleItemNameChange}/>
              </FormControl>

              <FormControl>
                <FormLabel>Amount of the item</FormLabel>
                <Input type="number" style={{width: '100%'}}  size="sm" value={amount} onChange={handleAmountChange}/>
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
                  placeholder="Describe your item here..."
                />
              </FormControl>

              <br />
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Exchange for cash or goods?</FormLabel>
                  <Select value={tradeMethod?tradeMethod:''} onChange={(e)=>{if(e) {setTradeMedod(e.target.innerText)}}}>
                    <Option value='cash'>cash</Option>
                    <Option value='goods'>goods</Option>
                  </Select>
              </FormControl>

              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>{tradeMethod === 'cash' ? 'Total price ($AUD)': 'Describe the goods you want to exchange for' }</FormLabel>
                <Input
                  style={{width: '100%'}} 
                  size="sm"
                  sx={{ flexGrow: 1 }}
                  value={price}
                  onChange={handlePriceChange}
                  type={tradeMethod==='cash'? 'number':''}
                />
              </FormControl>

            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
            <Button style={{margin:'15px', width:'100px'}} startDecorator={<CheckIcon/>} variant="soft" size="sm" 
              onClick={confirmEdit}
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
