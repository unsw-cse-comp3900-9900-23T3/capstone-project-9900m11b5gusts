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
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded"
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded"
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded"
import KingBedRoundedIcon from "@mui/icons-material/KingBedRounded"
import WifiRoundedIcon from "@mui/icons-material/WifiRounded"
import Star from "@mui/icons-material/Star"
import VerifiedIcon from '@mui/icons-material/VerifiedTwoTone';

export default function ItemCard({
  category1 = '',
  category2 = '',
  category3 = '',
  title = 'Default title',
  location = 'Default location',
  amount = '0',
  price = '0',
  finished = false,
  liked = false,
  image = 'https://glamadelaide.com.au/wp-content/uploads/2022/06/Coles-Collectable-Harry-Potter.jpg'
}) {
  const [isLiked, setIsLiked] = React.useState(liked)
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
          <img alt="" src={image} />
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
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? "danger" : "neutral"}
              onClick={() => setIsLiked(prev => !prev)}
              sx={{
                display: { xs: "flex", sm: "none" },
                ml: "auto",
                borderRadius: "50%",
                zIndex: "20"
              }}
            >
              <FavoriteRoundedIcon />
            </IconButton>
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
          <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? "danger" : "neutral"}
            onClick={() => setIsLiked(prev => !prev)}
            sx={{
              display: { xs: "none", sm: "flex" },
              borderRadius: "50%"
            }}
          >
            <FavoriteRoundedIcon />
          </IconButton>
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
          <Typography level="title-lg" sx={{ flexGrow: 1, textAlign: "right" }}>
            <strong>${price}</strong> <Typography level="body-md">total</Typography>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
