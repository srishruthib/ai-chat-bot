// src/components/ConversationItem.js
import React from 'react';
import './ConversationItem.css';

const ConversationItem = ({ conversation, onClick }) => {
    return (
        <div className="conversation-item" onClick={() => onClick(conversation.id)}>
            <div className="conversation-date">{new Date(conversation.timestamp).toLocaleDateString()}</div>
            <div className="conversation-summary">
                {conversation.messages.length > 0 ? conversation.messages[0].text.substring(0, 50) + '...' : 'Empty Conversation'}
            </div>
            {conversation.overallRating !== null && (
                <div className="conversation-rating">
                    Rating: {conversation.overallRating} ★
                </div>
            )}
        </div>
    );
};

export default ConversationItem;