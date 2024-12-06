// Keep your existing imports - don't change these
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostForm.css'
import api from '../../Services/api';

const PostForm = () => {
  // Keep your existing state and functions
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [followedCommunities, setFollowedCommunities] = useState([]);
  const [community, setCommunity] = useState({name: 'Loading...', num_users: 0});
  const [communityLabel, setCommunityLabel] = useState('Choose a community...');
  const [activeTab, setActiveTab] = useState('text'); // Add this new state
  const navigate = useNavigate();

  // Keep your existing useEffect
  useEffect(() => {
    const getCommunities = async () => {
      const { user: currentUser } = await api.getMe();
      const { communities } = await api.getUserCommunities(currentUser.id);
      setFollowedCommunities(communities);
    }
    getCommunities();
  }, []);

  // Keep your existing functions
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
        <div className="community-selector">
          <h2 className="selected-community">{communityLabel}</h2>
          <ul id="community-list">
            {followedCommunities.map((community) => (
              <li
                key={community.id}
                onClick={() => selectCommunity(community)}
              >
                {community.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="post-types">
          <div 
            className={`post-type ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Text
          </div>
          <div 
            className={`post-type ${activeTab === 'media' ? 'active' : ''}`}
            onClick={() => setActiveTab('media')}
          >
            Images & Video
          </div>
        </div>

        <div className="input-fields">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="title-input"
          />

          {activeTab === 'text' && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here..."
              required
              className="content-textarea"
            />
          )}

          {activeTab === 'media' && (
            <div className="file-input-container">
              <label htmlFor="image" className="file-input-label">
                Choose Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="file-input"
              />
              {image && <span className="file-name">{image.name}</span>}
            </div>
          )}
        </div>

        <div className="submit-container">
          <button type="submit" className="submit-button">Post</button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;