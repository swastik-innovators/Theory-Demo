import React, { useState } from 'react';

const AuthScreen = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="screen auth-container animate-fade-in" style={{ background: '#F2F2F7', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="form-container" style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-1px' }}>{isLogin ? 'Welcome Back!' : 'Join the Club!'}</h1>
        <p style={{ color: 'var(--text-tertiary)', marginBottom: '32px', fontSize: '15px' }}>Let's get you ready for the road.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input className="input-field" type="email" placeholder="Email Address" style={{ background: 'white', border: 'none', padding: '16px', borderRadius: '16px', fontSize: '16px', boxShadow: 'var(--shadow-sm)' }} />
          <input className="input-field" type="password" placeholder="Password" style={{ background: 'white', border: 'none', padding: '16px', borderRadius: '16px', fontSize: '16px', boxShadow: 'var(--shadow-sm)' }} />
          
          <button className="btn btn-primary" onClick={onLogin} style={{ marginTop: '8px' }}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#E5E5EA' }}></div>
          <span style={{ padding: '0 16px', color: 'var(--text-tertiary)', fontSize: '14px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#E5E5EA' }}></div>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-secondary" style={{ border: '1px solid #E5E5EA', color: 'black', background: 'white', gap: '12px' }}>
            <img src="https://www.google.com/favicon.ico" width="16" /> Google
          </button>
          <button className="btn btn-secondary" style={{ border: '1px solid #E5E5EA', color: 'black', background: 'white', gap: '12px' }}>
             Apple
          </button>
        </div>
      </div>
      
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
