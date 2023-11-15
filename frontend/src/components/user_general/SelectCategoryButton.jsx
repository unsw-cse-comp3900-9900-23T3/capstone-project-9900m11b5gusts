// This is a button. A modal will be opened if clicked.
// User can select a category they want on the modal, apply it or cancel it. 
// The information about category is fetched from server every time it is clicked.
// So the category user can choose is always up-to-date, as long as the backend has the latest category.


import * as React from 'react';
import Button from '@mui/joy/Button';
import SegmentIcon from '@mui/icons-material/Segment';

import List from '@mui/joy/List';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/joy/Divider';
import ListDivider from '@mui/joy/ListDivider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export default function SelectCategoryButton({ token, classes, setClasses, handleClearCategory, setApplyClassesFlag }) {

  const [layout, setLayout] = React.useState(undefined);
  const [category, setCategory] = React.useState(null)

  const handleButtonClick = () => {
    updateCategory()
    setLayout('center')
  }

  React.useEffect(()=>{
    console.log('classes: ', classes)
  }, [classes])


  async function updateCategory(){
    const response = await fetch('http://127.0.0.1:5000/Items/getCategory', {
      method:'GET',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      }
    });
    if (response.status===200){
      const data = await response.json();
      console.log(data);
      setCategory(data)

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          console.log(`Key: ${key}, Value: ${value}`);
        }
      }

    }else{  
      const data = await response.json();
      console.log(data);
    }
  }


  function renderClassesLeft(obj) {
    if (classes.c2) {
      return Object.entries(obj[classes.c1]).map(([key, value]) => (
        <>
          <ListItemButton 
            onClick={()=>{setClasses((p) => ({...p, c2: key}))}} 
            key={key} 
            selected={classes.c2===key}
            sx={{borderRadius:'5px 5px 5px 5px'}}
          >
            {key}
            {classes.c2===key && <KeyboardArrowRight/>}
            
          </ListItemButton>
          <ListDivider />
        
        </>

      ));
    } else {
      return (
        <>
          <ListItemButton onClick={handleClearCategory} selected={!classes.c1} sx={{borderRadius:'5px 5px 5px 5px'}}>
            ALL
          </ListItemButton>
          <ListDivider />
          {Object.entries(obj).map(([key, value]) => (
          <>

            <ListItemButton onClick={()=>{setClasses((p) => ({...p, c1: key}))}} key={key} selected={classes.c1===key}
              sx={{borderRadius:'5px 5px 5px 5px'}}
            >
              {key}
              {classes.c1===key && <KeyboardArrowRight/>}
            </ListItemButton>
            <ListDivider />
            
          </>

          ))}
        </>
      )
    }
  }


  function renderClassesRight(obj) {
    if (classes.c2) {
      return (
        <>
          <ListItemButton onClick={()=>{setClasses((p) => ({...p, c2: ''}))}} 
            sx={{borderRadius:'5px 5px 5px 5px'}}
          >
            <ArrowBackIosIcon/>
             Back
          </ListItemButton>
          <ListDivider />
          <ListItemButton onClick={()=>{setClasses((p) => ({...p, c3: ''}))}} selected={!classes.c3}
            sx={{borderRadius:'5px 5px 5px 5px'}}
          >
            ALL
          </ListItemButton>
          <ListDivider />
          {Object.keys(obj[classes.c1][classes.c2]).map((key) => (
            <>
              <ListItemButton key={key}
                onClick={()=>{setClasses((p) => ({...p, c3: key}))}}
                selected={classes.c3===key}
                sx={{borderRadius:'5px 5px 5px 5px'}}
              >{key}</ListItemButton>
              <ListDivider />
            </>
          ))}
        </>
      )
    } else if (classes.c1) {
      return (
        <>
          <ListItemButton onClick={handleClearCategory} sx={{borderRadius:'5px 5px 5px 5px'}}>
            <ArrowBackIosIcon/>
             Back
          </ListItemButton>
          <ListDivider />
          <ListItemButton onClick={()=>{setClasses((p) => ({...p, c2: ''}))}} selected={!classes.c2} 
            sx={{borderRadius:'5px 5px 5px 5px'}}
          >
            ALL
          </ListItemButton>
          <ListDivider />
          {Object.keys(obj[classes.c1]).map((key) => (
            <>
              <ListItemButton key={key}
                onClick={()=>{setClasses((p) => ({...p, c2: key}))}}
                sx={{borderRadius:'5px 5px 5px 5px'}}
              >{key}</ListItemButton>
              <ListDivider />
            </>
          ))}
        </>
      )
    } else {
      return (
        <>
          <ListItemButton onClick={handleClearCategory} sx={{borderRadius:'5px 5px 5px 5px'}}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </ListItemButton>
          {/* <ListDivider /> */}
        </>
      )
    }
  }



  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          style={{height: '48px', width:'100px'}}
          variant="outlined"
          color="neutral"
          onClick={handleButtonClick}
        >
          <SegmentIcon/>
          Category
        </Button>
      </Stack>
      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}
          sx={{
            position: 'absolute',
            height: { xs: '80%', md: '90%' },
            width:{ xs: '90%', md: '60%' },
            left: { xs: '', md: '58%' }

          }}
        >
          <ModalClose />
          <DialogTitle>Category Filter:</DialogTitle>
          &nbsp;&nbsp;  {classes.c1 && classes.c1 + '》'} {classes.c2 && ( classes.c2 + '》') }  {classes.c3 && ( classes.c3) }

          <Stack
            divider={<Divider orientation="vertical" />}
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
            sx={{
              overflow: 'auto',
            }}
            
          >
            
            <List
              sx={{
                overflow: 'auto',
                mx: 'calc(-1 * var(--ModalDialog-padding))',
                px: 'var(--ModalDialog-padding)',
              }}
            >
              <ListDivider />
              { category &&
                <>
                  {renderClassesLeft(category)}
                </>
              }
            </List>
            
            <List
              sx={{
                overflow: 'auto',
                mx: 'calc(-1 * var(--ModalDialog-padding))',
                px: 'var(--ModalDialog-padding)',
              }}
            >

              <ListDivider />
              { category &&
                <div>
                  {renderClassesRight(category)}
                </div>
              }
              
            </List>
          </Stack>
          <span style={{display:'flex', justifyContent: 'end', position: 'absolute', bottom: '15px', right: '15px'}}>
            <Button style={{margin: '5px'}} variant='outlined' onClick={() => {setLayout(undefined)}}>Cancel</Button>
            <Button style={{margin: '5px'}} 
              onClick={() => {setLayout(undefined)
                        setApplyClassesFlag(true)}} >
              Confirm
            </Button>
          </span>

        </ModalDialog>
        
      </Modal>
      
    </React.Fragment>
  );
}