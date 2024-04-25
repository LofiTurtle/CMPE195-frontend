import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Post.css'

function Post() {
  const { postId } = useParams(); // Get postId from URL params
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`); // Assuming your backend API endpoint for fetching a single post is /api/posts/:postId
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-details">
      <h2>{post.title}</h2>
      <p>User ID: {post.userId}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
