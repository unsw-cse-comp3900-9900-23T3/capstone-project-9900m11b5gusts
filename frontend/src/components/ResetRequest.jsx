import React from 'react';

function ResetRequest(){
      const [email, setEmail] = React.useState('')

      async function Reset(){
            console.log('ResetRequest:', email, password);
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
     <button onClick={Reset}>Reset Password</button>
      </>
      )
}

export default ResetRequest;