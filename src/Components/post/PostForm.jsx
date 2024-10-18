import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostForm.css'
import api from '../../Services/api';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [followedCommunities, setFollowedCommunities] = useState([]);
  const [community, setCommunity] = useState({name: 'Loading...', num_users: 0});
  const [communityLabel, setCommunityLabel] = useState('Choose a community...')
  const navigate = useNavigate();

  useEffect(() => {
    const getCommunities = async () => {
      const { user: currentUser } = await api.getMe();
      const { communities } = await api.getUserCommunities(currentUser.id);
      setFollowedCommunities(communities);
    }

    getCommunities();
  }, []);

  const selectCommunity = (community) => {
    setCommunity(community);
    setCommunityLabel(community.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await api.createPost(title, content, community.id, image);
    navigate(`/community/${community.id}`)
  };

  return (
    <div className="container">
      <h1 className="left-header">Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>{communityLabel}</h2>
          <br />
          <ul>
            {followedCommunities.map((community) => (
              <li
                key={community.id}
                onClick={() => selectCommunity(community)}
                style={{cursor: 'pointer', border: '1px solid gray', maxWidth: 'fit-content'}}
              >{community.name}</li>
            ))}
          </ul>
        </div>
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post here..."
          rows={4}
          cols={50}
          required
        />
        <br />
        <label htmlFor="image">Image:</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;