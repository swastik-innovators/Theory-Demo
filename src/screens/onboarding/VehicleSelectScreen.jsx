import React, { useState } from 'react';
import './onboarding.css';

const vehicles = [
  { id: 'car', label: 'Car', emoji: '🚗', image: '/car.png', color: '#4F8CFF' },
  { id: 'motorcycle', label: 'Motorcycle', emoji: '🏍️', image: '/motorcycle.png', color: '#7B61FF' },
  { id: 'lgv', label: 'LGV', emoji: '🚛', image: '/lgv.png', color: '#00C9A7' },
  { id: 'pcv', label: 'PCV', emoji: '🚌', image: '/pcv.png', color: '#FF9500' },
];

const VehicleSelectScreen = ({ onNext, onSkip }) => {

  const [selected, setSelected] = useState(null);

  return (
    <div className="ob-screen ob-vehicle">
      {/* Progress */}
      <div className="ob-progress-bar">
        <div className="ob-progress-fill" style={{ width: '14%' }}></div>
      </div>

      <div className="ob-content">
        <div className="ob-header">
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
             <span className="ob-step-badge">Step 1 of 7</span>
             <button onClick={onSkip} style={{ background: 'none', border: 'none', color: '#8E8E93', fontSize: '13px', fontWeight: '700', cursor: 'pointer', padding: '4px 8px' }}>
               Skip All
             </button>
           </div>
           <h1 className="ob-title">Choose Your Vehicle</h1>
           <p className="ob-subtitle">Select the category you're preparing for</p>
        </div>


        <div className="vehicle-grid">
          {vehicles.map((v) => (
            <button
              key={v.id}
              className={`vehicle-card ${selected === v.id ? 'selected' : ''}`}
              onClick={() => setSelected(v.id)}
              style={{
                '--card-glow': v.color,
              }}
            >
              <div className="vehicle-img-wrap">
                <img src={v.image} alt={v.label} className="vehicle-img" />
              </div>
              <span className="vehicle-label">{v.label}</span>
              {selected === v.id && (
                <div className="vehicle-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="ob-footer">
        <button
          className={`ob-btn-primary ${!selected ? 'disabled' : ''}`}
          disabled={!selected}
          onClick={() => selected && onNext(selected)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default VehicleSelectScreen;
