import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features-section">
      <div className="feature-container">
        <div className="feature-content">
          <div className="carousel-with-bg">
            <img src="/Carobg2.png" alt="Carousel Background" className="carousel-bg-image" />

            <div className="carousel-on-bg">
              <div className="feature-carousel-wrapper">
                <div className="feature-track">
                  {[...Array(2)].flatMap(() =>
                    [1, 2, 3, 4, 5].map(num => (
                      <div key={Math.random()} className="feature-slide">
                        <img src={`/f${num}.png`} alt={`Feature ${num}`} />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <img src="/framefeatures.png" alt="Carousel Frame" className="carousel-frame" />
            </div>
          </div>
        </div>

        {/* ✅ Move scrolling lines here, inside feature-container */}
        <div className="scrolling-lines">
          {[...Array(13)].map((_, i) => (
            <div key={i} className={`scroll-line scroll-line-${i}`}>
              <div className="scroll-track">
                {[...Array(15)].map((_, j) => (
                  <span key={j} className="scroll-text">
                    <span className="emoji">🧠</span> Learn. Practice. Crack. <span className="emoji">🪄</span>&nbsp;&nbsp;&nbsp;
                    </span>
                  ))}
                  </div>
                  </div>
                ))}
          </div>

      </div>
    </div>
  );
};

export default Features;



