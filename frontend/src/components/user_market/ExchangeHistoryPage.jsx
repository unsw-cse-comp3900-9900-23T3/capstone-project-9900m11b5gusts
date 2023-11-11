import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography"
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';

import ItemCard from "../user_general/ItemCard";
import { useLocation } from 'react-router-dom';
import MessageCard from "./MessageCard";
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import HistoryCard from "./HistoryCard";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


export default function ExchangeHistoryPage ({ token, profileData }) {
  const [posts, setPosts] = React.useState([])
	const [selectedTab, setSelectedTab] = React.useState('Bought')


  React.useEffect(()=>{
		if (selectedTab==='Bought') {
			checkBought()
		} else {
			checkSold()
		}
  },[selectedTab])


	async function checkBought(){
    const response = await fetch('http://127.0.0.1:5000/Items/getBuyingHistory', {
			method:'POST',
			headers:{
				'Content-type': 'application/json',
				'Authorization' : `Bearer ${token}`,
			},
			body:JSON.stringify({
				"email": `${window.location.hash.slice(1)}`
			})
		});
		if (response.status===200){
			const data = await response.json();
			console.log('posts: ', data.success)
			if (data.success){
					setPosts([])
					Object.entries(data.success).map((item) => {
					setPosts(prev => [...prev, item[1]])
				})
			}
		}else{
			const data = await response.json();
			console.log(data)
		}
  }

	async function checkSold(){
    const response = await fetch('http://127.0.0.1:5000/Items/getSellingHistory', {
			method:'POST',
			headers:{
				'Content-type': 'application/json',
				'Authorization' : `Bearer ${token}`,
			},
			body:JSON.stringify({
				"email": `${window.location.hash.slice(1)}`
			})
		});
		if (response.status===200){
			const data = await response.json();
			console.log('posts: ', data.success)
			if (data.success){
					setPosts([])
					Object.entries(data.success).map((item) => {
					setPosts(prev => [...prev, item[1]])
				})
			}
		}else{
			const data = await response.json();
			console.log(data)
		}
  }

	return(
		<CssVarsProvider disableTransitionOnChange>
			<CssBaseline />
			<Box>
				<Stack
					sx={{
						backgroundColor: "background.surface",
						px: { xs: 2, md: 4 },
						py: 2,
						borderBottom: "1px solid",
						borderColor: "divider"
					}}
				>
					<Stack sx={{ mb: 2 }}>
						<Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>

							{window.location.hash.slice(1) === profileData.email
                ?
                <Typography level="h2">My Exchange History</Typography>
                :
                <Typography level="h2">Exchange History of {window.location.hash.slice(1)}</Typography>
              }
							
							
						</Stack>
					</Stack>
				</Stack>



				<List
					orientation="horizontal"
					variant="plain"
					sx={{
						backgroundColor: "background.surface",
						flexGrow: 0,
						mx: 'auto',
						'--ListItemDecorator-size': '40px',
						'--ListItem-paddingY': '0.6rem',
						borderRadius: 'sm',
						justifyContent:'center'
					}}
				>

					<ListDivider inset="gutter" />
					<ListItemButton 
						sx={{width:'100px', justifyContent:'center', margin:'4px', height:'20px',  borderRadius:'8px 8px 8px 8px'}}
						selected={selectedTab==='Bought'}
						onClick={()=>{
							setSelectedTab('Bought')
						}}
					>
						Bought
					</ListItemButton>
					<ListDivider inset="gutter" />
					<ListItemButton 
						sx={{width:'100px', justifyContent:'center', margin:'4px', height:'20px',  borderRadius:'8px 8px 8px 8px'}}
						selected={selectedTab==='Sold'}
						onClick={()=>{
							setSelectedTab('Sold')
						}}
					>
						Sold
					</ListItemButton>
					<ListDivider inset="gutter" />
					
				</List>
				<ListDivider/>



				<Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
					<Stack spacing={2} sx={{ overflow: "auto" }}>

						{posts.map((item, index) => {
							return(
								<HistoryCard key={index} 
									token={token}
									index={index}
									item={item}
									finished={item.finished}
									selectedTab={selectedTab}
								/>
								)  
							})
						}
						
					
					</Stack>
				</Stack>

			</Box>
		</CssVarsProvider>
	)
}