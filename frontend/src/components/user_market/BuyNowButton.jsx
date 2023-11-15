// This button is called by SeeItemDetail.jsx
// It opens a new modal that allow users to enter the amount of the item they need,
// and then confirm sending the trade request

import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function BuyNowButton({ token, item, current_user_email }) {
  const [layout, setLayout] = React.useState(undefined);
	const [buyNum, setBuyNum] = React.useState(1);


  async function buyingRequest () {
    const response = await fetch('http://127.0.0.1:5000/Items/purchaseItem', {
      method:'POST',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body:JSON.stringify({
        "item_id": item.item_id,
        "purchase_amount": buyNum
      })
    });
    if (response.status===200){
      alert('Exchange request has been sent to the seller. ')
      window.location.href='/market'
    }else{
      const data = await response.json();
      console.log(data)
      alert('error: ', data.error)
    }
  }

	function handleConfirmButton () {
		if (buyNum <= item.item_num  && buyNum > 0) {
			const isConfirmed = window.confirm(`You are buying ${buyNum} item(s). Are you sure about that? `);
			if (isConfirmed) {
				buyingRequest()
			}
		} else {
			alert(`Invalid amount. The amount must range from 1 to ${item.item_num}. `)
		}
  }

  return (
    <React.Fragment>

			<Button variant="solid" color="primary" size="lg"
				sx={{width: '100%'}}
				onClick={()=>{setLayout('center')}}
			>
				I want it
			</Button>

      <Modal
        open={!!layout}
        onClose={() => {
          setLayout(undefined);
        }}
      >
        <ModalDialog layout={layout}
          sx={{
            position: 'absolute',
            height: { xs: '40%', md: '45%' },
            width:{ xs: '60%', md: '45%' },
            left: { xs: '', md: '58%' },
          }}
        >
          <ModalClose  />
          

          <Box sx={{overflow: 'auto', height: '100%', marginTop:'24px'}}>
						<DialogTitle level="title-lg" sx={{margin:'5px'}}>
							We highly recommend you to contact the seller before sending exchange request to the owner.
						</DialogTitle>
						<br />
						<Typography level="body-lg" sx={{margin:'5px'}}>
							How many do you want?
						</Typography>
						

						<Box sx={{display:'flex', justifyContent:'center'}}>

							<Stack >

								<Input
									sx={{marginTop:'40px', width: '150px'}}
									value={buyNum} 
									onChange={(e)=>{
										if (e.target.value){
											setBuyNum(parseInt(e.target.value))
										} else {
											setBuyNum('')
										}
									}}
									endDecorator={
										<>
											<Button 
												variant="outlined"
												color="primary"
												type="submit"
												sx={{ marginRight: '3px',  width:'20px'}}
												onClick={()=>{
													if (buyNum>1){
														setBuyNum(n=>(n-1))
													}
												}}
												
											>
												<RemoveIcon sx={{ fontSize: 20 }}/>
											</Button>
											<Button 
												variant="outlined"
												color="primary"
												type="submit"
												sx={{ marginLeft: '3px', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width:'20px'}}
												onClick={()=>{
													if (buyNum<item.item_num){
														setBuyNum(n=>(n+1))
													}
												}}
											>
												<AddIcon sx={{ fontSize: 20 }}/>
											</Button>
										</>
									}
								>  
								
								</Input>
								<Typography level="body-sm" >
									Maximum amount: {item.item_num}
								</Typography>
								<br />
							</Stack>

						</Box>

						<Button 
							variant='outlined' 
							sx={{width:'100px', position: 'absolute', bottom:'20px', right:'140px'}}
							onClick={() => {
								setLayout(undefined);
							}}
						>
							Cancel
						</Button>
						
						<Button 
							sx={{width:'100px', position: 'absolute', bottom:'20px', right:'20px'}}
							onClick={handleConfirmButton}
						>
							Confirm 
						</Button>

          </Box>

        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}