import React, { useState } from 'react';
import './Cards.css';

const Cards = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cardsData = [
    {
      id: 1,
      title: 'DASHBOARD',
      description: 'Track your placement progress in one place.',
      image: 'lap.png',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      specialties: ['Progress Analytics', 'Skill Mapping', 'Company Trends'],
      icon: '📊'
    },
    {
      id: 2,
      title: 'PLANNER',
      description: 'Organize your calendar and todos smartly.',
      image: 'todo.png',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      specialties: ['Smart Reminders', 'Interview Schedule', 'Deadline Tracker'],
      icon: '🗓️'
    },
    {
      id: 3,
      title: 'NOTES',
      description: 'Save and access important study material.',
      image: 'roc.png',
      gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      specialties: ['Cloud Sync', 'Rich Formatting', 'Quick Search'],
      icon: '📝'
    },
    {
      id: 4,
      title: 'CHATBOT',
      description: 'Your personal placement assistant.',
      image: 'bot.png',
      gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      specialties: ['24/7 Support', 'FAQs', 'Interview Prep'],
      icon: '🤖'
    },
    {
      id: 5,
      title: 'COMPILER',
      description: 'Code, test and debug directly in browser.',
      image: 'code.png',
      gradient: 'linear-gradient(135deg, #ffc3a0 0%, #ffafbd 100%)',
      specialties: ['Multi-language', 'Debugger', 'Code Sharing'],
      icon: '💻'
    },
    {
      id: 6,
      title: 'FUNFACT',
      description: 'Enjoy cool placement facts and trivia.',
      image: 'op.png',
      gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      specialties: ['Daily Facts', 'Success Stories', 'Tech Trends'],
      icon: '✨'
    },
  ];

  return (
    <div className='Headingcard'>
      <h1><b>What Makes Brofessor Awesome?<span className='think-emoji'>🤔</span></b></h1>
      <div className="cards-container">
        {cardsData.map((card, index) => (
          <div 
            key={card.id} 
            className={`card ${index % 2 === 0 ? 'left' : 'right'}`}
            style={{ background: card.gradient }}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-image">
              <img src={card.image} alt={card.title} className="animated-image" />
              <div className="card-icon">{card.icon}</div>
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              {card.description && <p>{card.description}</p>}
              
              <div className="specialties-container">
                {card.specialties.map((spec, i) => (
                  <span 
                    key={i} 
                    className="specialty-tag"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      opacity: hoveredCard === card.id ? 1 : 0
                    }}
                  >
                    {spec}
                  </span>
                ))}
              </div>
              
              <div className="comment-text">
                <span className="tech-label">Powered by AI • Real-time Sync</span>
                This is the texture icon design welcome your comments
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;