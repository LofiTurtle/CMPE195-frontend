import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';
import api from '../../Services/api';
import { AiFillLike } from 'react-icons/ai';

function PostList({ communityId }) {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({});
  const [newComment, setNewComment] = useState('');

  const backendUrl = 'http://127.0.0.1:5000';

  useEffect(() => {
    const getPosts = async () => {
      const { posts } = await api.getCommunityPosts(communityId);
      setPosts(posts);
    };

    getPosts();
  }, [communityId]);

  const handleLike = async (postId) => {
    try {
      await api.likePost(postId);
      const { posts: updatedPosts } = await api.getCommunityPosts(communityId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleCommentChange = (e, postId) => {
    setComment({ ...comment, [postId]: e.target.value });
  };

  const handleCommentSubmit = async (postId) => {
    if (comment[postId]) {
      await api.addComment(postId, comment[postId]);
      setNewComment(comment[postId]);
      setComment({ ...comment, [postId]: '' });
      const updatedPosts = await api.getCommunityPosts(communityId);
      setPosts(updatedPosts.posts);
    }
  };

  return (
    <div className="post-list">
      <h2>Posts</h2>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img
            className="post-image"
            src={`${backendUrl}/api/posts/${post.id}/image`}
            alt={post.title}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <Link to={`/users/${post.author.id}`}>
            <p>{post.author.username}</p>
          </Link>
          <p className="post-content">
            {post.content.substring(0, 100)} {post.content.length > 100 ? '...' : ''}
          </p>

          <div className="post-actions">
            <button onClick={() => handleLike(post.id)}>
              <AiFillLike size="40" color="var(--secondary-bg)" />
              ({post.num_likes})
            </button>

            <div className="comment-section">
              <textarea
                placeholder="Add a comment..."
                value={comment[post.id] || ''}
                onChange={(e) => handleCommentChange(e, post.id)}
              />
              <button onClick={() => handleCommentSubmit(post.id)}>
                Submit Comment
              </button>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;
