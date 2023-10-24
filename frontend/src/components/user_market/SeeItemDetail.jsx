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
            


          </Box>

        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}