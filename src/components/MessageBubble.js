// src/components/MessageBubble.js
import React, { useState } from 'react';
import FeedbackControls from './FeedbackControls';
import './MessageBubble.css';

const MessageBubble = ({ message, type, onFeedback }) => {
    const [showFeedback, setShowFeedback] = useState(false);

    const handleMouseEnter = () => {
        if (type === 'bot') {
            setShowFeedback(true);
        }
    };

    const handleMouseLeave = () => {
        if (type === 'bot') {
            setShowFeedback(false);
        }
    };

    return (
        <div
            className={`message-bubble ${type}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="avatar">
                {type === 'user' ? 'You' : <span>Soul AI</span>}
            </div>
            <div className="message-content">
                <p>{message.text}</p>
                {type === 'bot' && showFeedback && (
                    <FeedbackControls onFeedback={(feedbackType) => onFeedback(message.id, feedbackType)} />
                )}
                {type === 'bot' && message.feedback && !showFeedback && (
                    <div className="historical-feedback">
                        {message.feedback === 'like' ? '👍' : '👎'}
                    </div>
                )}
            </div>
            <div className="timestamp">{message.timestamp}</div>
        </div>
    );
};

export default MessageBubble;