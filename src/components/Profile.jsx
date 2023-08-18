import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Profile.css'; // Import the CSS file for Profile component
import { BiUserCircle } from 'react-icons/bi';
import { MdNavigateBefore } from 'react-icons/md';
import LoadingSpinner from './LoadingSpinner';

const Profile = ({ username, triggeroff, userid}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const isdark=JSON.parse(localStorage.getItem("isDarkMode"));

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
    const url = `http://192.168.43.52:9000/api/blog/getposts/${userid}`;
    fetch(url, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    // Apply dark body class to body element based on isdark prop
    if (isdark) {
      document.body.style.backgroundColor = '#333333';
    }

    // Clean up effect when component unmounts
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [isdark]);

  return (
    <div style={{backgroundColor: isdark&&'#333333'}}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="profile-container" style={{backgroundColor:isdark &&'rgb(32 28 28)', color: isdark&&'white'}}>
            <div className="profile-header">
              <BiUserCircle className="profile-icon" />
              <h2 className="profile-username">{username}</h2>
            </div>
            <MdNavigateBefore
              className="back-icon"
              onClick={() => {
                triggeroff();
              }}
            />
            <div className="post-list">
              <h3 className="post-list-title">Posts:</h3>
              {posts.map((item, index) => (
                <div className="post-card" key={index} style={{backgroundColor:isdark&&'#333333',borderRadius:'8px'}}>
                  <h3 className="post-title">{item.title}</h3>
                  <p className="post-content" style={{color: isdark&&'white'}}>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
