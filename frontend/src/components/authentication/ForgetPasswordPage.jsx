// This is where users can reset there password by the verification code sent to their email


import React, { useState, useEffect } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';


function ColorSchemeToggle({ onClick, ...props }) {
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="neutral" disabled/>;
    }
    return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}


export default function ForgetPasswordPage() {
    const [email, setEmail] = React.useState('')
		const [password, setPassword] = React.useState('')
		const [code, setCode] = React.useState('')
    const [state, setState] = React.useState(0)
    const [errorMessage, setErrorMessage] = React.useState('')
		const [confirmPressed, setConfirmPressed] = React.useState(false)


		const handlePasswordChange = (event) => {
			setPassword(event.target.value)
		}

		const handleCodeChange = (event) => {
			setCode(event.target.value)
		}


		function handleEmail(e){
					setEmail(e.target.value);
					setErrorMessage('');
		}

      async function sendEmail(){
            const response = await fetch('http://127.0.0.1:5000/Authors/forgetPassword', {
                  method:'POST',
                  headers:{
                        'content-type':'application/json',
                  },
                  body:JSON.stringify({
                        'email': email,
                  })
            });
            if (response.status===200){
							setState(1)
            }else{
                  setErrorMessage('Email has not been registered.')
                  setConfirmPressed(false)
            }
      }

      async function sendCode(){
				const response = await fetch('http://127.0.0.1:5000/Authors/resetPassword', {
							method:'POST',
							headers:{
										'content-type':'application/json',
							},
							body:JSON.stringify({
								"email": email,
								"code": code,
								"new_password": password
							})
				});
				if (response.status===200){
					setState(2)
					alert('Success')
					window.location.href = '/login'
				}else{
							setErrorMessage('Wrong code. ')
				}
			}

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
            '--Cover-width': '50vw', // must be `vw` only
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width:
            'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width:
              'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'space-between',
            }}
          >

            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 300,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h3">Reset Password</Typography>
              </Stack>

            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                  '--Divider-lineColor': {
                    xs: '#FFF',
                    md: 'var(--joy-palette-divider)',
                  },
                },
              })}
            >

            </Divider>
              <Stack gap={4} sx={{ mt: 2 }}>

  <form
    onSubmit={(event) => {
      event.preventDefault();
      if (state === 0) {
				sendEmail(); 
			} else if (state === 1) {
				sendCode();
			}
			
    }}
  >
		{state===0 && 
			<>
				<FormControl required>
					<FormLabel>Email</FormLabel>
					<Input type="email" name="email" onChange={handleEmail} />
          We will send a verification code to your email.
				</FormControl>
				<Stack gap={4} sx={{ mt: 2 }}>

					<Button type="submit" fullWidth style={{ display: confirmPressed ? 'none' : 'block' }} onClick={()=>{setConfirmPressed(true)}}>
						Confirm
					</Button>
          {confirmPressed && <>The system is working on it. Please wait ...</>}
						{errorMessage && (
						<Typography variant="body1" style={{ color: 'red' }}>
								{errorMessage} 
						</Typography>
						)}
				</Stack>

			</>

		}

		{state===1 && 
			<>
				<FormControl required>
					<FormLabel>New Password</FormLabel>
					<Input name="password" value={password} onChange={handlePasswordChange} />
				</FormControl>

				<FormControl required>
					<FormLabel>Verification Code</FormLabel>
					<Input name="code" value={code} onChange={handleCodeChange} />
					Email has been sent.
				</FormControl>

				<Stack gap={4} sx={{ mt: 2 }}>

					<Button type="submit" fullWidth>
						Confirm
					</Button>
						{errorMessage && (
						<Typography variant="body1" style={{ color: 'red' }}>
								{errorMessage}
						</Typography>
						)}
				</Stack>
			</>

		}
  </form>

</Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Your company {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
    </CssVarsProvider>
  );
}
