import React, { useState } from 'react';
import { FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import '../stylesheets/ResetPassword.css'; // Import your CSS file

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [success, setSuccess] = useState(false);
const[message1,setMessage1]=useState('');
const[message2,setMessage2]=useState('');
const[isFailed,setIsFailed]=useState(false);
const [isVerified,setIsVerified]=useState(false);
const [newPassword,setNewPassword]=useState('');
const [confirmPassword,setConfirmPassword]=useState('');
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the server to check if the email exists and send reset code
      const response = await fetch('https://blog-app-backend-peach.vercel.app/api/reset-password/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      

      if (data.success) {
        setSuccess(true);
        setMessage1('Reset code sent to email!');
      } else {
        setSuccess(false);
        setMessage1('Email does not exist!');
        
      }
    } catch (error) {
      console.error('Error sending reset code:', error);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the server to verify the reset code
      const response = await fetch('https://blog-app-backend-peach.vercel.app/api/reset-password/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, resetCode }),
      });
      const data = await response.json();
      setMessage1('');

      if (data.success) {
        setSuccess(true);
        setIsFailed(false);
        setIsVerified(true);
        setMessage1('');
        setMessage2('Reset code verified!');
      } else {
        setIsFailed(true);
        setSuccess(false);
        setMessage2('Reset code incorrect!');
      }
    } catch (error) {
      console.error('Error verifying reset code:', error);
    }
  };
  const handleNewPwd=async(e)=>{
    e.preventDefault();
    try{
      const options={
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,newPassword})
      }
      const response=await fetch('https://blog-app-backend-peach.vercel.app/api/reset-password/newpassword',options);
      const data=await response.json();
      setMessage1(data.message);
      setTimeout(() => {
        window.location.href = '/';
      }, 4000);
    }
    catch(error){
      console.error('Error verifying reset code:', error);
    }
  }

  return (<>
    {!isVerified&&(
    
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Code</button>
        {message1&&<div className={`message ${success ? 'success' : 'error'}`}>
          {success ? <FiCheckCircle /> : <FiAlertCircle />}
          <span>{message1}</span>
        </div>}
      </form>

      {success || isFailed ? (
        <form onSubmit={handleVerifyCode}>
          <div className="form-group">
            <label htmlFor="resetCode">Reset Code:</label>
            <input
              type="text"
              id="resetCode"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify Code</button>
          {message2&&<div className={`message ${success && 'success'}${isFailed && 'error'}`}>
            {success ? <FiCheckCircle /> : <FiAlertCircle />}
            <span>{message2}</span>
          </div>}
        </form>
      ):null}
    </div>
    )
    }
      {isVerified&&
      <div className="reset-password-container">
      <form onSubmit={handleNewPwd}>
        <h3>Set New Password</h3>
          <div className="form-group">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) =>{ setConfirmPassword(e.target.value)
              if(e.target.value!==newPassword){
                setMessage1('Password does not match!');
                setSuccess(false);
              }
              else{
                setMessage1('');
                setSuccess(true);
              }
              
              }}
              required
            />
          </div>
          <button style={{backgroundColor:!success&&'grey'}} disabled={!success} type="submit">Reset Password</button>

          <div>{message1}</div>

            </form>
            </div>
      }
      </>
  );
};

export default ResetPassword;
