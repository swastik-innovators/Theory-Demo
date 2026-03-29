import React, { useState, useRef } from 'react';
import './onboarding.css';

const slides = [
  {
    image: '/onboard_practice.png',
    title: 'Practice Smart',
    desc: 'AI-powered adaptive learning that focuses on your weak areas and maximises your study time.',
    bg: 'linear-gradient(180deg, #EBF3FF 0%, #F2F2F7 100%)',
  },
  {
    image: '/onboard_mocktest.png',
    title: 'Mock Tests',
    desc: 'Full exam simulations with real-time timer — just like the real DVSA theory test.',
    bg: 'linear-gradient(180deg, #F3EBFF 0%, #F2F2F7 100%)',
  },
  {
    image: '/onboard_progress.png',
    title: 'Track Progress',
    desc: 'See your improvement over time and get a live prediction of your pass probability.',
    bg: 'linear-gradient(180deg, #E8FFF5 0%, #F2F2F7 100%)',
  },
  {
    image: '/onboard_hazard.png',
    title: 'Hazard Perception',
    desc: 'Interactive video clips that train your eye to spot real driving hazards instantly.',
    bg: 'linear-gradient(180deg, #FFF3E8 0%, #F2F2F7 100%)',
  },
];

const FeatureSlidesScreen = ({ onNext, onBack }) => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);
  const touchStart = useRef(0);

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && current < slides.length - 1) setCurrent(current + 1);
      if (delta < 0 && current > 0) setCurrent(current - 1);
    }
  };

  const isLast = current === slides.length - 1;
  const slide = slides[current];

  return (
    <div className="ob-screen ob-features" style={{ background: slide.bg }}>
      <div className="ob-progress-bar">
        <div className="ob-progress-fill" style={{ width: '42%' }}></div>
      </div>

      <div className="ob-top-actions">
        <button className="ob-btn-back-sm" onClick={onBack}>&larr;</button>
        <button className="ob-skip-btn" onClick={onNext}>Skip</button>
      </div>

      <div
        className="ob-content features-content"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="feature-illustration" key={current}>
          <img src={slide.image} alt={slide.title} className="feature-img animate-float" />
        </div>

        <div className="feature-text-area" key={`text-${current}`}>
          <h1 className="ob-title animate-slide-up">{slide.title}</h1>
          <p className="ob-subtitle animate-slide-up" style={{ animationDelay: '100ms' }}>{slide.desc}</p>
        </div>

        <div className="feature-dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      <div className="ob-footer">
        <button className="ob-btn-primary" onClick={() => isLast ? onNext() : setCurrent(current + 1)}>
          {isLast ? 'Continue' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default FeatureSlidesScreen;
