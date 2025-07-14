// src/components/FeedbackControls.js
import React from 'react';
import './FeedbackControls.css';

const FeedbackControls = ({ onFeedback }) => {
    return (
        <div className="feedback-controls">
            <button className="feedback-button" onClick={() => onFeedback('like')}>👍</button>
            <button className="feedback-button" onClick={() => onFeedback('dislike')}>👎</button>
        </div>
    );
};

export default FeedbackControls;