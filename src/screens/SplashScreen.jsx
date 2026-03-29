import React, { useEffect } from 'react';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="screen splash-container" style={{ 
      background: 'var(--gradient-primary)', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      color: 'white'
    }}>
      <div className="splash-logo animate-scale-in" style={{ width: '120px', height: '120px', background: 'white', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        {/* Placeholder for real logo image */}
        <div style={{ fontSize: '40px' }}>🚗</div>
      </div>
      <h1 className="animate-fade-in" style={{ marginTop: '24px', fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px' }}>DVSA Theory</h1>
      <p className="animate-fade-in" style={{ opacity: 0.8, fontSize: '14px', marginTop: '8px' }}>Success is just a drive away</p>
      
      <div className="loading-bar-container" style={{ position: 'absolute', bottom: '100px', width: '200px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
        <div className="loading-bar" style={{ height: '100%', background: 'white', width: '60%', transition: 'width 2s' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
