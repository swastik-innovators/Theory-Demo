import React, { useState } from 'react';
import './onboarding.css';

const NameInputScreen = ({ onNext, onBack }) => {
  const [name, setName] = useState('');

  return (
    <div className="ob-screen ob-name">
      <div className="ob-progress-bar">
        <div className="ob-progress-fill" style={{ width: '85%' }}></div>
      </div>

      <div className="ob-content name-content">
        <div className="ob-header">
          <div className="name-avatar-wrap">
            <div className="name-avatar">
              {name ? name[0].toUpperCase() : '😊'}
            </div>
          </div>
          <h1 className="ob-title">What should we call you?</h1>
          <p className="ob-subtitle">This helps us personalise your experience</p>
        </div>

        <div className="name-input-wrap">
          <input
            type="text"
            className="name-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
      </div>

      <div className="ob-footer">
        <button className="ob-btn-back" onClick={onBack}>Back</button>
        <button
          className={`ob-btn-primary ${!name.trim() ? 'disabled' : ''}`}
          disabled={!name.trim()}
          onClick={() => name.trim() && onNext(name.trim())}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default NameInputScreen;
