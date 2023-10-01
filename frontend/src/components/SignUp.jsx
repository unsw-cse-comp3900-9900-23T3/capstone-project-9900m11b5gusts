import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



function SignUp ({ onSuccess }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('')
  const [identity, setIdentity] = React.useState(0)

  

  async function register () {
    console.log(email, password, name, identity)
    const response = await fetch('http://localhost:5000/register',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'register_email': email,
            'password': password,
            'username': name,
            'identity': identity
        })
      })
    const data = await response.json();
    if (data.error) {
      alert(data.error)
    } else {
      console.log(data)
      onSuccess(data.token);
      window.location.href = '/Homepage/'
    }
  }


  const handleIdentityChange = (event) => {
    setIdentity(event.target.value);
  };

	const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Trigger the login button click event
      document.getElementById('registerButton').click();
    }
  };

  return (
    <>
    <div style={{ textAlign: 'center' }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{ style: { fontSize: 16 } }}
        style={{ margin: '10px', width: '380px', marginTop: '30px' }}
      />
      <br />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{ style: { fontSize: 16 } }}
        style={{ margin: '10px', width: '380px' }}
      />
      <br />
      <TextField
        type='password'
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyPress}
        InputProps={{ style: { fontSize: 16 } }}
        style={{ margin: '10px', width: '380px' }}
      />
      <br />
      <FormControl
        style={{ margin: '10px', marginTop: '40px', width: '380px' }}
      >
        <InputLabel id="identity_lable">Account Type</InputLabel>
        <Select
          labelId="identity_lable"
          id="demo-simple-select"
          value={identity}
          label="Account Type"
          onChange={handleIdentityChange}
        >
          <MenuItem value={0}>User (Default Option)</MenuItem>
          <MenuItem value={1}>Administrator</MenuItem>
        </Select>
      </FormControl>
      <br />
      {(identity !== 0) && <>
        <TextField
        label="Authentication Code"
        // value={name}
        onChange={handleIdentityChange}
        InputProps={{ style: { fontSize: 16 } }}
        style={{ margin: '10px', width: '380px', marginTop: '30px' }}
      />
      </>
      }



      <div>
      <Button id='registerButton' variant="contained" onClick={register} style={{ margin: '10px' }}>Register</Button>
      </div>



    </div>
    </>
  )
}
export default SignUp;
