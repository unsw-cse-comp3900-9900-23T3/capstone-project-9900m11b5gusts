import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import CardOverflow from "@mui/joy/CardOverflow"
import Chip from "@mui/joy/Chip"
import Button from "@mui/joy/Button"
import Link from "@mui/joy/Link"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
// import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded"
import EditNoteIcon from '@mui/icons-material/EditNote';
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded"
// import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded"
// import WifiRoundedIcon from "@mui/icons-material/WifiRounded"
// import Star from "@mui/icons-material/Star"
import VerifiedIcon from '@mui/icons-material/VerifiedTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import UserInfoChip from "../user_general/UserInfoChip"
import SeeItemDetail from "../user_market/SeeItemDetail"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';



export default function MessageCard({ token, index, item, finished=false }) {

	console.log(index, item)
  // console.log(item.item_detail)

  console.log(item.item_detail[item.item_id])

  const handleAcceptButton = () => {
    answerRequest(true)
    // window.location.href='/message'
  }

  const handleRejectButton = () => {
    answerRequest(false)
    // window.location.href='/message'
  }



  async function answerRequest( answer ){
    console.log('answering')
    const response = await fetch('http://127.0.0.1:5000/Items/handlePurchaseRequest', {
      method:'POST',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body:JSON.stringify({
        "history_id": item.history_id,
        "action": answer
      })
    });
    if (response.status===200){
      alert('Success')
      window.location.href='/myposts'
    }else{
      const data = await response.json();
      console.log(data)
      alert('error: ', data.error)
    }
  }

  if (item){
    return (
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          bgcolor: "neutral.softBg",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          "&:hover": {
            boxShadow: "lg",
            borderColor: "var(--joy-palette-neutral-outlinedDisabledBorder)"
          }
        }}
      >
                <CardOverflow
          sx={{
            mr: { xs: "var(--CardOverflow-offset)", sm: 0 },
            mb: { xs: 0, sm: "var(--CardOverflow-offset)" },
            "--AspectRatio-radius": {
              xs:
                "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0",
              sm:
                "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))"
            }
          }}
        >
          <AspectRatio
            ratio="1"
            flex
            sx={{
              minWidth: { sm: 120, md: 160 },
              "--AspectRatio-maxHeight": { xs: "160px", sm: "9999px" }
            }}
          >
            {item.item_detail[item.item_id].image && <img alt="" src={item.item_detail[item.item_id].image} />}
            <Stack
              alignItems="center"
              direction="row"
              sx={{ position: "absolute", top: 0, width: "100%", p: 1 }}
            >
              {finished && (
                <Chip
                  variant="soft"
                  color="success"
                  startDecorator={<VerifiedIcon />}
                  size="md"
                >
                  Finished
                </Chip>
              )}
              {}



            </Stack>
            
          </AspectRatio>
          
        </CardOverflow>

        <CardContent>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{width: '400px'}}
          >

            <Typography level="title-lg">
              <SeeItemDetail token={token} item={item.item_detail[item.item_id]} current_user_email={item.seller_email} />
            </Typography>

            <Typography level="title-md">
              × {item.purchase_amount}
            </Typography>
            
          </Stack>

          <br /><br /><br /><br /><br /><br />

          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{width: '400px'}}
          >
            <Typography level="title-md">
              Received an exchange request from 
            </Typography>
            <UserInfoChip token={token} email={item.buyer_email} name={item.buyer_name}/>


          </Stack>


          <Typography level="title-md">
            {item.time_stamp}
          </Typography>

          <Stack direction="row"  sx={{display:'flex', justifyContent:'flex-end'}}>
            <Button
              variant="outlined"
              size="sm"
              color={"primary"}
              onClick={handleAcceptButton}
              sx={{margin:'5px'}}
            >
              <EditNoteIcon />Accept
            </Button>
            <Button
              variant="outlined"
              size="sm"
              color={"danger"}
              onClick={handleRejectButton}
              sx={{margin:'5px'}}
            >
              <CancelOutlinedIcon />Rejcet
            </Button>
          </Stack>


        </CardContent>
      </Card>
    )
  }
}
