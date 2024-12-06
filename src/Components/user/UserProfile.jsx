// UserProfile.jsx
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
  const { currentUser, status, error } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const isOwnProfile = currentUser?.id === Number(userId);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }

    const getUser = async () => {
      try {
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
        console.log(error);
      }
    };
    getIsFollowing();
  }, [dispatch, status, userId]);

  const handleDiscordDisconnect = () => {
    fetch('/api/discord/disconnect', { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error disconnecting Discord account');
        }
        console.log('Disconnected from Discord');
        navigate(0);
      })
      .catch(error => console.log(error));
  };

  const toggleFollowing = async () => {
    try {
      if (isFollowing) {
        await api.unfollowUser(userId);
        setIsFollowing(false);
        setUser({ ...user, follower_count: user.follower_count - 1 });
      } else {
        await api.followUser(userId);
        setIsFollowing(true);
        setUser({ ...user, follower_count: user.follower_count + 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h1>Loading user...</h1>;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      {isOwnProfile ? (
        <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      ) : (
        <div>
          <br/>
          <button onClick={toggleFollowing}>{isFollowing ? 'Unfollow' : 'Follow'} user</button>
          <br/>
        </div>
      )}
      <p onClick={() => navigate(`/users/${userId}/followers`)} style={{cursor: 'pointer'}}>
        {user.follower_count} followers
      </p>
      <p onClick={() => navigate(`/users/${userId}/following`)} style={{cursor: 'pointer'}}>
        {user.following_count} following
      </p>
      <h2>Bio:</h2>
      <p>{user.profile.bio}</p>
      <br/>
      <RatingSummary />
      {currentUser.id !== Number(userId) && (<Link to={`/users/${userId}/ratings/submit`}>Rate this user</Link>)}
      <br/>
      <br/>
      {currentUser?.id === Number(userId) && (<div>
        {!currentUser.connected_accounts?.discord && <a href="/api/discord/connect">Link your Discord account</a>}
        {currentUser.connected_accounts?.discord && (
          <div>
            <div style={{border: '1px solid black', padding: '10px', cursor: 'pointer'}}
                 onClick={() => location.href = `https://discordapp.com/users/${currentUser.connected_accounts.discord.discord_user_id}`}>
              <img src={currentUser.connected_accounts.discord.profile_picture_url} alt=""/>
              <p>Platform: {currentUser.connected_accounts.discord.provider}</p>
              <p>Account Username: {currentUser.connected_accounts.discord.username}</p>
            </div>
            <br/>
            <button onClick={handleDiscordDisconnect}>Disconnect Discord Account</button>
          </div>
        )}
      </div>)}
      <br/>
      <PostList userId={userId}/>
    </div>
    )
  ;
};

export default UserProfile;