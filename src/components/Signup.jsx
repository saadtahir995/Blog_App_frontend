import React, { useState } from 'react';
import '../stylesheets/Signup.css';
import {MdNavigateBefore} from 'react-icons/md';

const Signup = ({triggeroff}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const[error,setError]=useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const[isSignedUp,setIsSignedUp]=useState(false);
  const[message,setMessage]=useState('');

  const handleChange = (e) => {
    if(e.target.name === 'confirmPassword'){
      if(e.target.value !== formData.password){
        setError(true);

      }
      else{
        setError(false);
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const options={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify({formData})
    }
    const response= await fetch('https://blog-app-backend-peach.vercel.app/api/newuser/signup',options);
    const data=await response.json();
    setTimeout(()=>{
      setIsLoading(false);
      setMessage(data.message);
    if(data.isSignedUp){
      setIsSignedUp(true);
    }
    else{setIsSignedUp(false);}
    },2000);
    
  };

  return (
    <div className="signup-container">
    <MdNavigateBefore style={{width:'5%', height:'5%',position:'absolute',top:'3%',left:'93%'}} onClick={()=>{triggeroff()}} />

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {isSignedUp ? <div className="alert alert-success" role="alert"> {message} </div> :(message?(<div className="alert alert-danger" role='alert'>{message}</div>):null)}
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        {error && <p style={{color:'red'}}>Password does not match</p>}
        <button disabled={error} type="submit" style={{backgroundColor: isLoading ||error ? 'lightblue' : null}}>{isLoading ? <>Signing up...</>:<>Sign up</>}</button>
      </form>
    </div>
  );
};

export default Signup;
