// This is a modal that is called in ItemCard.jsx
// Will display details of the collectibles when ItemCard is clicked 

import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Link from "@mui/joy/Link"
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import UserInfoChip from '../user_general/UserInfoChip';
import BuyNowButton from './BuyNowButton';


export default function SeeItemDetail({ token, item, current_user_email }) {
  const [layout, setLayout] = React.useState(undefined);

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
                  (Amount left: <b>{item.item_num}</b>)
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
              <BuyNowButton token={token} item={item} />
            </CardOverflow>
          
          }

        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}