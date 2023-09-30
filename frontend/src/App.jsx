import React from 'react'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

// pages = signup, signin, dashboard


function DashBoard(){
      return(
            <>
            DashBoard
            </>
      )
}

function AboutUs(){
      return(
          <>
                <header>
                App name Our brand
                </header>
                <body>
                Our company is a trading and management platform for ....
                </body>
          </>
      )
}

function App() {
      const [page, setPage] = React.useState('aboutus')

      return (
      <>
      <header>
      <nav>
            <a href='#' onClick={() => setPage('signup')}>Sign Up</a> 
            |
            <a href='#' onClick={() => setPage('signin')}>Sign In</a>
      </nav>
            <hr />
      </header>
      <main>
      {page === 'aboutus'
          ?(<AboutUs/>)
          :page === 'signup'
      ? (<SignUp/>)
      : page === 'signin' 
      ? (<SignIn/>) 
      : (<DashBoard/>)}
      </main>
      </>
      );
}

export default App;