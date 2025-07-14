// src/components/ChatInput.js
import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form className="chat-input-container" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Message Bot AI..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="chat-input"
            />
            <button type="submit" className="ask-button">Ask</button>
        </form>
    );
};

export default ChatInput;