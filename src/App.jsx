import React, { useState, useEffect } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';


function App() {

  // using the useState hook to create a new state variable, sessionToken (it will start as an empty string)
  const [sessionToken, setSessionToken] = useState('');

  // will update our sessionToken
  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}></WorkoutIndex>
    // the ternary expression checks to see if our sessionToken state variable matches the token property in the localStorage.
    : <Auth updateToken={updateToken}></Auth>)
  }

  return (
    <div className="App">
      <Sitebar clearToken={clearToken}></Sitebar>
      {/* we are placing the session token here since this is the parent, and we don't want to add it to the signup and login bc it's a duplicate */}
      {/* <Auth updateToken={updateToken}></Auth> */}

      {/* we are calling the protectedViews function, not referencing it. We put it inside {} to allow us to write a JS expression */}
      {protectedViews()}
    </div>
  );
}

export default App;
