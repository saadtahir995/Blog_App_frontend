// Feedback.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Feedback.css';
import {MdNavigateBefore} from 'react-icons/md';
import jwt_decode from 'jwt-decode';

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [Message,setMessage]=useState('');
  const [username,setUsername]=useState('');
  const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#333333" : "white";
    document.body.style.color = isDarkMode ? "white" : "black";
    return () => {
      document.body.style.backgroundColor = null;
      document.body.style.color = null;
    };
  }, [isDarkMode]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const options={
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({name: username,email:email,message:feedback})
    }
    const url='http://192.168.43.52:9000/api/review/feedback'
    const response = await fetch(url,options);
    const data=await response.json();
    setMessage(data.message);
    console.log('Feedback submitted:', { email, feedback });
    // Clear the form after submission
    setFeedback('');
  };
  useEffect(()=>{
    const token=localStorage.getItem('token');
    const decoded=jwt_decode(token);
    setUsername(decoded.username);

    const id=decoded.id;
   fetch(`http://192.168.43.52:9000/api/data/userdata/${id}`).then((response)=>response.json())
    .then((data)=>{
        setEmail(data.email)
    })
    .catch((err)=>console.log(err));
  },[])

  return (
    <div className="feedback-container" >
      <h2 className="feedback-heading" style={{color:isDarkMode&&'white'}}>Send Us Your Feedback</h2>
      {Message&&<div className='alert alert-success'>{Message}</div>}
      <form className="feedback-form" onSubmit={handleSubmit} style={{ backgroundColor:isDarkMode&&'rgb(44 41 41)'}}>
        <Link to="/home" className="go-back-link">
          <MdNavigateBefore className="go-back-icon" style={{width:'2rem',height:'2rem'}} />
        </Link>
        <div className="form-group" >
          <label htmlFor="name" className="form-label" style={{color:isDarkMode&&'white'}} >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={username}
            readOnly
            style={{backgroundColor:isDarkMode&&'#333333',color:isDarkMode&&'white'}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label" style={{color:isDarkMode&&'white'}}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            readOnly
            style={{backgroundColor:isDarkMode&&'#333333',color:isDarkMode&&'white'}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="feedback" className="form-label" style={{color:isDarkMode&&'white'}}>
            Feedback:
          </label>
          <textarea
            id="feedback"
            className="form-textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            placeholder='Share your feedback here...'
            style={{backgroundColor:isDarkMode&&'#333333',color:isDarkMode&&'white'}}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
