// This is called by ExchangeHistoryPage.jsx
// Displays a history record 

import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import CardOverflow from "@mui/joy/CardOverflow"
import Chip from "@mui/joy/Chip"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import VerifiedIcon from '@mui/icons-material/VerifiedTwoTone';
import UserInfoChip from "../user_general/UserInfoChip"
import SeeItemDetail from "./SeeItemDetail"
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PendingIcon from '@mui/icons-material/Pending';



export default function HistoryCard({ token, item, finished=false, selectedTab }) {

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
              {finished ? 
                ( item.status ==='approved'?
                    <Chip
                      variant="soft"
                      color="success"
                      startDecorator={<VerifiedIcon />}
                      size="md"
                    >
                      Completed
                    </Chip>
                  :
                    <Chip
                      variant="soft"
                      color="danger"
                      startDecorator={<CancelOutlinedIcon />}
                      size="md"
                    >
                      Failed
                    </Chip>
                )
              :
                <Chip
                  variant="soft"
                  color="primary"
                  startDecorator={<PendingIcon />}
                  size="md"
                >
                  Pending
                </Chip>
              }

              



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


          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{width: '400px'}}
          >
            <Typography level="title-md">
              {selectedTab === 'Bought'? 'Seller: ' : 'Buyer: ' }  
            </Typography>
            <UserInfoChip token={token} email={item.buyer_email} name={item.buyer_name}/>


          </Stack>


          <Typography level="title-md">
            {item.time_stamp}
          </Typography>




        </CardContent>
      </Card>
    )
  }
}
