import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../Components/slices/userSlice'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import './EditProfileForm.css'; // Create a CSS file for styling if needed

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, email, status, error } = useSelector((state) => state.user);

  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/dashboard');
    }
  }, [status, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ username: newUsername, email: newEmail }));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="edit-profile-form">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfileForm;