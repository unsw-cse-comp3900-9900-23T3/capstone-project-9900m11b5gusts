import React from 'react';
import PasswordMeterInput from './Passwordbox'
import InputField from './Inputbox'
import RadioButtonsGroup from './Radiobutton'
import Button from '@mui/joy/Button'


function SignUp({ onSuccess }){
      const [email, setEmail] = React.useState('');
      const [name, setName] = React.useState('');
      const [password1, setPassword1] = React.useState('');
      const [identity, setIdentity] = React.useState('User');
      function handleRadioChange(e){
            setIdentity(e.target.value);
      }
      function handleEmail(e){
            setEmail(e.target.value);
      }
      function handleName(e){
            setName(e.target.value);
      }
      function handlePassword(e){
            setPassword1(e.target.value);
      }
      async function register(){
            console.log(email,name,password1,identity)
            const response = await fetch('http://127.0.0.1:5000/Authors/register',{
                  method:'POST',
                  headers:{
                        'content-type':'application/json',
                  },
                  body:JSON.stringify({
                        'register_email': email,
                        'password': password1,
                        'username':name,
                        'identity':identity
                  })
            });
            const data = await response.json();
            onSuccess(data.token);
            console.log(data);
      }

      return(
          <>
              <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  {/*<div style={{width:'700px', height:'600px', backgroundColor:'lightgray'}}> s </div>*/}
            <div style={{marginTop: '8%', marginLeft : '10%', marginRight: '5%', width:'30%', height:'70%'}}>
            Email:<InputField placeholder="Enter your email" width="300px"  value={email} onChange={handleEmail}/> <br />
            Name:<InputField placeholder="Enter your name" width="300px" value={name} onChange={handleName}/> <br />
            Password: <PasswordMeterInput value={password1} onChange={handlePassword}/><br />
            Identity: <RadioButtonsGroup value={identity} onChange={handleRadioChange}/><br />
            <Button onClick={register}>Sign up</Button>
            </div>
              </div>
          </>
      )
}
export default SignUp;