// src/views/HistoryPage.js
import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Keep this line commented or removed
import MessageBubble from '../components/MessageBubble';
import RatingComponent from '../components/RatingComponent';
import SubjectiveFeedback from '../components/SubjectiveFeedback';
import ConversationItem from '../components/ConversationItem';
import './HistoryPage.css';

const HistoryPage = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    // const navigate = useNavigate(); // Keep this line commented or removed

    useEffect(() => {
        loadConversations();
    }, []);

    const loadConversations = () => {
        const saved = JSON.parse(localStorage.getItem('conversations') || '[]');
        setConversations(saved.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))); // Sort by most recent
    };

    const handleConversationClick = (id) => {
        const conv = conversations.find(c => c.id === id);
        setSelectedConversation(conv);
    };

    const handleClearHistory = () => {
        if (window.confirm("Are you sure you want to delete all past conversations? This cannot be undone.")) {
            localStorage.removeItem('conversations');
            setConversations([]);
            setSelectedConversation(null);
        }
    };

    const handleGoBackToList = () => {
        setSelectedConversation(null);
    };

    return (
        <div className="history-page">
            <div className={`conversation-list-panel ${selectedConversation ? 'hidden-on-mobile' : ''}`}>
                <h2>Past Conversations</h2>
                {/* ---------- THIS IS THE CORRECTED BUTTON LINE ---------- */}
                <button type="button" className="clear-history-button" onClick={handleClearHistory}>
                    Clear All History
                </button>
                {/* ----------------------------------------------------- */}
                {conversations.length === 0 ? (
                    <p>No past conversations found.</p>
                ) : (
                    conversations.map((conv) => (
                        <ConversationItem
                            key={conv.id}
                            conversation={conv}
                            onClick={handleConversationClick}
                        />
                    ))
                )}
            </div>

            {selectedConversation && (
                <div className="selected-conversation-panel">
                    <button className="back-to-list-button" onClick={handleGoBackToList}>
                        ← Back to List
                    </button>
                    <h2>Conversation Details</h2>
                    <div className="chat-messages-history">
                        {selectedConversation.messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                type={msg.type}
                            />
                        ))}
                    </div>
                    {selectedConversation.overallRating !== null && (
                        <RatingComponent initialRating={selectedConversation.overallRating} disabled={true} />
                    )}
                    {selectedConversation.subjectiveFeedback && (
                        <SubjectiveFeedback initialFeedback={selectedConversation.subjectiveFeedback} disabled={true} />
                    )}
                    {selectedConversation.overallRating === null && (
                        <p className="no-feedback-message">No rating provided for this conversation.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryPage;