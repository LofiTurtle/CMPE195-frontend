import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Postlist.css'

function PostList({ communityId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/posts?communityId=${communityId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data.posts);
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
          <p>User ID: {post.userId}</p>
          <p className="post-content">{post.content.substring(0, 100)}...</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;
