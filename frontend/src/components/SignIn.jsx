import React from 'react';
import InputField from "./Inputbox";
import Button from '@mui/joy/Button'

function SignIn({ onSuccess }){
      const [email, setEmail] = React.useState('')
      const [password, setPassword] = React.useState('')
      const [errorMessage, setErrorMessage] = React.useState('')
      function handleEmail(e){
            setEmail(e.target.value);
            setErrorMessage('');
      }
      function handlePassword(e){
            setPassword(e.target.value);
      }
      async function login(){
            console.log('SignIn:', email, password);
            const response = await fetch('http://127.0.0.1:5000/Authors/login', {
                  method:'POST',
                  headers:{
                        'content-type':'application/json',
                  },
                  body:JSON.stringify({
                        'user_email': email,
                        'password': password
                  })
            });
            if (response.status===200){
                  const data = await response.json();
                  onSuccess(data.token)
                  console.log(data);
            }else{
                  setErrorMessage('Wrong email or password,please try again.')
            }

      }
      return(
      <>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <div style={{marginTop: '8%', marginLeft : '10%', marginRight: '5%', width:'30%', height:'70%'}}>
                        Email:<InputField placeholder="Enter your email" width="300px"  value={email} onChange={handleEmail}/> <br />
                        Password:<InputField placeholder="Enter your password" width="300px" value={password} onChange={handlePassword}/> <br />
            <Button onClick={login}>Sign in</Button>
                        {errorMessage &&  <p style={{ color: 'red' }}>{errorMessage}</p>}
                  </div>
            </div>
      </>
      )
}

export default SignIn;