import * as React from 'react';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Link from "@mui/joy/Link"
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import UserInfoChip from '../user_general/UserInfoChip';


export default function SeeItemDetail({ token, item, current_user_email }) {
  const [layout, setLayout] = React.useState(undefined);

  const handleBuyNowButton = () => {
    const isConfirmed = window.confirm("Please contact the seller before purchase.\nAre you sure you want to buy it? ");

    if (isConfirmed) {
      buyingRequest()
    }
  }

  async function buyingRequest () {
    const response = await fetch('http://127.0.0.1:5000/Items/purchaseItem', {
      method:'POST',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body:JSON.stringify({
        "item_id": item.item_id,
        "purchase_amount": item.item_num
      })
    });
    if (response.status===200){
      alert('Transaction request has been sent to the seller. ')
      window.location.href='/market'
    }else{
      const data = await response.json();
      console.log(data)
      alert('error: ', data.error)
    }
  }


  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
			<Link
				overlay
				underline="none"
				// href="#interactive-card"
				sx={{ color: "text.primary" }}
				onClick={()=>{setLayout('center')}}
			>
        {item.item_name}
      </Link>
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
            left: { xs: '', md: '58%' },
          }}
        >
          <ModalClose token={token} email={item.owner_email} />
          

          <Box sx={{overflow: 'auto', height: '100%', marginTop:'24px'}}>

            <Card variant='plain' sx={{ width: '100%'}}>
              <CardOverflow>
                <AspectRatio sx={{ minWidth: 200 }}>
                  {item.image &&
                    <img
                      src={item.image}
                      loading="lazy"
                      alt=""
                    />
                  }
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                
                <Typography level="body-xs" sx={{margin:'5px'}}>
                  Category: &nbsp;
                  {item.class1 ? item.class1 : 'None'}
                  {item.class2 && (' 》' + item.class2)}
                  {item.class3 && (' 》' + item.class3)} 
                </Typography>

                <DialogTitle level="title-xl" sx={{margin:'5px'}}>
                  {item.item_name}
                </DialogTitle>
                <Typography level="body-sm" sx={{marginLeft:'15px'}}>
                  (Amount: <b>7</b>)
                </Typography>

                <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: 'xl' , margin:'5px' ,marginLeft:'15px'}}
                  // endDecorator={
                  //   <Chip component="span" size="sm" variant="soft" color="success">
                  //     Lowest price
                  //   </Chip>
                  // }
                >
                  {item.trading_method==='cash'
                    ?
                      'AUD $' + item.item_price
                    :
                      'Exchange for ' + item.exchange_item
                  }
                </Typography>

                <span> &nbsp; <UserInfoChip token={token} email={item.owner_email} name={item.username}/></span>

                <Typography >
                  <br /> 
                  Description: <br />                  
                  {item.item_desc}
                </Typography>
                
              </CardContent>
            </Card>

          </Box>

          {item.owner_email !== current_user_email &&
            <CardOverflow>
              <Button variant="solid" color="primary" size="lg"
                onClick={handleBuyNowButton}
              >
                      Buy now
              </Button>
            </CardOverflow>

          }



        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}