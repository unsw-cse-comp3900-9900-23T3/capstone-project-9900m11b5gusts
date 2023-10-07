import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography"
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';

import ItemCard from "./ItemCard";
import Pagination from "./Pagination";


export default function MyPosts() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          height: "calc(100vh - 55px)", // 55px is the height of the NavBar
          display: "grid",
          gridTemplateColumns: { xs: "auto", md: "60% 40%" },
          gridTemplateRows: "auto 1fr auto"
        }}
      >
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
							<Typography level="h2">My Posts</Typography>
							<Button component="a" href="/myposts/postnewitem" variant="soft" size="sm" startDecorator={<AddIcon />}>
								Post New Item
							</Button>
							
						</Stack>
					</Stack>
        </Stack>

        <Box
          sx={{
            gridRow: "span 3",
            display: { xs: "none", md: "flex" },
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundImage:'url("https://i.pinimg.com/474x/7f/0d/fc/7f0dfc22b1c1f95b812ecedf0cc52b1f.jpg")'
          }}
        />

        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
          <Stack spacing={2} sx={{ overflow: "auto" }}>
            <ItemCard
              title="A Stylish Apt, 5 min walk to Queen Victoria Market"
              category="Entire apartment rental in Collingwood"
              rareFind
              image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400"
            />
            <ItemCard
              title="Designer NY style loft"
              category="Entire loft in central business district"
              liked
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400"
            />
           
          </Stack>
        </Stack>

        <Pagination />
      </Box>
    </CssVarsProvider>
  );
}
