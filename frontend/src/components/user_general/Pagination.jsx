// This is called by MarketHomePage.
// Pagination is ... is what it is.
// User can go to different page by entering a number or clicking the previous or next button.
// About how it determine the maximum page num.
// The backend will return the total number of items alongside with item details when search() is called.
// Also, the backend returns 10 items at maximum at a time.
// So the ceiling of [(total number of items) / 10] is the maximum page num

import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded"
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded"
import Input from '@mui/joy/Input';

export default function Pagination( { pageNum, setPageNum, maxPageNum, search } ) {

  const handleSubmit = (event) => {
    event.preventDefault();
    if(parseInt(pageNum)>parseInt(maxPageNum)) {
      setPageNum(maxPageNum)
      search(maxPageNum)
    } else if (pageNum<1){
      setPageNum(1)
      search(1)
    } else {
      search(pageNum)
    }
    
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <Box
        className="Pagination-mobile"
        sx={{
          display: 'flex',
          alignItems: "center",
          justifyContent: "center",
          mx: 2,
          my: 1,
        }}
      >
        <IconButton
          disabled={pageNum <= 1}
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          sx= {{margin: '8px'}}
          onClick={()=>{
            if (pageNum>0){
              setPageNum(p=>(p-1))
              search(pageNum-1)
            }
          }}
        >
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <Typography level="body-sm" >
          Page &nbsp;
        </Typography>

        
        <Input
          type="number"
          value={pageNum} 
          size="sm" 
          style={{width: `${(pageNum.toString().length || 1) * 8 +80}px`}}
          onChange={(e)=>{
            if (e.target.value){
              setPageNum(parseInt(e.target.value))
            } else {
              setPageNum('')
            }
          }}
          sx={{ '--Input-decoratorChildHeight': '30px' }}
          endDecorator={
            <Button 
              variant="solid"
              color="primary"
              // loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width:'20px'}}
            >
              Go
            </Button>
          }
          
        />


        <Typography level="body-sm" >
          &nbsp; of {maxPageNum}
        </Typography>
        <IconButton
          disabled={pageNum >= maxPageNum}
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          sx= {{margin: '8px'}}
          onClick={()=>{
            if (pageNum<maxPageNum){
              setPageNum(p=>(p+1))
              search(pageNum+1)
            }
          }}
        >
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>
    </form>
  )
}
