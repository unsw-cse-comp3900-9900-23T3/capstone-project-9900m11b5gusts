import React from 'react';

function SignIn(){
      const [email, setEmail] = React.useState('')
      const [password, setPassword] = React.useState('')
      async function login(){
            console.log('SignIn:', email, password);
            const response = fetch('http://127.0.0.1:5000/login', {
                  method:'POST',
                  headers:{
                        'content-type':'application/json',
                  },
                  body:JSON.stringify({
                        'user_email': email,
                        'password': password
                  })
            });
            const data = await response.json();
            console.log(data);
      }
      return(
      <>
      Email:<input value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
      Password: <input value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
      <button onClick={login}>Sign in</button>
      </>
      )
}

export default SignIn;