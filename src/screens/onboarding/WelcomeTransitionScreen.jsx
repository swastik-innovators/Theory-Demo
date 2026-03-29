import React, { useEffect, useState } from 'react';
import './onboarding.css';

const WelcomeTransitionScreen = ({ name, onFinish }) => {
  const [phase, setPhase] = useState(0); // 0: logo, 1: text, 2: confetti

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(onFinish, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="ob-screen ob-welcome">
      <div className="welcome-bg">
        {/* Animated background orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="welcome-center">
        {phase >= 0 && (
          <div className={`welcome-check ${phase >= 1 ? 'show' : ''}`}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="30" fill="none" stroke="white" strokeWidth="3" opacity="0.3" />
              <circle
                cx="32" cy="32" r="30"
                fill="none" stroke="white" strokeWidth="3"
                strokeDasharray="188"
                strokeDashoffset={phase >= 1 ? '0' : '188'}
                style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
              />
              <path
                d="M20 33L28 41L44 25"
                fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="40"
                strokeDashoffset={phase >= 1 ? '0' : '40'}
                style={{ transition: 'stroke-dashoffset 0.5s ease-out 0.5s' }}
              />
            </svg>
          </div>
        )}

        {phase >= 1 && (
          <div className="welcome-text animate-slide-up">
            <h1 className="welcome-heading">Welcome, {name}! 👋</h1>
            <p className="welcome-sub">Your journey to passing starts now</p>
          </div>
        )}

        {phase >= 2 && (
          <div className="welcome-confetti">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  '--x': `${Math.random() * 100}%`,
                  '--delay': `${Math.random() * 0.5}s`,
                  '--rotation': `${Math.random() * 360}deg`,
                  '--color': ['#4F8CFF', '#7B61FF', '#FF9500', '#34C759', '#FF3B30', '#00D1FF'][i % 6],
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeTransitionScreen;
