import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';
import api from '../../Services/api';
import { AiFillLike } from 'react-icons/ai';

function PostList({ homepage, userId, communityId }) {
  // Exactly 1 prop should be defined

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({});
  const [newComment, setNewComment] = useState('');
  const [sortType, setSortType] = useState('Hot');

  const sortTypeOptions = [
    'Hot',
    'Top',
    'New'
  ];

  useEffect(() => {
    const getPosts = async () => {
      let posts;
      const sortTypeLowercase = String(sortType).toLowerCase();
      if (homepage) {
        ({ posts } = await api.getHomepage(sortTypeLowercase));
      } else if (userId !== null && userId !== undefined) {
        ({ posts } = await api.getUserPosts(userId, sortTypeLowercase));
      } else if (communityId !== null && communityId !== undefined) {
        ({ posts } = await api.getCommunityPosts(communityId, sortTypeLowercase));
      } else {
        throw new Error('Missing prop for PostList.jsx');
      }
      setPosts(posts);
    };

    getPosts();
  }, [communityId, homepage, userId, sortType]);

  const handleSortTypeChange = (event) => {
    setSortType(event.target.value)
  }

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
      <div>
        <span>
          Sorting by: 
        </span>
        <select 
          value={sortType}
          onChange={handleSortTypeChange}
        >
          {sortTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {posts.map(post => (
        <div className="post" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3 className="post-title">{post.title}</h3>
          </Link>
          {post.media === 'image' ? <img
            className="post-image"
            src={`/api/posts/${post.id}/image`}
            alt={post.title}
            onError={(e) => { e.target.style.display = 'none'; }}
          /> : null}
          <Link to={`/users/${post.author.id}`}>
            <p>{post.author.username}</p>
          </Link>
          <p className="post-content">
            {post.content.substring(0, 100)} {post.content.length > 100 ? '...' : ''}
          </p>
          <p className="post-date">
            Posted {(new Date(`${post.created_at}Z`)).toLocaleString()}
          </p>

          <div className="post-actions">
            <button onClick={() => handleLike(post.id)}>
              <AiFillLike size="40" color="var(--secondary-bg)" />
              ({post.num_likes})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
