import React, { useState, useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import {BiArrowBack} from 'react-icons/bi';
import jwt_decode from 'jwt-decode';
import '../stylesheets/EditPost.css';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const[Message,setMessage]=useState('');
  const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
  const [isAuthor, setIsAuthor] = useState(true);


  useEffect(() => {
    // Fetch post data using postId and populate the form fields
    // For example, you can use an API call here to get post data
    const fetchPostData = async () => {
      try {
        const token=localStorage.getItem('token');
        const decoded=jwt_decode(token);
        const authorid=decoded.id;
        const response = await fetch(`https://blog-app-backend-peach.vercel.app/api/blog/getpost/${id}/${authorid}}`);
        const data = await response.json();
        if(data.message)
        {
            setIsAuthor(false); 
            return;
        }
        else{
        setIsAuthor(true);
        setTitle(data.rows[0].title);
        setContent(data.rows[0].content);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [id]);
  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#333333" : "white";
    document.body.style.color = isDarkMode ? "white" : "black";
    return () => {
      document.body.style.backgroundColor = null;
      document.body.style.color = null;
    }
  }, [isDarkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update post data using an API call
    const postData = { title, content };
    try {
      const response = await fetch(`https://blog-app-backend-peach.vercel.app/api/blog/updatepost/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({postData}),
      });
      const data=await response.json();
        setMessage(data.message);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (<>{!isAuthor?<div className="alert alert-danger">You are not the author of this post</div>:(
    <div>
      <header className="edit-post-header">
        <Link to={`/home`} className="back-link">
          <BiArrowBack style={{width:'2rem',height:'2rem'}} />
        </Link>
        <h2>Edit Post</h2>
        <div className="spacer"></div>
      </header>
      <div className="edit-post-container"style={{ backgroundColor:isDarkMode&&'rgb(44 41 41)',
       color:isDarkMode&&'white'}}>
        {Message&&<div className='alert alert-success'>{Message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{backgroundColor:isDarkMode&&'#333333',color:isDarkMode&&'white'}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{backgroundColor:isDarkMode&&'#333333',color:isDarkMode&&'white'}}
            ></textarea>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
    )}
    </>
  );

};

export default EditPost;
