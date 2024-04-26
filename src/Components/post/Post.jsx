import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Post.css'

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data.data);
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
      <Link to={`/community/${post.community.id}`}>
        Community: {post.community.name}
      </Link>
      <p>Author: {post.author.username}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
