import * as React from "react"
import AspectRatio from "@mui/joy/AspectRatio"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import CardOverflow from "@mui/joy/CardOverflow"
import Chip from "@mui/joy/Chip"
import IconButton from "@mui/joy/IconButton"
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



export default function ItemCard({
  token=null,
  index=-1,
  category1 = '',
  category2 = '',
  category3 = '',
  title = 'Default title',
  item_id=-1,
  location = 'Default location',
  amount = '0',
  price = '0',
  exchangeMethod = 'cash',
  exchangeItem = '',
  finished = false,
  image = 'https://glamadelaide.com.au/wp-content/uploads/2022/06/Coles-Collectable-Harry-Potter.jpg',
  manageItemID
}) {

  const handleEditButton = () => {
    // console.log('clicked')
    // console.log(index)
    manageItemID(index)
    window.location.href='/myposts/edititem'
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
        "item_id": item_id
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
          {image && <img alt="" src={image} />}
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
            <Stack direction="column">
            <IconButton
                variant="plain"
                size="sm"
                color={"neutral"}
                onClick={handleEditButton}
                sx={{
                  display: { xs: "flex", sm: "none" },
                  ml: "auto",
                  borderRadius: "50%",
                  zIndex: "20"
                }}
              >
                <EditNoteIcon />Edit
              </IconButton>
              <IconButton
                variant="plain"
                size="sm"
                color={"danger"}
                // onClick={handleEditButton}
                sx={{
                  display: { xs: "flex", sm: "none" },
                  ml: "auto",
                  borderRadius: "50%",
                  zIndex: "20"
                }}
              >
                <DeleteIcon />Delete
              </IconButton>

            </Stack>


          </Stack>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <div>
            <Typography level="body-sm">Category: {category1} 》{category2}》{category3}</Typography>
            <Typography level="title-md">
              <Link
                overlay
                underline="none"
                href="#interactive-card"
                sx={{ color: "text.primary" }}
              >
                {title}
              </Link>
            </Typography>
          </div>
          <Stack direction="column">
            <IconButton
              variant="plain"
              size="sm"
              color={"neutral"}
              onClick={handleEditButton}
              sx={{
                display: { xs: "none", sm: "flex" },
                borderRadius: "50%"
              }}
            >
              <EditNoteIcon />Edit
            </IconButton>
            <IconButton
              variant="plain"
              size="sm"
              color={"danger"}
              // onClick={handleEditButton}
              sx={{
                display: { xs: "none", sm: "flex" },
                borderRadius: "50%"
              }}
              onClick={handleDeleteButton}
            >
              <DeleteIcon />Delete
            </IconButton>
          </Stack>

          
        </Stack>

        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ my: 0.25 }}
        >
          <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
            {location}
          </Typography>
          {/* <Typography level="body-xs" startDecorator={<KingBedRoundedIcon />}>
            1 bed
          </Typography>
          <Typography level="body-xs" startDecorator={<WifiRoundedIcon />}>
            Wi-Fi
          </Typography> */}
        </Stack>
        <Stack direction="row" sx={{ mt: "auto" }}>
          <Typography
            level="title-sm"
            // startDecorator
            sx={{ display: "flex", gap: 1 }}
          >
            Amount: {amount}
          </Typography>
          {exchangeMethod === 'cash' 
          ?
            <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: "right" }}>
              <strong>${price}</strong> <Typography level="body-md">total</Typography>
            </Typography>
          :
            <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: "right" }}>
              <Typography level="body-md">Exchange: {exchangeItem.length > 20 ? exchangeItem.slice(0, 20) + '...' : exchangeItem}</Typography>
            </Typography>
          }


        </Stack>
      </CardContent>
    </Card>
  )
}
