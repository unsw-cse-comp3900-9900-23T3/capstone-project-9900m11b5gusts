import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function SignIn ({ onSuccess }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  async function login () {
    console.log(email, password)
    const response = await fetch('http://localhost:5000/login',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'user_email': email,
            'password': password
          })
      })
    const data = await response.json();
    console.log('this is data: ', data)
    if (data.error) {
      alert(data.error)
    } else {
			console.log(data)
      onSuccess(data.token);
      window.location.href = '/Homepage/'
      
    }
  }

	const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Trigger the login button click event
      document.getElementById('loginButton').click();
    }
  };


  return (
    <>
    <div style={{ textAlign: 'center' }}>
      <br />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{ style: { fontSize: 16 } }}
        style={{ margin: '10px', marginTop: '30px', width: '380px' }}
      />
      <br />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
				onKeyUp={handleKeyPress}
        InputProps={{ style: { fontSize: 16 } }}
        style={{ margin: '10px', width: '380px' }}
      />
      <div>
      <Button id='loginButton' variant="contained" onClick={login} style={{ margin: '10px' }}>Login</Button>
      </div>
    </div>
  </>
  )
}

export default SignIn;