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

  const handleEditButton = () => {
  }

  const handleDeleteButton = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");

    if (isConfirmed) {
      confirmDelete()
    }
  }

  async function confirmDelete(){
    const response = await fetch('http://127.0.0.1:5000/Items/deleteItem', {
      method:'DELETE',
      headers:{
        'Content-type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body:JSON.stringify({
        // "item_id": item.item_id
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


        <CardContent>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >

						Your item 

            <div>
              <Typography level="title-lg">
                <SeeItemDetail token={token} item={item} current_user_email={item.seller_email} />
              </Typography>
            </div>

						has a new exchange request from

						<UserInfoChip token={token} email={item.buyer_email} name={item.buyer_email}/>
						

            

            
          </Stack>
					<Stack direction="row"  sx={{display:'flex', justifyContent:'flex-end'}}>
						<Button
							variant="outlined"
							size="sm"
							color={"primary"}
							onClick={handleEditButton}
							sx={{margin:'5px'}}
						>
							<EditNoteIcon />Accept
						</Button>
						<Button
							variant="outlined"
							size="sm"
							color={"danger"}
							onClick={handleDeleteButton}
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
