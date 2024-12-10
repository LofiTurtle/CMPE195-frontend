import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Post.css'
import CommentList from './CommentList';
import api from '../../Services/api';
import {useDispatch, useSelector} from 'react-redux';
import {AiFillLike} from "react-icons/ai";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, status, error } = useSelector((state) => state.user);
  useDispatch();
  const DeletePost = ({ postId }) => {
    const navigate = useNavigate();
  
    const handleDelete = async () => {
      try {
        await api.deletePost(postId);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    };
  
    return (
      <button onClick={handleDelete}>Delete Post</button>
    );
  };
  
  useEffect(() => {
    const getPost = async () => {
      const { post } = await api.getPost(postId);
      setPost(post);
    }
    getPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
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

  return (
    <div>
      <div className="post-details">
        <h2>{post.title}</h2>
        <span>Community: </span>
        <Link to={`/community/${post.community.id}`}>
          {post.community.name}
        </Link>
        <br/>
        <span>Author: </span>
        <span>
          <Link to={`/users/${post.author.id}`}>
            {post.author.username}
          </Link>
        </span>
        {currentUser && currentUser.id === post.author.id && (
          <div className="dropdown">
            <button className="dropdown-button">Edit</button>
            <div className="dropdown-content">
              <DeletePost postId={postId}/>
            </div>
          </div>
        )}
        {post.media === 'image' ? <img
          className="post-image"
          src={`/api/posts/${post.id}/image`}
          alt={post.title}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        /> : null}
        <p>{post.content}</p>
        <div className="post-actions">
          <button onClick={() => handleLike(post.id)}>
            <AiFillLike size="40" color="var(--secondary-bg)"/>
            ({post.num_likes})
          </button>
        </div>
        <CommentList postId={postId}/>
      </div>
    </div>
  );
}

export default Post;