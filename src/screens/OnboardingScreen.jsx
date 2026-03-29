import React from 'react';

const OnboardingScreen = ({ step, setStep, onFinish }) => {
  const data = [
    {
      title: "Master the Theory",
      desc: "Comprehensive guides and mock tests to help you pass with confidence.",
      icon: "📚",
      // image: "/onboarding_road_trip.png"
    },
    {
      title: "Hazard Perception",
      desc: "Interactive videos to train your eye for potential dangers on the road.",
      icon: "⚠️",
      // image: "/onboarding_learning_phone.png"
    },
    {
      title: "Pass Guaranteed",
      desc: "Track your progress and get personalized AI learning recommendations.",
      icon: "🏆",
      // image: "/onboarding_achieve_badge_passed_test.png"
    }
  ];

  const current = data[step];

  return (
    <div className="screen onboarding-container animate-fade-in" style={{ background: 'white', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: '60px' }}>
      <div className="illustration-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ fontSize: '120px', transform: 'scale(1.5)' }}>{current.icon}</div>
      </div>
      
      <div className="content-container" style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>{current.title}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '16px' }}>{current.desc}</p>
        
        <div className="dots-container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          {data.map((_, i) => (
            <div key={i} style={{ width: i === step ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === step ? 'var(--primary)' : '#E5E5EA', transition: 'width 0.3s' }}></div>
          ))}
        </div>
        
        <button className="btn btn-primary" style={{ marginTop: '40px' }} onClick={() => {
          if (step < 2) setStep(step + 1);
          else onFinish();
        }}>
          {step === 2 ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
