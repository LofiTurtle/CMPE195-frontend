import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem'; // Adjust path as necessary
import api from '../../Services/api';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../Components/slices/userSlice';

function CommentList({ postId }) {
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const { userId, username, status, error } = useSelector((state) => state.user);
    useEffect(() => {
        const getComments = async () => {
            const commentsData = await api.getComments(postId);
            setComments(commentsData);  // Ensure this is an array of comments
        };
        getComments();
    }, [postId]);

    useEffect(() => {
        dispatch(fetchUser()); // Dispatch the fetchUser action, to get the slices
    }, [dispatch]);

    const handleReplySubmit = (parentId, replyContent) => {
        const createComment = async () => {
            try {
                // Make API call to create a new comment
                const { comment } = await api.createComment(replyContent, new Date().toISOString().replace("Z", "+00:00"), parentId, userId, postId);
                
                // Prepare the newReply object
                const newReply = {
                    author: {
                        username: username, // Replace this with the actual user data
                    },
                    content: comment.content,
                    created_at: comment.created_at,
                    id: comment.id,
                    parent_id: comment.parent_id,
                    post_id: comment.post_id,
                    replies: [],
                };
                
                // Update the comments state with the new reply
                setComments((prevComments) => {
                    const updateComments = (comments) => {
                        return comments.map((comment) => {
                            if (comment.id === parentId) {
                                return {
                                    ...comment,
                                    replies: [...comment.replies, newReply],
                                };
                            }
                            return {
                                ...comment,
                                replies: updateComments(comment.replies),
                            };
                        });
                    };
                    return updateComments(prevComments);
                });
            } catch (error) {
                console.error("Error creating comment:", error);
            }
        };

        createComment();
    };

    if (!comments || comments.length === 0) {
        return <div>No comments available</div>;
    }

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <CommentItem 
                    key={comment.id} 
                    comment={comment} 
                    onReplySubmit={handleReplySubmit} // Pass the reply submit handler
                />
            ))}
        </div>
    );
}

export default CommentList;