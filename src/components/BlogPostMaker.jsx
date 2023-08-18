// BlogPostMaker.js
import React, { useState } from 'react';
import '../stylesheets/BlogPostMaker.css';

const BlogPostMaker = ({ onSubmit,uid }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isdark=JSON.parse(localStorage.getItem("isDarkMode"));
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill all the fields');
      return;
    }
    
    const newBlogPost = {
      title: title,
      content: content,
      authorid: uid,
    };

    onSubmit(newBlogPost);
    setTitle('');
    setContent('');
  };

  return (
    <div className="blog-post-maker" style={{backgroundColor: isdark&&'rgb(32 32 32)'}}>
      <div className="post-header">
        <h2>Create a New Blog Post</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            style={{backgroundColor: isdark&&'#333333',color:isdark&&'white'}}
          />
        </div>
        <div className="form-group">
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            required
            style={{backgroundColor:isdark&&'#333333',color:isdark&&'white'}}
          ></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default BlogPostMaker;
