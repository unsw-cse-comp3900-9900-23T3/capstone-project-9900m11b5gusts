import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SegmentIcon from '@mui/icons-material/Segment';
import SearchIcon from '@mui/icons-material/Search';

export default function Homepage ({ token }) {
    
  return(
		<>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
          <Button variant="outlined" style={{width: '120px'}}><SegmentIcon/>Category</Button>
          <Box sx={{ width: 600, maxWidth: '100%' }}>
            <TextField fullWidth  id="fullWidth" />
          </Box>
          <Button variant="outlined" style={{width: '120px'}}><SearchIcon/>Search</Button>
        </Stack>
      </div>

    </>
  )
  
}