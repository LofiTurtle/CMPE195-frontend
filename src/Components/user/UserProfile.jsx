import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { hasDiscordAccount, getCurrentUserId } from '../../utils';
import api from '../../Services/api';
import PostList from '../post/PostList';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showDiscordLinkButton, setShowDiscordLinkButton] = useState(false);
  const [showDiscordDisconnectButton, setShowDiscordDisconnectButton] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { user } = await api.getUser(userId);
      setUser(user);
    }
    getUser();

    const getIsFollowing = async () => {
      const {user: currentUser } = await api.getMe();
      setIsOwnProfile(Number(userId) === currentUser.id);
      const { following } = await api.getRelationship(userId);
      setIsFollowing(following);
    }
    getIsFollowing();
  }, [userId])

  useEffect(() => {
    const checkDiscordLinkButton = async () => {
      const currentUserId = await getCurrentUserId();
      setShowDiscordLinkButton((user?.id === currentUserId || false) && !hasDiscordAccount(user));
    };

    const checkDiscordDisconnectButton = async () => {
      const currentUserId = await getCurrentUserId();
      setShowDiscordDisconnectButton((user?.id === currentUserId || false) && hasDiscordAccount(user));
    }
  
    checkDiscordLinkButton();
    checkDiscordDisconnectButton();
  }, [user]);

  const handleDiscordDisconnect = () => {
    fetch('/api/discord/disconnect', {method: 'POST'})
    .then(response => {
      if (!response.ok) {
        throw new Error('Error disconnecting Discord account');
      }
      console.log('Disconnected from Discord');
      navigate(0);  // refresh the page
    })
    .catch(error => console.log(error));
  }

  const toggleFollowing = async () => {
    if (isFollowing) {
      await api.unfollowUser(userId);
      setIsFollowing(false);
      setUser({ ...user, follower_count: user.follower_count - 1});
    } else {
      await api.followUser(userId);
      setIsFollowing(true);
      setUser({ ...user, follower_count: user.follower_count + 1});
    }
  }



  if (!user) {
    return (
      <h1>Loading user...</h1>
    )
  }

  return (
    <div>
      <h1>{user.username}</h1>
      {
        !isOwnProfile ?
        <div>
          <br />
          <button onClick={toggleFollowing}>{isFollowing ? 'Unfollow' : 'Follow'} user</button>
          <br />
        </div>
        : null
      }
      <p onClick={() => navigate(`/users/${userId}/followers`)} style={{cursor: 'pointer'}}>{user.follower_count} followers</p>
      <p onClick={() => navigate(`/users/${userId}/following`)} style={{cursor: 'pointer'}}>{user.following_count} following</p>
      <h2>Bio:</h2>
      <p>{user.profile.bio}</p>
      <br />
      {user.connected_accounts.map((account, index) => (
        <div key={index} style={{border: '1px solid black', padding: '10px'}}>
          <img src={account.profile_picture_url} alt="" />
          <p>Platform: {account.provider}</p>
          <p>Account Username: {account.username}</p>
        </div>
      ))}
      <br />
      {showDiscordLinkButton && (
      <a href="/api/discord/connect">
        Link your discord account
      </a>
      )}
      {showDiscordDisconnectButton && (
        <button onClick={handleDiscordDisconnect}>Disconnect Discord Account</button>
      )}
      <br />
      <PostList userId={userId} />
    </div>
  );
}

export default UserProfile;