// src/Components/accountBox/EditProfileForm.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, resetStatus } from '../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import './EditProfileForm.css';

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, email, status, error } = useSelector((state) => state.user);

  const [newUsername, setNewUsername] = useState(username || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [image, setImage] = useState(null);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUsername.trim() || !newEmail.trim()) {
      setFormError('Username and Email are required.');
      return;
    }

    const formData = new FormData();
    formData.append('username', newUsername);
    formData.append('email', newEmail);
    if (image) {
      formData.append('profile_image', image);
    }

    dispatch(updateUserProfile(formData));
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

        {/* Profile Image Field */}
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image:</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
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