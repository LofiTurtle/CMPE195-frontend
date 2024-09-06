import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Community.css';
import PostList from './PostList';
import api from '../../Services/api';

const Community = () => {
  const { communityId } = useParams();

  const [community, setCommunity] = useState({name: 'Loading...', num_users: 0});

  useEffect(() => {
    const getCommunity = async () => {
      const { community } = await api.getCommunity(communityId);
      setCommunity(community);
    }

    getCommunity();
  }, [])


  return (
    <div>
      <h1>{community.name}</h1>
      {/* <button>Follow Community (not yet implemented)</button> */}
      <Link to={`/community/${communityId}/create-post`}>Create New Post</Link>
      <p>{community.num_users} members</p>
      <PostList communityId={communityId}></PostList>
    </div>
  );
}

export default Community;