import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css'
import api from '../../Services/api';

function PostList({ communityId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const { posts } = await api.getCommunityPosts(communityId);
      setPosts(posts);
    }

    getPosts();
  }, [communityId]);

  return (
    <div className="post-list">
      <h2>Posts</h2>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img className="post-image" 
              src={post.image_url} 
              alt={post.title} 
              key={post.image_id} >
          </img>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <Link to={`/users/${post.author.id}`}>
            <p>{post.author.username}</p>
          </Link>
          <p className="post-content">{post.content.substring(0, 100)} {post.content.length > 100 ? '...' : ''}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;
