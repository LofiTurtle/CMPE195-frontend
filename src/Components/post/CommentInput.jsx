import React, { useState } from 'react';

const CommentInput = ({ onSubmit, closeInput }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onSubmit(content);
            setContent(''); 
        }
    };

    return (
        <div className="comment-input">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write a reply..."
                    rows="3"
                    required
                />
                <div>
                    <button type="submit">Reply</button>
                    <button type="button" onClick={closeInput}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CommentInput;
