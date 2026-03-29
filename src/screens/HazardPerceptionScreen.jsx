import React, { useState } from 'react';
import { ChevronLeft, Info, Play, Pointer } from 'lucide-react';

const HazardPerceptionScreen = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [clicks, setClicks] = useState([]);

  const handleTap = (e) => {
    if (!isPlaying) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClicks([...clicks, { x, y, id: Date.now() }]);
    
    // Auto-remove click indicator after 0.5s
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== Date.now()));
    }, 500);
  };

  return (
    <div className="screen hazard-container animate-fade-in" style={{ padding: '0', background: 'black', color: 'white' }}>
      <header className="screen-header" style={{ padding: '24px', position: 'absolute', zIndex: 10, width: '100%' }}>
        <button className="back-btn" onClick={onBack} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white' }}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title" style={{ color: 'white' }}>Hazard Test</h2>
        <div style={{ width: '40px' }}></div>
      </header>
      
      <div 
        className="video-container" 
        onClick={handleTap}
        style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'relative' 
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1510903117015-f3977f87c547?auto=format&fit=crop&q=80&w=390&h=844" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
        />
        
        {!isPlaying && (
          <button className="play-btn" onClick={() => setIsPlaying(true)} style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
            <Play color="white" size={32} fill="white" />
          </button>
        )}
        
        {isPlaying && (
          <div style={{ position: 'absolute', bottom: '60px', left: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Pointer size={18} color="var(--primary)" />
              <p style={{ fontWeight: '800', fontSize: '14px' }}>Tap when you see a hazard!</p>
            </div>
            <div className="video-timeline" style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
              <div className="timeline-fill" style={{ height: '100%', background: 'var(--primary)', width: '35%', transition: 'width 1s linear' }}></div>
            </div>
          </div>
        )}
        
        {/* Click Indicators */}
        {clicks.map(click => (
          <div key={click.id} style={{ position: 'absolute', top: click.y - 20, left: click.x - 20, width: '40px', height: '40px', border: '3px solid var(--primary)', borderRadius: '50%', animation: 'ripple 0.5s ease-out forwards' }}></div>
        ))}
        
        <style>{`
          @keyframes ripple {
            0% { transform: scale(0.5); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default HazardPerceptionScreen;
