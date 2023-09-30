import React from 'react';

function SignUp(){
      const [email, setEmail] = React.useState('');
      const [name, setName] = React.useState('');
      const [password1, setPassword1] = React.useState('');
      const [password2, setPassword2] = React.useState('');
      const [identity, setIdentity] = React.useState('');
      async function register(){
            console.log('SignUp:',email, password1, password2, name, identity);
            const response = await fetch('http://127.0.0.1:5000/register',{
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
            console.log(data);
      }

      return(
      <>
        Email:<input value={email} onChange={(e)=>setEmail(e.target.value)}/> <br />
        Name:<input value={name} onChange={(e)=>setName(e.target.value)}/> <br />
        Password1: <input value={password1} onChange={(e)=>setPassword1(e.target.value)}/><br />
        Password2: <input value={password2} onChange={(e)=>setPassword2(e.target.value)}/><br />
        Identity: <input value={identity} onChange={(e)=>setIdentity(e.target.value)}/><br />
        <button onClick={register}>Sign up</button>
      </>
      )
}
export default SignUp;