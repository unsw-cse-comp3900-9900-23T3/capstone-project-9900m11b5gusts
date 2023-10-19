import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/joy/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function SearchBar() {
  const [data, setData] = React.useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
		console.log('submiting...')
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>

        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          value={data.email}
          onChange={(event) =>
            setData({ email: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
							
            >
							<SearchIcon/>
              Search
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}

        {data.status === 'sent' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            You are all set!
          </FormHelperText>
        )}
				<FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
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
					>
						<CancelOutlinedIcon />
					</IconButton>
          Filter: category 》 category 》 category
        </FormLabel>
      </FormControl>
    </form>
  );
}