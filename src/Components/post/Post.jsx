import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Post.css'
import CommentList from './CommentList';
import api from '../../Services/api';
import {useDispatch, useSelector} from 'react-redux';


function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { currentUser, status, error } = useSelector((state) => state.user);

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

  return (
    <div>
      <div className="post-details">
        <h2>{post.title}</h2>
        <span>Community: </span>
        <Link to={`/community/${post.community.id}`}>
          {post.community.name}
        </Link>
        <br />
        <span>Author: </span>
        <span>
          <Link to={`/users/${post.author.id}`}>
            {post.author.username}
          </Link>
        </span>
        {currentUser && currentUser.id === post.author.id && (
          <div className="dropdown">
            <button className="dropdown-button">...</button>
            <div className="dropdown-content">
              <Link to={`/posts/${postId}/edit`}>Edit</Link>
            </div>
          </div>
        )}
        <p>{post.content}</p>
        <CommentList postId={postId}/>
      </div>
    </div>
  );
}

export default Post;