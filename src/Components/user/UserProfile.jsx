import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../Services/api';
import PostList from '../post/PostList';
import {fetchUser} from "../slices/userSlice.js";
import RatingSummary from "../rating/RatingSummary.jsx";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser, status } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDiscordLinkButton, setShowDiscordLinkButton] = useState(false);
  const [showDiscordDisconnectButton, setShowDiscordDisconnectButton] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwnProfile = currentUser?.id === Number(userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }

    const getUser = async () => {
      try {
        setLoading(true);
        // Fetch user data
        const { user } = await api.getUser(userId);
        setUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();

    const getIsFollowing = async () => {
      try {
        const { following } = await api.getRelationship(userId);
        setIsFollowing(following);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getIsFollowing();
  }, [dispatch, status, userId]);

  const handleDiscordDisconnect = async () => {
    try {
      const response = await fetch('/api/discord/disconnect', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Error disconnecting Discord account');
      }
      console.log('Disconnected from Discord');
      navigate(0);
    } catch (error) {
      console.error('Error disconnecting Discord:', error);
    }
  };

  const toggleFollowing = async () => {
    try {
      if (isFollowing) {
        await api.unfollowUser(userId);
        setIsFollowing(false);
        setUser(prev => ({ ...prev, follower_count: prev.follower_count - 1 }));
      } else {
        await api.followUser(userId);
        setIsFollowing(true);
        setUser(prev => ({ ...prev, follower_count: prev.follower_count + 1 }));
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading user...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!user) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>{user.username}</h1>
        {isOwnProfile ? (
          <button
            className="edit-profile-btn"
            onClick={() => navigate('/edit-profile')}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="follow-btn"
            onClick={toggleFollowing}
          >
            {isFollowing ? 'Unfollow' : 'Follow'} user
          </button>
        )}
      </div>

      <div className="profile-stats">
        <p
          onClick={() => navigate(`/users/${userId}/followers`)}
          className="clickable"
        >
          {user.follower_count} followers
        </p>
        <p
          onClick={() => navigate(`/users/${userId}/following`)}
          className="clickable"
        >
          {user.following_count} following
        </p>
      </div>

      <div className="profile-info">
        <h2>Bio:</h2>
        <p>{user.profile?.bio}</p>
        {user.profile?.email && <p>Email: {user.profile.email}</p>}
      </div>

      <div>
        <RatingSummary />
        {currentUser.id !== Number(userId) && (<Link to={`/users/${userId}/ratings/submit`}>Rate this user</Link>)}
      </div>

      {user.connected_accounts && user.connected_accounts.length > 0 && (
        <div className="connected-accounts">
          {user.connected_accounts.map((account, index) => (
            <div key={index} className="account-card">
              {account.profile_picture_url && (
                <img src={account.profile_picture_url} alt={`${account.provider} profile`} />
              )}
              <p>Platform: {account.provider}</p>
              <p>Account Username: {account.username}</p>
            </div>
          ))}
        </div>
      )}

      <div className="discord-controls">
        {showDiscordLinkButton && (
          <a href="/api/discord/connect" className="discord-link">
            Link your Discord account
          </a>
        )}
        {showDiscordDisconnectButton && (
          <button
            onClick={handleDiscordDisconnect}
            className="discord-disconnect"
          >
            Disconnect Discord Account
          </button>
        )}
      </div>

      <div className="posts-section">
        <PostList userId={userId} />
      </div>
    </div>
  );
};

export default UserProfile;