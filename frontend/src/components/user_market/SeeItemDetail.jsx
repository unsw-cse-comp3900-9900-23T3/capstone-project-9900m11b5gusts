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


export default function DialogVerticalScroll({ title }) {
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
        {title}
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
          <ModalClose />
          <DialogTitle>Vertical scroll example</DialogTitle>

          <Box sx={{overflow: 'auto'}}>

            <Card sx={{ width: '100%' }}>
              <CardOverflow>
                <AspectRatio sx={{ minWidth: 200 }}>
                  <img
                    src="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent>
                <Typography level="body-xs">Bluetooth Headset</Typography>
                <Link
                  href="#product-card"
                  fontWeight="md"
                  color="neutral"
                  textColor="text.primary"
                  overlay
                  endDecorator={<ArrowOutwardIcon />}
                >
                  Super Rockez A400
                </Link>

                <Typography
                  level="title-lg"
                  sx={{ mt: 1, fontWeight: 'xl' }}
                  endDecorator={
                    <Chip component="span" size="sm" variant="soft" color="success">
                      Lowest price
                    </Chip>
                  }
                >
                  2,900 THB
                </Typography>
                <Typography level="body-sm">
                  (Only <b>7</b> left in stock!)
                </Typography>
              </CardContent>
              <CardOverflow>
                <Button variant="solid" color="danger" size="lg">
                  Add to cart
                </Button>
              </CardOverflow>
            </Card>

          </Box>

        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}