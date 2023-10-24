import React from 'react';
import Box from "@mui/joy/Box"
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

import SearchIcon from '@mui/icons-material/Search';

import SearchBar from './SearchBar';
import SelectCategoryButton from '../user_general/SelectCategoryButton';
import Pagination from "../user_general/Pagination";
import ItemCard from '../user_personal/ItemCard';

export default function MarketHomePage ({ token }) {
  const [classes, setClasses] = React.useState({ c1: '', c2: '', c3: '' });
  const [applyClassesFlag, setApplyClassesFlag] = React.useState(false)
  const [pageNum, setPageNum] = React.useState(1)
  const [posts, setPosts] = React.useState([])
  const [searchWords, setSearchWords] = React.useState('')

  React.useEffect(() => {
    console.log('market: ', posts)
    console.log(posts.length)
  },[posts])

  const handleClearCategory = () => {
    setClasses((p) => ({...p, c1: '', c2: '', c3: ''}))
    setApplyClassesFlag(false)
  }

  async function search(){
    const response = await fetch(`http://127.0.0.1:5000/Items/searchItem/${pageNum}`, {
        method:'POST',
        headers:{
          'Content-type': 'application/json',
          'Authorization' : `Bearer ${token}`,
        },
        body:JSON.stringify({
          "keyword": searchWords,
          "class1": applyClassesFlag ? classes.c1 : '',
          "class2": applyClassesFlag ? classes.c2 : '',
          "class3": applyClassesFlag ? classes.c3 : '',
          "price_sorted": "default",
          "trading_method": "default",
          "change": true
        })
      });
      if (response.status===200){
        const data = await response.json();
        console.log('posts: ', data.success)
        if (data.success !== 'no item'){
            setPosts([])
            Object.entries(data.success).map((item) => {
            setPosts(prev => [...prev, item[1]])
          })
        }
      }else{
        const data = await response.json();
        alert(data)
      }
  }

  return(
    <Box sx={{ flex: 1, width: "100%" }} >

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction="row" spacing={2} style={{marginTop: '30px'}}>
          <SelectCategoryButton 
            token={token} 
            classes={classes} 
            setClasses={setClasses} 
            handleClearCategory={handleClearCategory} 
            setApplyClassesFlag={setApplyClassesFlag}
          />
          <SearchBar 
            token={token} 
            classes={classes} 
            setClasses={setClasses} 
            handleClearCategory={handleClearCategory} 
            applyClassesFlag={applyClassesFlag} 
            setApplyClassesFlag={setApplyClassesFlag}
            search={search}
            searchWords={searchWords}
            setSearchWords={setSearchWords}

          />
        </Stack>
        

      </div>
      <br />
      <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Stack spacing={2} sx={{ overflow: "auto" }}>

            {posts.map((item, index) => {
              if (item.item_id) {
                return(
                  <ItemCard 
                    title={item.item_name} 
                  />
                  )  
              }

            })}

            <ItemCard
              title="Designer NY style loft"
              category="Entire loft in central business district"
              liked 
              finished = {true}
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400"
            />
            
           
          </Stack>
        </Stack>


      {/* <Pagination/> */}

    </Box>
  )
  
}