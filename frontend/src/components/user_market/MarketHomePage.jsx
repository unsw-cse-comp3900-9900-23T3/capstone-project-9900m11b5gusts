import React from 'react';
import Box from "@mui/joy/Box"
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

import SearchIcon from '@mui/icons-material/Search';

import SearchBar from './SearchBar';
import SelectCategoryButton from '../user_general/SelectCategoryButton';

export default function MarketHomePage ({ token }) {
  const [classes, setClasses] = React.useState({ c1: '', c2: '', c3: '' });
  const [applyClassesFlag, setApplyClassesFlag] = React.useState(false)

  const handleClearCategory = () => {
    setClasses((p) => ({...p, c1: '', c2: '', c3: ''}))
    setApplyClassesFlag(false)
  }

  return(
    <Box sx={{ flex: 1, width: "100%" }} >

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
          <SelectCategoryButton token={token} classes={classes} setClasses={setClasses} handleClearCategory={handleClearCategory} setApplyClassesFlag={setApplyClassesFlag}/>
          <SearchBar token={token} classes={classes} setClasses={setClasses} handleClearCategory={handleClearCategory} applyClassesFlag={applyClassesFlag} setApplyClassesFlag={setApplyClassesFlag}/>
        </Stack>

      </div>

    </Box>
  )
  
}