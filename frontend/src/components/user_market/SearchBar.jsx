import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/joy/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function SearchBar({ 
  token, 
  classes, 
  setClasses, 
  handleClearCategory, 
  applyClassesFlag, 
  setApplyClassesFlag, 
  search, 
  searchWords, 
  setSearchWords }) {


  const handleSubmit = (event) => {
    event.preventDefault();
		console.log('submiting...')
    search()
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
            <IconButton
              aria-label="cancel_category_selection"
              size="sm"
              variant="outlined"
              color="neutral"
              sx={{
                bgcolor: "background.body",
                // position: "absolute",
                // zIndex: 2,
                borderRadius: "50%",
                // left: 85,
                // top: 180,
                boxShadow: "sm"
              }}
              onClick={handleClearCategory}
            >
              <CancelOutlinedIcon />
            </IconButton> 
          }
          
          {applyClassesFlag && classes.c1 && 'Filter: ' + classes.c1}
          {applyClassesFlag && classes.c2 && (' 》' + classes.c2) }
          {applyClassesFlag && classes.c3 && (' 》' + classes.c3) } 
        </FormLabel>
      </FormControl>
    </form>
  );
}