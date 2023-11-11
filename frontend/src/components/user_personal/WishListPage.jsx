//MyPosts page will display a listing of all the posts that user has created

import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography"


import WishListCard from "./WishListCard";

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import ListDivider from '@mui/joy/ListDivider';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';


import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import SelectCategoryButton from "../user_general/SelectCategoryButton.jsx"
import Input from "@mui/joy/Input"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import Button from "@mui/joy/Button"
import CheckIcon from '@mui/icons-material/Check';




export default function WishListPage({ token, profileData, manageItemID }) {
  const [email, setEmail] = React.useState(null)
  const [posts, setPosts] = React.useState([])
  const [openNewItem, setOpenNewItem] = React.useState(false);


  const [classes, setClasses] = React.useState({ c1: '', c2: '', c3: '' });
  const [applyClassesFlag, setApplyClassesFlag] = React.useState(false)
  const [classesString, setClassesString] = React.useState('')

  const [amount, setAmount] = React.useState('')
  const [itemName, setItemName] = React.useState('')



  const handleClearCategory = () => {
    setClasses((p) => ({...p, c1: '', c2: '', c3: ''}))
    setApplyClassesFlag(false)
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleItemNameChange = (event) => {
    setItemName(event.target.value)
  }


  React.useEffect(() => {
    if (profileData) {
      setEmail(profileData.email)
    }
  }, [profileData])

  React.useEffect(() => {
    if (email !== null){
      checkWishList()
    }
  },[email])

  React.useEffect(() => {
    console.log('this is posts: ', posts)
  },[posts])



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



  async function checkWishList() {
    if (token && email) {
      console.log('email: ', email)
      console.log('token: ', token)
      const response = await fetch('http://127.0.0.1:5000/Items/getWishList', {
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'Authorization' : `Bearer ${token}`,
          },
          body:JSON.stringify({
            'email': `${window.location.hash.slice(1)}`
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




  async function postNewItem(){
    if (!(applyClassesFlag && amount)) {
      alert('Please provide all information.')
    } else {
      const response = await fetch('http://127.0.0.1:5000/Items/insertWishList', {
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : `Bearer ${token}`,
        },
        body:JSON.stringify({
          "item_name": itemName,
          "image":"",
          "description": "",
          "price": 0,
          "num": parseInt(amount),
          "class1": classes.c1,
          "class2": classes.c2,
          "class3": classes.c3,
          "trading_method": "default",
          "exchange_item": "default",
          "change": true
        })
      });
      if (response.status===200){
        alert('Success')
        window.location.reload()
      }else{
        const data = await response.json();
        alert(data)
      }
    }
  }



  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box >
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
							<Typography level="h2">Wish List</Typography>
							{/* <Button component="a" href="/myposts/postnewitem" variant="soft" size="sm" startDecorator={<AddIcon />}>
								Post New Item
							</Button> */}
							
						</Stack>
					</Stack>
        </Stack>

        <Box style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', margin:'10px' }} >

          <List sx={{ maxWidth: 500 }}>

          <React.Fragment>

            {`${window.location.hash.slice(1)}` === profileData.email &&
              <>
                <ListDivider />
                <ListItem
                  // startAction={
                  //   <IconButton aria-label="Add" size="sm" variant="plain" color="neutral">
                  //     <Add />
                  //   </IconButton>
                  // }
                >
                  <ListItemButton
                    onClick={() => setOpenNewItem(true)}
                  >
                    <Add />
                    New Item
                  </ListItemButton>
                </ListItem>
                <ListDivider />
              </>
            }

            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={openNewItem}
              onClose={() => setOpenNewItem(false)}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position:'absolute', left:'220px' }}
            >
              <Sheet
                variant="outlined"
                sx={{
                  width: 500,
                  borderRadius: 'md',
                  p: 3,
                  boxShadow: 'lg',
                }}
              >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                  mb={1}
                >
                  Add New Item
                </Typography>

                <br />


                <FormControl >
                  <FormLabel>Select a category</FormLabel>
                  <Stack direction="row" spacing={1}>
                    <SelectCategoryButton  token={token} classes={classes} setClasses={setClasses} handleClearCategory={handleClearCategory} setApplyClassesFlag={setApplyClassesFlag}/>
                    <Input style={{width: '100%'}} size="sm" value={classesString} placeholder="Choose a category" disabled/>
                  </Stack>
                </FormControl>

                <br />

                <FormControl >
                  <FormLabel>Supplementary Information</FormLabel>
                  <Stack direction="row" spacing={1}>
                    <Input placeholder='Optional' style={{width: '100%'}} size="sm" value={itemName} onChange={handleItemNameChange}/>
                  </Stack>
                </FormControl>

                <br />


                <FormControl>
                  <FormLabel>Amount of the item</FormLabel>
                  <Input type="number" style={{width: '100%'}}  size="sm" value={amount} onChange={handleAmountChange}/>
                </FormControl>




                <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
                  <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                    <Button style={{margin:'15px', marginLeft:'320px', width:'100px'}} startDecorator={<CheckIcon/>} variant="soft" size="sm" 
                      onClick={postNewItem}
                    >
                      Confirm
                    </Button>
                  </CardActions>
                </CardOverflow>



              </Sheet>
            </Modal>
          </React.Fragment>


            {posts.map((item, index) => {
              return(
                <WishListCard 
                  key={index}
                  token={token}
                  item={item}
                />
                )  
              })
            }


          </List>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
