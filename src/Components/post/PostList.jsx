import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css'

function PostList({ communityId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/community/${communityId}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [communityId]);

  return (
    <div className="post-list">
      <h2>Posts</h2>
      {posts.map(post => (
        <div className="post" key={post.id}>
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
