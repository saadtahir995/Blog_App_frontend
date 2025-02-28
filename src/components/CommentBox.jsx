import React, { useState, useEffect } from "react";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import "../stylesheets/CommentBox.css"; // Import the CSS file for styling
import jwt_decode from "jwt-decode";
import PostedTime from "./PostedTime";
import DeleteConfirmation from "./DeleteConfirmation";

const CommentBox = ({ postId, authorId, isGuest, onCommentAdd, onCommentDelete }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));

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
      .then((data) => {
        // Ensure comment_date is properly formatted
        const formattedComments = data.rows.map(comment => ({
          ...comment,
          comment_date: new Date(comment.comment_date).toISOString()
        }));
        setComments(formattedComments);
      });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isGuest) {
      setError("Guest users cannot add comments. Please sign up for an account.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    if (!newComment.trim()) return;

    try {
      console.log('Sending comment data:', { // Debug log
        newComment,
        postId,
        authorid: authorId
      });

      const response = await fetch(
        "https://blog-app-backend-peach.vercel.app/api/blog/addcomment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            newComment: newComment.trim(),
            postId: parseInt(postId),
            authorid: parseInt(authorId)
          })
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add comment');
      }

      if (data.id) {
        const newcomment = {
          comment_id: data.id,
          comment_text: newComment.trim(),
          username: jwt_decode(localStorage.getItem("token")).username,
          comment_date: new Date().toISOString(),
          user_id: authorId
        };
        setComments([newcomment, ...comments]);
        setNewComment("");
        onCommentAdd();
      } else {
        throw new Error('No comment ID returned from server');
      }
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err.message || "Failed to add comment");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleDeleteComment = async (id) => {
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
    setError(data.message);
    onCommentDelete();
    const updatedComments = comments.filter((comment) => comment.comment_id !== id);
    setComments(updatedComments);
  };

  return (
    <div className="comment-box">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="form-control"
            placeholder={isGuest ? "Sign up to comment" : "Write a comment..."}
            disabled={isGuest}
            style={{
              backgroundColor: isDarkMode ? "#333333" : "white",
              color: isDarkMode ? "white" : "black",
            }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={isGuest || !newComment.trim()}
        >
          Post Comment
        </button>
      </form>
      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="comments-list mt-3">
          {comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <div className="comment-header">
                <strong>{comment.username}</strong>
                <small className="text-muted">
                  <PostedTime publishDate={comment.comment_date} />
                </small>
                {!isGuest && comment.user_id === authorId && (
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => {
                      setCommentToDelete(comment.comment_id);
                      setShowDeleteConfirmation(true);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="comment-body">{comment.comment_text}</div>
            </div>
          ))}
        </div>
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          show={showDeleteConfirmation}
          onClose={() => setShowDeleteConfirmation(false)}
          onConfirm={() => handleDeleteComment(commentToDelete)}
        />
      )}
    </div>
  );
};

export default CommentBox;
