import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import Grid from '@mui/joy/Grid';
import ListDivider from '@mui/joy/ListDivider';
import Stack from '@mui/joy/Stack';



export default function UserInfoChip({ token, email, name }) {
	const [open, setOpen] = React.useState(false);
	const [userInfo, setUserInfor] = React.useState(null);

	const handleChipClick = () => {
		// console.log(token, email)
		fetchUserInfoByEmail()
		setOpen(true)
	}

	// React.useEffect(() => {
	// 	fetchUserInfoByEmail()
	// },[])


	function handleSeePosts() {
		window.open(`/posts/#${email}`, "_blank");
	}
 
	function handleSeeHistory() {
		window.open(`/exchangehistory/#${email}`, "_blank");
	}

	function handleSeeWishList() {
		window.open(`/wishlist/#${email}`, "_blank");
	}


	async function fetchUserInfoByEmail(){
		const response = await fetch(`http://127.0.0.1:5000/Authors/checkOtherProfile`, {
				method:'POST',
				headers:{
					'Content-type': 'application/json',
					'Authorization' : `Bearer ${token}`,
				},
				body:JSON.stringify({
					"email": email
				})
			});
			if (response.status===200){
				const data = await response.json();
				// console.log('UserInfo: ', data.success)
				if (data.success.email) {
					setUserInfor(data.success)
				}
			}else{
				const data = await response.json();
				console.log('Error: ', data)
			}
	}


  return (
    <React.Fragment>
					<Chip
						variant="outlined"
						color="neutral"
						size="lg"
						startDecorator={<Avatar size="sm" src={userInfo ? userInfo.image: ''} />}
						onClick={handleChipClick}
					>
						{name}
					</Chip>
			{userInfo &&
				<>
					<Modal
						aria-labelledby="modal-title"
						aria-describedby="modal-desc"
						open={open}
						onClose={() => setOpen(false)}
						sx={{ 
							display: 'flex', 
							justifyContent: 'center', 
							alignItems: 'center', 
							position: 'absolute',
							left: { xs: '', md: '20%' },
						}}
					>
						<Sheet
							variant="outlined"
							sx={{
								maxWidth: 600,
								borderRadius: 'md',
								p: 3,
								boxShadow: 'lg',
							}}
						>
							<ModalClose variant="plain" sx={{ m: 1 }} />
							<Card
								variant="outlined"
								sx={{
									width: 400,
									// to make the card resizable
									overflow: 'auto',
									resize: 'horizontal',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<Avatar src={userInfo.image} size="lg" />
								</Box>
								<CardContent>
									
									<Typography level="title-lg">{userInfo.username}</Typography>
									<Typography level="body-sm">
										<ListDivider />
										<Grid container spacing={2} sx={{ flexGrow: 1 }}>
											<Grid xs={3}>
												<>Email: </>
											</Grid>
											<Grid xs={9}>
												<>{userInfo.email}</>
											</Grid>
										</Grid>
										<ListDivider />
										<Grid container spacing={2} sx={{ flexGrow: 1 }}>
											<Grid xs={3}>
												<>Location: </>
											</Grid>
											<Grid xs={9}>
												<>{userInfo.suburb} &nbsp; {userInfo.state}</>
											</Grid>
										</Grid>
										<ListDivider />
									</Typography>

									<br />


										<Button 
											variant='outlined'
											onClick={handleSeePosts}
										>
											View his/ her posts
										</Button>

										<Button 
											variant='outlined'
											onClick={handleSeeWishList}
										>
											View his/her wish list
										</Button>

										<Button 
											variant='outlined'
											onClick={handleSeeHistory}
										>
											View his/her exchange history
										</Button>
										


								</CardContent>

							</Card>

						</Sheet>
					</Modal>
				</>
			}
    </React.Fragment>
  );
}