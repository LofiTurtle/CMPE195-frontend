import React, { useState } from 'react';
import CommentInput from './CommentInput'; // Adjust the path as needed
import './CommentItem.css'; // Ensure this import points to your CSS file

const CommentItem = ({ comment, onReplySubmit }) => {
    const [isCollapsed, setIsCollapsed] = useState(false); // State to track collapse status
    const [showReplyInput, setShowReplyInput] = useState(false); // State to control reply input visibility

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // Toggle the collapse state
    };

    const handleReplySubmit = (replyContent) => {
        onReplySubmit(comment.id, replyContent); // Pass the reply content and parent comment ID
        setShowReplyInput(false); // Close the input after submission
    };

    return (
        <div className="comment">
            <div className="comment-author">{comment.author.username}</div>
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
