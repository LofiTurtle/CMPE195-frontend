import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Community.css';
import PostList from './PostList';
import api from '../../Services/api';

const Community = () => {
  const { communityId } = useParams();

  const [community, setCommunity] = useState({name: 'Loading...', num_users: 0});
  const [isFollowing, setIsFollowing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getCommunity = async () => {
      const { community } = await api.getCommunity(communityId);
      setCommunity(community);
    }

    const getIsFollowing = async () => {
      const {user: currentUser} = await api.getMe();
      const { users } = await api.getCommunityUsers(communityId);
      setIsFollowing(users.map((x) => x.id).includes(currentUser.id));
    }

    getCommunity();
    getIsFollowing();
  }, [communityId])

  const toggleFollowCommunity = async () => {
    if (isFollowing) {
      await api.unfollowCommunity(community.id);
      setIsFollowing(false);
      setCommunity({ ...community, num_users: community.num_users - 1});
    } else {
      await api.followCommunity(community.id);
      setIsFollowing(true);
      setCommunity({ ...community, num_users: community.num_users + 1});
    }
  }

  return (
    <div>
      <h1>{community.name}</h1>
      <button onClick={toggleFollowCommunity}>{isFollowing ? 'Unfollow' : 'Follow'} Community</button>
      <br />
      <Link to={`/create-post`}>Create New Post</Link>
      <p onClick={() => navigate(`/community/${communityId}/members`)} style={{cursor: 'pointer'}}>{community.num_users} members</p>
      <PostList communityId={communityId}></PostList>
    </div>
  );
}

export default Community;