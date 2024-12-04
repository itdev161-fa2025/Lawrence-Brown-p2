import React from 'react';

const Home = ( {user, data} ) => {
  return (
    <div>
      {user ? 
        <React.Fragment>
          <div>Hello {user}!</div>
          <div>{data}</div>
        </React.Fragment> :
        <React.Fragment>
          Please Enter Blood Sugar or Display Blood Sugar Log
        </React.Fragment>
      }
    
    </div>
  )
}

export default Home;