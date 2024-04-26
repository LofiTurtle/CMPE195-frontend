import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostForm.css'

const PostForm = () => {
  const { communityId } = useParams();

  const [content, setContent] = useState('');
  const [author_id, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [community, setCommunity] = useState({name: 'Loading...', num_users: 0});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/community/${communityId}`)
    .then(response => response.json())
    .then(data => setCommunity(data.data))
  }, [communityId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        title: title,
        author_id: author_id,
        community_id: community.id,
        content: content
    };
    fetch('/api/posts/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body : JSON.stringify(data) })
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
      })
      .then(navigate(`/community/${communityId}`))
      .catch(() => console.log('Error creating post.'))
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