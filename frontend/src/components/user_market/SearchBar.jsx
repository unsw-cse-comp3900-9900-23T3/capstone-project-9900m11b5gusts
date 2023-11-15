// This is a search bar. It is called by MarketHomePage.jsx


import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';


export default function SearchBar({ 
  classes, 
  handleClearCategory, 
  applyClassesFlag, 
  search, 
  searchWords, 
  setSearchWords }) {


  const handleSubmit = (event) => {
    event.preventDefault();
		// console.log('submiting...')
    search(1)
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>

        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          value={searchWords}
          onChange={(event) =>
            setSearchWords(event.target.value)
          }

          endDecorator={
            <Button
              variant="solid"
              color="primary"
              // loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
							
            >
							<SearchIcon/>
              Search
            </Button>
          }
        />
        
				<FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
          {applyClassesFlag && classes.c1 && 
            <Chip
              size="lg"
              variant="soft"
              // color="danger"
              startDecorator={<ChipDelete variant='solid' onDelete={handleClearCategory} />}
            >
              &nbsp;
              {applyClassesFlag && classes.c1 && 'Filter: ' + classes.c1}
              {applyClassesFlag && classes.c2 && (' 》' + classes.c2) }
              {applyClassesFlag && classes.c3 && (' 》' + classes.c3) } 
            </Chip>
          }
          

        </FormLabel>
      </FormControl>
    </form>
  );
}