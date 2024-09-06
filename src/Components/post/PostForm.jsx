import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostForm.css'
import axiosApi from '../../Services/api';
import api from '../../Services/api';

const PostForm = () => {
  const { communityId } = useParams();

  const [content, setContent] = useState('');
  const [authorId, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [community, setCommunity] = useState({name: 'Loading...', num_users: 0});
  const navigate = useNavigate();

  useEffect(() => {
    const getCommunity = async () => {
      const { community } = await axiosApi.getCommunity(communityId);
      setCommunity(community);
    }

    getCommunity();
  }, [communityId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await api.createPost(title, content, community.id, authorId);
    navigate(`/community/${communityId}`)
  };

  return (
    <div className="container">
      <h1 className="left-header">{community.name}</h1>
      <h2 className="left-header">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostForm;