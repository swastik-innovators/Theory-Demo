import React from 'react';
import { ACHIEVEMENTS } from '../data/mockData';
import { ChevronLeft, Award, Lock, CheckCircle2 } from 'lucide-react';

const AchievementScreen = ({ onBack }) => {
  return (
    <div className="screen achievements-container animate-fade-in" style={{ padding: '24px' }}>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title">Achievements</h2>
        <div style={{ width: '40px' }}></div>
      </header>
      
      <div className="scroll-content">
        {/* User Level */}
        <div className="card" style={{ textAlign: 'center', padding: '32px', marginBottom: '32px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
             <Award size={24} color="var(--warning)" />
          </div>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800', margin: '0 auto 16px', border: '5px solid #F2F2F7', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
            8
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>Level 8 - Road Pro</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '20px' }}>1,250 / 1,500 XP to next level</p>
          <div style={{ height: '10px', background: '#F2F2F7', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--gradient-primary)', width: '75%' }}></div>
          </div>
        </div>
        
        {/* Badges List */}
        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>My Badges</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {ACHIEVEMENTS.map(badge => (
            <div key={badge.id} className="card" style={{ 
              opacity: badge.unlocked ? 1 : 0.6, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center', 
              padding: '24px',
              border: badge.unlocked ? '1px solid rgba(79, 140, 255, 0.2)' : '1px solid #E5E5EA'
            }}>
              <div style={{ 
                fontSize: '40px', 
                marginBottom: '12px', 
                filter: badge.unlocked ? 'none' : 'grayscale(1)',
                position: 'relative'
              }}>
                {badge.icon}
                {!badge.unlocked && <Lock size={16} color="var(--text-tertiary)" style={{ position: 'absolute', bottom: '0', right: '0' }} />}
              </div>
              <h5 style={{ fontWeight: '800', marginBottom: '4px', fontSize: '15px' }}>{badge.name}</h5>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', lineHeight: '1.4' }}>{badge.description}</p>
              {badge.unlocked && <CheckCircle2 size={16} color="var(--success)" style={{ marginTop: '8px' }} />}
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ height: '100px' }}></div>
    </div>
  );
};

export default AchievementScreen;
