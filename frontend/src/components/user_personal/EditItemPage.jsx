//This is where user posts a new item

import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Button from "@mui/joy/Button"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Input from "@mui/joy/Input"
import Textarea from "@mui/joy/Textarea"
import Stack from "@mui/joy/Stack"
import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import CardCover from '@mui/joy/CardCover';
import CheckIcon from '@mui/icons-material/Check';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import UploadFileButton from "../user_general/UploadFileButton.jsx"
import SelectCategoryButton from "../user_general/SelectCategoryButton.jsx"

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import IconButton from "@mui/joy/IconButton"
import EditNoteIcon from '@mui/icons-material/EditNote';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/joy/Typography';


export default function EditItemPage({ token, index, profileData, item }) {

  const [posts, setPosts] = React.useState([])
  const [email, setEmail] = React.useState(null)


  const [itemName, setItemName] = React.useState(item.item_name)
  const [amount, setAmount] = React.useState(item.item_num)
  const [price, setPrice] = React.useState(item.exchange_item)
  const [description, setDescription] = React.useState(item.item_desc)
  const [picture, setPicture] = React.useState(item.image)
  const [tradeMethod, setTradeMedod] = React.useState(item.trading_method)
  const [itemID, setItemID] = React.useState(item.item_id)

  const [classes, setClasses] = React.useState({c1: item.class1, c2: item.class2, c3: item.class3});
  const [applyClassesFlag, setApplyClassesFlag] = React.useState(true)////////////////////////////////////might have problem here
  const [classesString, setClassesString] = React.useState('')

  const [openNewItem, setOpenNewItem] = React.useState(false);

  const [predictedCategory, setPredictedCategory] = React.useState({ c1: '', c2: '', c3: '' })
  const [showPredicted, setShowPredicted] = React.useState(false)


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


  React.useEffect(()=>{
    setShowPredicted(true)
  }, [predictedCategory])


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
        window.location.reload()
      }else{
        const data = await response.json();
        alert(data.error)
      }
    }
  }


  return (
    
    <React.Fragment>

    {`${window.location.hash.slice(1)}` === profileData.email &&
      <>
        <IconButton
          variant="plain"
          size="sm"
          color={"primary"}
          onClick={() => setOpenNewItem(true)}
          sx={{
            borderRadius: "50%"
          }}
        >
          <EditNoteIcon />Edit
        </IconButton>
      </>
    }

    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={openNewItem}
      onClose={() => setOpenNewItem(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position:'absolute', left:'220px'}}
    >
      
      <Stack spacing={4} sx={{ display: "flex", maxWidth: "700px", mx: "auto", px: { xs: 2, md: 6 }, py: { xs: 2, md: 3 }, height:'100%', width:'80%'  }} >
        
        <Card sx={{height:'100%'}}>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <br />

          <Stack
            direction="column"
            spacing={2}
            sx={{ my: 1, overflow:'auto' }}
          >
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

              <UploadFileButton setPicture={setPicture} words='Upload a picture' setPredictedCategory={setPredictedCategory}  />

              {predictedCategory.c1  && showPredicted &&
                <Card>
                  <Typography level="body-md" sx={{margin:'5px'}}>
                    The item in your picture seems to be under category: <br /> 
                  </Typography>
                
                  <Typography level="title-md" sx={{margin:'5px'}}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {predictedCategory.c1 ? predictedCategory.c1 : 'Others'}
                    {predictedCategory.c2 && (' 》' + predictedCategory.c2)}
                    {predictedCategory.c3 && (' 》' + predictedCategory.c3)} 
                  </Typography>

                  <Typography level="body-md" sx={{margin:'5px', display:'flex', alignContent:'center'}}>
                    &nbsp;&nbsp;&nbsp;  
                    Do you want to apply it?
                    <IconButton size="sm" variant="soft" color="success" sx={{marginLeft:'50px'}}
                      onClick={()=>{
                        setClasses(predictedCategory)
                        setApplyClassesFlag(true)
                        setShowPredicted(false)
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton size="sm" variant="soft" color="warning" sx={{marginLeft:'10px'}}
                      onClick={()=>{setShowPredicted(false)}}
                    >
                      <CloseIcon />
                    </IconButton>

                  </Typography>

                </Card>
              }

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
    </Modal>
  </React.Fragment>
  )
}
