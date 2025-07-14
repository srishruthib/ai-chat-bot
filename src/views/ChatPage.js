import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import RatingComponent from '../components/RatingComponent';
import SubjectiveFeedback from '../components/SubjectiveFeedback';
import sampleData from '../data/sampleData.json';
import './ChatPage.css';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [overallRating, setOverallRating] = useState(null);
    const [subjectiveFeedback, setSubjectiveFeedback] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const startNewConversation = () => {
        const newId = `conv-${Date.now()}`;
        setConversationId(newId);
        setMessages([]);
        setOverallRating(null);
        setSubjectiveFeedback('');
        // Store empty new conversation in local storage
        const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
        const newConversation = {
            id: newId,
            timestamp: new Date().toISOString(),
            messages: [],
            overallRating: null,
            subjectiveFeedback: ''
        };
        localStorage.setItem('conversations', JSON.stringify([...savedConversations, newConversation]));
    };

    useEffect(() => {
        // Start a new conversation when the component mounts
        startNewConversation();
    }, []); // Empty dependency array means this runs once on mount

    const updateConversationInLocalStorage = (updatedConversation) => {
        const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
        const updatedConversations = savedConversations.map(conv =>
            conv.id === updatedConversation.id ? updatedConversation : conv
        );
        localStorage.setItem('conversations', JSON.stringify(updatedConversations));
    };

    const handleSendMessage = (text) => {
        const newUserMessage = {
            id: `msg-${Date.now()}-user`,
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'user',
        };

        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newUserMessage];
            const currentConversation = {
                id: conversationId,
                timestamp: updatedMessages[0].timestamp, // Use first message timestamp for conversation
                messages: updatedMessages,
                overallRating: overallRating,
                subjectiveFeedback: subjectiveFeedback
            };
            updateConversationInLocalStorage(currentConversation);
            return updatedMessages;
        });

        // Simulate bot response - Removed setTimeout to fix Cypress timing issue
        const botResponse = getBotResponse(text);
        const newBotMessage = {
            id: `msg-${Date.now()}-bot`,
            text: botResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'bot',
            feedback: null
        };

        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newBotMessage];
            const currentConversation = {
                id: conversationId,
                timestamp: updatedMessages[0].timestamp,
                messages: updatedMessages,
                overallRating: overallRating,
                subjectiveFeedback: subjectiveFeedback
            };
            updateConversationInLocalStorage(currentConversation);
            return updatedMessages;
        });
    };

    const getBotResponse = (userMessage) => {
        const lowerCaseMessage = userMessage.toLowerCase().trim();

        // Removed TEMPORARY DEBUGGING CODE, as sampleData.json now directly supports the test query.

        const matchingResponse = sampleData.find(item =>
            lowerCaseMessage.includes(item.question.toLowerCase())
        );
        return matchingResponse ? matchingResponse.answer : "Sorry, Did not understand your query!";
    };

    const handleFeedback = (messageId, feedbackType) => {
        setMessages((prevMessages) => {
            const updatedMessages = prevMessages.map((msg) =>
                msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
            );
            const currentConversation = {
                id: conversationId,
                timestamp: updatedMessages[0].timestamp,
                messages: updatedMessages,
                overallRating: overallRating,
                subjectiveFeedback: subjectiveFeedback
            };
            updateConversationInLocalStorage(currentConversation);
            return updatedMessages;
        });
    };

    const handleRateConversation = (rating) => {
        setOverallRating(rating);
        const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
        const currentConversationIndex = savedConversations.findIndex(conv => conv.id === conversationId);

        if (currentConversationIndex !== -1) {
            const updatedConversations = [...savedConversations];
            updatedConversations[currentConversationIndex] = {
                ...updatedConversations[currentConversationIndex],
                overallRating: rating
            };
            localStorage.setItem('conversations', JSON.stringify(updatedConversations));
        }
    };

    const handleSaveSubjectiveFeedback = (feedback) => {
        setSubjectiveFeedback(feedback);
        const savedConversations = JSON.parse(localStorage.getItem('conversations') || '[]');
        const currentConversationIndex = savedConversations.findIndex(conv => conv.id === conversationId);

        if (currentConversationIndex !== -1) {
            const updatedConversations = [...savedConversations];
            updatedConversations[currentConversationIndex] = {
                ...updatedConversations[currentConversationIndex],
                subjectiveFeedback: feedback
            };
            localStorage.setItem('conversations', JSON.stringify(updatedConversations));
        }
    };


    return (
        <div className="chat-page">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        type={msg.type}
                        onFeedback={handleFeedback}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
            {messages.length > 0 && overallRating === null && (
                <RatingComponent onRate={handleRateConversation} initialRating={overallRating} />
            )}
            {messages.length > 0 && overallRating !== null && subjectiveFeedback === '' && (
                <SubjectiveFeedback onSaveFeedback={handleSaveSubjectiveFeedback} initialFeedback={subjectiveFeedback} />
            )}
            {messages.length > 0 && overallRating !== null && subjectiveFeedback !== '' && (
                <div className="feedback-complete-message">
                    Thank you for your feedback!
                </div>
            )}
        </div>
    );
};

export default ChatPage;