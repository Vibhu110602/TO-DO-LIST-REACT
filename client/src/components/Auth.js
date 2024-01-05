import {useState} from 'react';
import React from 'react';
import {useCookies} from 'react-cookie'

const Auth=()=>{
  const [cookies,setCookie,removeCookie]=useCookies(null);
  const [error,setError]=useState(null);
  const [login,setLogin]=useState(true);
  const [email,setEmail]=useState(null);
  const [password,setPassword]=useState(null);
  const [confirmPassword,setConfirmPassword]=useState(null);

  const viewLogin = ( status ) => {
    setError(null);
    setLogin(status);
  }

  const handleSubmit = async (param,end) => {
    param.preventDefault();
    if(!login && password!==confirmPassword){
      setError('Make sure password is same!');
      return 
    }

    const response=await fetch (`${process.env.REACT_APP_SERVER_URL}/${end}`,{
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body : JSON.stringify({email,password})
    })

    const data=await response.json();
    if(data.detail){
      setError(data.detail);
    }else {
      setCookie('Email',data.email);
      setCookie('AuthToken',data.token);
      window.location.reload();
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-container-box'>
        <form>
            <h2>{login?'Please Log in ' : 'Please sign up here.'}</h2>
          <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
          <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
          {!login && <input type='password' placeholder='confirm password' onChange={(e)=>setConfirmPassword(e.target.value)}/>}

          <input type='submit' className='create' onClick={(e)=>handleSubmit(e,login?'login':'signup')}/>
          {error && <p>{error}</p> }

        </form>

        <div className='auth-options'>
          <button onClick={() => viewLogin(false)} 
          style={{ backgroundColor: !login ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}>Sign Up</button>
         <button onClick={() => viewLogin(true)} style={{ backgroundColor: login ? 'rgb(255,255,255)' : 'rgb(188,188,188)' }}>Log IN</button>
        </div>


      </div>
    </div>
  );
}

export default Auth;
