import React from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';


const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/LoginSignup');
  };


  return (
    <div className="hero-container">

      <div className="hero-text">
        <h3><span className='laugh-emoji'>🤓</span>  All-in-One</h3>
        <h1>Placement Preparation Portal</h1>
        <p className="highlight"><span className='wave-emoji'>👋</span>Hey Bro, Your Brain Just Got an Upgrade.</p>
        <div className='h6bg'>
        <h6><span className='laugh-emoji'>🎓 </span>  "A Smart Platform to Learn, Practice, Plan & Crack Your Dream Job!"</h6>
        </div>
        <p className="subtext">A focused platform to Learn, Practice, Track, Crack and Grow Ahead<span className='wave-emoji'>🚀</span> </p>
        <div className="btn">
          <button className="get-started" onClick={handleGetStarted}> Get Started </button>

        </div>
      </div>
      

      <div className="hero-image">
        <div className="herocontainer">
          <img src='Carobg1.png' alt='bg'/>
          <div className="image-carousel-wrapper">
            <img src='tv.png' alt='frame'/>
            
            <div className="image-carousel-track">
              <img src="/img1.png" alt="Slide 1" />
              <img src="/img2.png" alt="Slide 2" />
              <img src="/img3.png" alt="Slide 3" />
              <img src="/img4.png" alt="Slide 4" />
              <img src="/img5.png" alt="Slide 5" />
              <img src="/img6.png" alt="Slide 6" />
              <img src="/img1.png" alt="Slide 1" />
              <img src="/img2.png" alt="Slide 2" />
              <img src="/img3.png" alt="Slide 3" />
              <img src="/img4.png" alt="Slide 4" />
              <img src="/img5.png" alt="Slide 5" />
              <img src="/img6.png" alt="Slide 6" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
