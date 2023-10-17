import React from 'react';
import Box from "@mui/joy/Box"
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import SegmentIcon from '@mui/icons-material/Segment';
import SearchIcon from '@mui/icons-material/Search';

export default function Homepage ({ token }) {
  
  console.log('loding homepage')
  return(
    <Box sx={{ flex: 1, width: "100%" }} >

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
          <Button variant="outlined" style={{width: '120px'}}><SegmentIcon/>Category</Button>
            <Input fullWidth  id="fullWidth" />
          <Button variant="outlined" style={{width: '120px'}}><SearchIcon/>Search</Button>
        </Stack>
      </div>

    </Box>
  )
  
}