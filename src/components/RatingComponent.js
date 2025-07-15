// src/components/RatingComponent.js
import React, { useState } from 'react';
import './RatingComponent.css';

const RatingComponent = ({ onRate, initialRating = 0, disabled = false }) => {
    const [rating, setRating] = useState(initialRating);
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (star) => {
        if (!disabled) {
            setRating(star);
            onRate(star);
        }
    };

    return (
        <div className="rating-container">
            <h3>Rate this conversation:</h3>
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button // Changed from <span> to <button>
                        key={star}
                        type="button" // Added type="button"
                        className={`star ${star <= (hoverRating || rating) ? 'filled' : ''} ${disabled ? 'disabled' : ''}`}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => !disabled && setHoverRating(star)}
                        onMouseLeave={() => !disabled && setHoverRating(0)}
                    >
                        ★
                    </button> // Changed from </span> to </button>
                ))}
            </div>
        </div>
    );
};

export default RatingComponent;