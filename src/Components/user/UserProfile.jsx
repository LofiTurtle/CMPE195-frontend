import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user profile');
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch('/api/me');
        if (!response.ok) throw new Error('Failed to fetch logged in user data');
        const data = await response.json();
        setLoggedInUserId(data.userId.toString());
      } catch (error) {
        console.error('Error fetching logged in user data:', error);
      }
    };

    fetchUser();
    fetchLoggedInUser();
  }, [userId, navigate]);

  const handleEditProfile = () => {
    navigate(`/edit-profile/${userId}`);
  };

  if (!user) {
    return <h1>Loading user...</h1>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h2>Bio:</h2>
      <p>{user.profile.bio}</p>
      <br />
      {user.connected_accounts.map((account, index) => (
        <div key={index}>
          <p>Platform: {account.provider}</p>
          <p>Account Username: {account.username}</p>
        </div>
      ))}
      <button onClick={handleEditProfile}>Edit Profile</button>
    </div>
  );
}

export default UserProfile;
