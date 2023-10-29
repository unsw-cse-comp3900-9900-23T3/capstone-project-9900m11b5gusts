import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import SelectCategoryButton from "../user_general/SelectCategoryButton.jsx"
import Input from "@mui/joy/Input"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import Button from "@mui/joy/Button"
import CheckIcon from '@mui/icons-material/Check';
import Stack from "@mui/joy/Stack";


export default function WishListCard( {token, item} ) {
  const [open, setOpen] = React.useState(false);


  const [classes, setClasses] = React.useState({ c1: '', c2: '', c3: '' });
  const [applyClassesFlag, setApplyClassesFlag] = React.useState(false)
  const [classesString, setClassesString] = React.useState('')

  const [amount, setAmount] = React.useState('')
  const [itemName, setItemName] = React.useState('')


  React.useEffect(() => {
    setClasses((p) => ({...p, c1: item.class1, c2: item.class2, c3: item.class3}))
    setItemName(item.item_name)
    setAmount(item.item_num)
    if (item.class1) {
      setApplyClassesFlag(true)
    }
  },[])

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



  const handleDeleteButton = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");

    if (isConfirmed) {
      confirmDelete()
    }
  }

  async function confirmDelete(){

    const response = await fetch('http://127.0.0.1:5000/Items/deleteWishList', {
      method:'DELETE',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body:JSON.stringify({
        "item_id": item.item_id
      })
    });
    if (response.status===200){
      alert('Success')
      window.location.href='/wishlist'
    }else{
      const data = await response.json();
      console.log(data)
      alert('Error. ', data.msg)
    }
  }

  async function confirmEdit(){
    console.log(item.item_id)
    console.log(token)
    
    if (!(applyClassesFlag && amount)) {
      alert('Please provide all information.')
    } else {
      const response = await fetch('http://127.0.0.1:5000/Items/updateWishList', {
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : `Bearer ${token}`,
        },
        body:JSON.stringify({
          "item_id": item.item_id,
          "item_name": itemName,
          "image":"",
          "description": "",
          "price": 0,
          "num": amount,
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
        window.location.href='/wishlist'
      }else{
        const data = await response.json();
        alert(data.error)
      }
    }
  }


  return (

    <React.Fragment>
      <ListItem
        variant='outlined'
        endAction={
          <> 
            <div style={{margin:'5px', marginRight:'10px'}}>× {item.item_num}</div>
            <IconButton aria-label="Delete" size="sm" color="danger">
              <Delete onClick={handleDeleteButton}/>
            </IconButton>
          </>
        }
      >
        <ListItemButton
          onClick={() => setOpen(true)}
        >
          {item.class1 ? item.class1 : 'Other'}
          {item.class2 && (' 》' + item.class2) }
          {item.class3 && (' 》' + item.class3) } 
          <br /> &nbsp;&nbsp;&nbsp;&nbsp;
          {item.item_name && item.item_name}
        </ListItemButton>
      </ListItem>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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
                onClick={confirmEdit}
              >
                Confirm
              </Button>
            </CardActions>
          </CardOverflow>



        </Sheet>
      </Modal>
    </React.Fragment>
  );
  
}