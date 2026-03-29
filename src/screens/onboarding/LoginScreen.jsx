import React from 'react';
import './onboarding.css';

const LoginScreen = ({ onNext, onBack }) => {
  return (
    <div className="ob-screen ob-login">
      <div className="ob-progress-bar">
        <div className="ob-progress-fill" style={{ width: '71%' }}></div>
      </div>

      <div className="ob-top-actions">
        <button className="ob-btn-back-sm" onClick={onBack}>&larr;</button>
        <button className="ob-skip-btn" onClick={() => onNext(null)}>Skip</button>
      </div>

      <div className="ob-content login-content">
        <div className="login-hero">
          <div className="login-avatar-ring">
            <div className="login-avatar-placeholder">👤</div>
          </div>
          <h1 className="ob-title">Continue your journey</h1>
          <p className="ob-subtitle">Sign in to sync progress and learn across devices</p>
        </div>

        <div className="login-btns">
          <button className="social-btn google" onClick={() => onNext('google')}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="20" height="20" alt="Google" />
            Continue with Google
          </button>

          <button className="social-btn apple" onClick={() => onNext('apple')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            Continue with Apple
          </button>
        </div>

        <div className="login-divider">
          <div className="login-divider-line"></div>
          <span>or</span>
          <div className="login-divider-line"></div>
        </div>

        <button className="social-btn email" onClick={() => onNext(null)}>
          ✉️ Continue with Email
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
