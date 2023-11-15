// A header. Nothing special.

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';

export default function LoginPageHeader() {
    return(
			<header>
					<div style={{margin:'10px' ,display: 'flex', justifyContent: 'flex-end'}}>
						<Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
							<List role="menubar" orientation="horizontal">
								<ListItem role="none">
									<ListItemButton
										role="menuitem"
										component="a"
										aria-label="Home"
										href="/"
									>
										<HomeIcon /> Panda Exchange Hub
										
									</ListItemButton>
								</ListItem>
								
								<ListDivider />
								<ListItem role="none">
									<ListItemButton href="login" role="menuitem" component="a">
										Login
									</ListItemButton>
								</ListItem>
								<ListDivider />
								<ListItem role="none">
									<ListItemButton href="register" role="menuitem" component="a">
											Register
									</ListItemButton>
								</ListItem>
								<ListItem role="none" sx={{ marginInlineStart: 'auto' }}>
									<ListItemButton
										role="menuitem"
										component="a"
										href="#horizontal-list"
										aria-label="Profile"
									>
									</ListItemButton>
								</ListItem>
							</List>
						</Box>
			</div>
		</header>
    )
}