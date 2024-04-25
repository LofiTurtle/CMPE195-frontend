import React, { useState } from 'react';
import './Postform.css'

const PostForm = () => {
  const [content, setContent] = useState('');
  const [community_id, setCommunity] = useState('1234');
  const [author_id, setAuthor] = useState('1234');
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        title: title,
        author_id: author_id,
        community_id: community_id,
        content: content
    };
    fetch('/post', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body : JSON.stringify(data) })
      .then(response => {
        if (response.status != 200) {
          throw new Error();
        }
      })
      .catch(() => console.log('Error logging out.'))
  };

  return (
    <div className="container">
      <h1 className="left-header">{community_id}</h1>
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