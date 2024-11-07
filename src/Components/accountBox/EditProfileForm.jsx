// src/Components/accountBox/EditProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, resetStatus } from '../slices/userSlice'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import './EditProfileForm.css'; // Ensure this file exists for styling

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, email, status, error } = useSelector((state) => state.user);

  const [newUsername, setNewUsername] = useState(username || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [formError, setFormError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newUsername.trim() || !newEmail.trim()) {
      setFormError('Username and Email are required.');
      return;
    }
    // Dispatch the update action
    dispatch(updateUserProfile({ username: newUsername, email: newEmail }));
  };

  return (
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>

        {/* Display Form Errors */}
        {formError && <div className="error">{formError}</div>}

        {/* Display Redux Errors */}
        {status === 'failed' && <div className="error">Error: {error}</div>}

        {/* Submit Button */}
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;