import React, { useReducer,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import '../stylesheets/Login.css'
import Signup from "./Signup";
import LoginNav from "./LoginNav";

export default function Login() {
  const navigate=useNavigate();
  const isDarkMode=JSON.parse(localStorage.getItem('isDarkMode'));
  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { ...state, isLoggedin: true,isLoading: false,error: false,status: "Submit" };
      case "LOADING":
        return { ...state, isLoading: true,error: false,status: "Logging in..." };
      case "ERROR":
        return { ...state, error: true,isLoading: false,isLoggedin: false,status: "Submit" };
      case "GUEST_LOADING":
        return { ...state, isGuestLoading: true };
      case "GUEST_LOGIN":
        return { ...state, isGuestLoading: false, isLoggedin: true };
      case "UPDATED_FIELD":
        if (action.field === "email") {
          return {
            ...state,
            [action.field]: action.value,
            email: action.value,
          };
        } else {
          return {
            ...state,
            [action.field]: action.value,
            password: action.value,
          };
        }
      case "ShowSignup":
        return { ...state, ShowSignup: true };
      case "HideSignup":
        return { ...state, ShowSignup: false };
      default:
        return state;
    }
  };

  const initialState = {
    isLoggedin: false,
    isLoading: false,
    isGuestLoading: false,
    error: false,
    email: "",
    password: "",
    ShowSignup: false,
    status: "Submit"
  };
  const triggerHideSignup = () => {
    dispatch({ type: "HideSignup" });
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const HandleSubmit = async(e) => {
    e.preventDefault();
    dispatch({ type: "LOADING" });
      const options={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({email:state.email,password:state.password})
      }
      const response= await fetch('https://blog-app-backend-peach.vercel.app/api/auth/login',options);
      const data=await response.json();
      if(data.isLoggedin){
        //document.cookie=`token=${data.username}`;
        localStorage.setItem('token',data.token);
        setTimeout(() => {
          dispatch({ type: "LOGIN" });
          }, 2000);
          setTimeout(() => {
            navigate('/home');
            },4000);
      }
      else{
      setTimeout(() => {
      dispatch({ type: "ERROR" });
      }, 2000);
    }

  };

  const handleGuestLogin = async () => {
    dispatch({ type: "GUEST_LOADING" });
    try {
      const response = await fetch('https://blog-app-backend-peach.vercel.app/api/auth/guest-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const data = await response.json();
      if (data.isLoggedin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isGuest', 'true');
        setTimeout(() => {
          dispatch({ type: "GUEST_LOGIN" });
        }, 2000);
        setTimeout(() => {
          navigate('/home');
        }, 4000);
      }
    } catch (error) {
      dispatch({ type: "ERROR" });
    }
  };

  useEffect(() => {
    if(document.cookie.includes('token')){
      navigate('/home');
    }
  }, [])

  return (
    <>
      {state.ShowSignup ? (<Signup triggeroff={triggerHideSignup} />) : (<>
        <LoginNav/>
        <div className="login-container">
          <form onSubmit={HandleSubmit} className="login-form">
            {state.error ? <div className="alert alert-danger" role="alert">Invalid Credentials</div> : null}
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={(e) => {
                  dispatch({
                    type: "UPDATED_FIELD",
                    field: e.target.name,
                    value: e.target.value,
                  });
                }}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={(e) => {
                  dispatch({
                    type: "UPDATED_FIELD",
                    field: e.target.name,
                    value: e.target.value,
                  });
                }}
              />
            </div>
            <u className="signup-link" onClick={() => { dispatch({ type: 'ShowSignup' }) }}>Click here to Signup</u><br />
            <u className="signup-link" onClick={() => { navigate('/resetpassword') }}>Forgot Password?</u><br />

            <button type="Submit" className={`login-btn ${state.isLoading ? 'disabled' : ''}`}>
              {state.isLoading ? (<div className="spinner-border spinner-border-sm" role="status"></div>) : state.status}
            </button>

            <button 
              type="button" 
              onClick={handleGuestLogin} 
              className={`login-btn guest-btn ${state.isGuestLoading ? 'disabled' : ''}`}
              style={{ marginTop: '10px', backgroundColor: '#6c757d' }}
            >
              {state.isGuestLoading ? (
                <div className="spinner-border spinner-border-sm" role="status"></div>
              ) : 'Continue as Guest'}
            </button>

            {state.isLoggedin ? (<div className="alert alert-success" role="alert">Logged in Successfully</div>) : null}
          </form>
        </div>
        </>
      )}
      
    </>
    
  );
  
}
