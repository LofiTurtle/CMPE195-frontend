import React, { useState } from 'react';
import CommentInput from './CommentInput';
import './CommentItem.css';
import api from '../../Services/api';
import {useSelector} from 'react-redux';


const CommentItem = ({ comment, onReplySubmit }) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // State to track collapse status
    const [showReplyInput, setShowReplyInput] = useState(false); // State to control reply input visibility
    const { currentUser, status, error } = useSelector((state) => state.user);
    const [liked, setLiked] = useState(comment.liked_by_current_user);
    const [likesCount, setLikesCount] = useState(comment.num_likes);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // Toggle the collapse state
    };

    const toggleLike = async () => {
        try {
            if (liked) {
                await api.unlikeComment(comment.id); // Call API to unlike the comment
                setLiked(false);
                setLikesCount((prev) => prev - 1);
            } else {
                await api.likeComment(comment.id); // Call API to like the comment
                setLiked(true);
                setLikesCount((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleReplySubmit = (replyContent) => {
        onReplySubmit(comment.id, replyContent); // Pass the reply content and parent comment ID
        setShowReplyInput(false); // Close the input after submission
    };

    const deleteComm = async (commentId) => {
        try {
            await api.deleteComment(commentId); // Call the deleteComment API method
            window.location.reload(); // Redirect to the home page
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <div className="comment">
            <div className="comment-author">{comment.author.username}</div>
            {currentUser && currentUser.id === comment.author.id && (
                <button onClick={() => deleteComm(comment.id)} className="delete-comment-btn">
                    Delete
                </button>
            )}
            <div className="comment-date">{new Date(comment.created_at).toLocaleString()}</div>
            <div className="comment-content">
                <p>{comment.content}</p>

                {/* Container for action buttons */}
                <div className="comment-actions">
                    {/* Render the collapse button only if there are replies */}
                    {comment.replies && comment.replies.length > 0 && (
                        <button 
                            onClick={toggleCollapse} 
                            className="toggle-replies-btn"
                        >
                            {isCollapsed ? 'Show Replies' : 'Hide Replies'}
                        </button>
                    )}

                    {/* Reply button to show the comment input */}
                    <button 
                        onClick={() => setShowReplyInput(!showReplyInput)} 
                        className="reply-btn"
                    >
                        Reply
                    </button>

                    {/* Like Button */}
                    <button
                        onClick={toggleLike}
                        className={`like-btn ${liked ? 'liked' : ''}`}
                    >
                        👍 {likesCount}
                    </button>
                </div>

                {/* Render reply input if showReplyInput is true */}
                {showReplyInput && (
                    <CommentInput 
                        onSubmit={handleReplySubmit} 
                        closeInput={() => setShowReplyInput(false)} 
                    />
                )}
            </div>

            {/* Render replies recursively if there are any and not collapsed */}
            {!isCollapsed && comment.replies && comment.replies.length > 0 && (
                <div className="replies">
                    {comment.replies.map((reply) => (
                        <CommentItem 
                            key={reply.id} 
                            comment={reply} 
                            onReplySubmit={onReplySubmit} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem;
