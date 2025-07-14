// src/components/SubjectiveFeedback.js
import React, { useState } from 'react';
import './SubjectiveFeedback.css';

const SubjectiveFeedback = ({ onSaveFeedback, initialFeedback = '', disabled = false }) => {
    const [feedbackText, setFeedbackText] = useState(initialFeedback);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSaveFeedback(feedbackText);
    };

    return (
        <form className="subjective-feedback-container" onSubmit={handleSubmit}>
            <h3>Any additional feedback?</h3>
            <textarea
                placeholder="Type your feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows="4"
                className="feedback-textarea"
                disabled={disabled}
            ></textarea>
            {!disabled && (
                <button type="submit" className="save-feedback-button">Submit Feedback</button>
            )}
        </form>
    );
};

export default SubjectiveFeedback;