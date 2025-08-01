import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const emojis = ['😊', '🤩', '😍', '😐', '😕', '😞', '😢', '😠'];
  const labels = ['Okay', 'Great', 'Love', 'Meh', 'Unsure', 'Sad', 'Crying', 'Angry'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comment, setComment] = useState('');

  const rotate = (direction) => {
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % emojis.length;
      } else {
        return (prev - 1 + emojis.length) % emojis.length;
      }
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const feedbackData = {
    emoji: emojis[currentIndex % emojis.length],
    comment,
  };

  try {
    const response = await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData),
    });

    if (response.ok) {
      alert('Thank you for your feedback!');
      setComment('');
      setSelectedEmoji(null);
    } else {
      alert('Failed to submit feedback.');
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
};


  return (
    <div className="feedback-container">
      <h2>How are you feeling today?</h2>
      
      <div className="emoji-carousel">
        <button className="arrow-btn left" onClick={() => rotate('prev')}>&lt;</button>
        
        <div className="emoji-wheel">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index = (currentIndex + offset + emojis.length) % emojis.length;
            const position = offset;
            
            return (
              <div 
                key={index}
                className={`emoji ${position === 0 ? 'center' : ''} ${Math.abs(position) === 2 ? 'far' : ''}`}
                onClick={position === 0 ? () => setSelectedEmoji(emojis[index]) : null}
              >
                {emojis[index]}
                {position === 0 && <div className="emoji-label">{labels[index]}</div>}
              </div>
            );
          })}
        </div>
        
        <button className="arrow-btn right" onClick={() => rotate('next')}>&gt;</button>
      </div>

      {selectedEmoji && (
        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more (optional)..."
            className="comment-box"
          />
          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
};

export default Feedback;