import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import '../stylesheets/DeleteConfirmation.css'

const DeleteConfirmation = ({ onDelete,postId,itemid }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    onDelete(postId,itemid); // Perform the actual delete action
    setShowConfirmation(false); // Close the confirmation dialog
  };

  return (
    <div className="delete-confirmation">
      <button className="delete-button" onClick={() => setShowConfirmation(true)}>
        <AiFillDelete className="delete-icon" />
      </button>
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this post?</p>
          <div className="button-container">
            <button className="cancel-button" onClick={() => setShowConfirmation(false)}>
              Cancel
            </button>
            <button className="confirm-button" onClick={handleDelete}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmation;
