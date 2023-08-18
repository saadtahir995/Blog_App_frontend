import React, { useState, useEffect } from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import "../stylesheets/CommentBox.css"; // Import the CSS file for styling

const CommentBox = ({ postId, commentcountadd, commentcountsub,Uid ,Uname}) => {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [Message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const isDark = JSON.parse(localStorage.getItem("isDarkMode"));
  const [comment_id, setComment_id] = useState("");
  

  useEffect(() => {
    const url = `https://blog-app-backend-peach.vercel.app/api/blog/getcomments/${postId}`;
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setComments(data.rows));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const options = {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newComment: newComment, commentid: comment_id }),
      };
      const url = `https://blog-app-backend-peach.vercel.app/api/blog/updatecomment`;
      const response = await fetch(url, options);
      const data = await response.json();
      setMessage(data.message);
      setIsEditing(false);
      const commentIndex = comments.findIndex(
        (comment) => comment.comment_id === comment_id
      );
      const updatedComments = [...comments];
      updatedComments[commentIndex].comment_text = newComment;
      setComments(updatedComments);
      setComment_id("");
    } else {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          newComment,
          postId,
          authorid: Uid,
        }),
      };
      const url = "https://blog-app-backend-peach.vercel.app/api/blog/addcomment";
      const response = await fetch(url, options);
      const data = await response.json();
      commentcountadd();
      setMessage(data.message);
      setComments([
        ...comments,
        {
          comment_text: newComment,
          username: Uname,
          user_id: Uid,
          comment_id: data.id,
        },
      ]);
    }

    setNewComment("");
  };

  const handleCommentDelete = async (id, index) => {
    const options = {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    };
    const url = `https://blog-app-backend-peach.vercel.app/api/blog/deletecomment/${id}`;
    const response = await fetch(url, options);
    const data = await response.json();
    setMessage(data.message);
    commentcountsub();
    const updatedComments = comments.filter((comment, i) => i !== index);
    setComments(updatedComments);
  };

  return (
    <div className="comment-box-container">
      {" "}
      {/* Apply a CSS class for the container */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h5>Comments</h5>
          {comments.map((comment, index) => {
            return (
              <div
                key={index}
                className="comment-item "
                style={{
                  backgroundColor: isDark && "rgb(78, 78, 74)",
                  color: isDark && "white",
                }}
              >
                {" "}
                {/* Apply a CSS class for each comment item */}
                <p>
                  <span className="comment-username">{comment.username} :</span>{" "}
                  {comment.comment_text}
                  {comment.user_id == Uid && (
                    <>
                      <AiFillDelete
                        style={{ color: isDark && "white" }}
                        className="delete-icon"
                        onClick={() =>
                          handleCommentDelete(comment.comment_id, index)
                        }
                      />
                      <AiOutlineEdit style={{width:'1.5rem',height:'1.5rem'}}
                        onClick={() => {
                          setIsEditing(true);
                          setComment_id(comment.comment_id);
                          setNewComment(comment.comment_text);
                        }}
                      />
                    </>
                  )}
                </p>
              </div>
            );
          })}
          {Message && <div className="alert alert-success">{Message}</div>}

          <div>
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                required
                style={{
                  backgroundColor: isDark && "#333333",
                  color: isDark && "white",
                }}
              ></textarea>
              <br />
              <button type="submit">Submit Comment</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentBox;
