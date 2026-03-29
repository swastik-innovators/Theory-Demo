import React from 'react';
import { TOPICS } from '../data/mockData';
import { ChevronLeft, Lock, ChevronRight } from 'lucide-react';
import './screens.css';

const PracticeTopicsScreen = ({ navigate, onBack }) => {
  const totalProgress = Math.round(TOPICS.reduce((a, t) => a + t.progress, 0) / TOPICS.length);

  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', background: 'var(--bg-main)' }}>
      <header className="screen-header" style={{ marginBottom: '16px' }}>
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title">Practice Topics</h2>
        <div style={{ width: '40px' }}></div>
      </header>

      <div className="scroll-content" style={{ paddingBottom: '100px' }}>
        {/* Overall Progress Summary */}
        <div className="pt-summary">
          <div style={{ position: 'relative', width: 52, height: 52 }}>
            <svg width={52} height={52} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="26" cy="26" r="22" stroke="#F0F0F0" strokeWidth="5" fill="none" />
              <circle cx="26" cy="26" r="22" stroke="var(--primary)" strokeWidth="5" fill="none"
                strokeDasharray={138.2} strokeDashoffset={138.2 - (totalProgress / 100) * 138.2}
                strokeLinecap="round" />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>{totalProgress}%</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 800 }}>Overall Progress</p>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>{TOPICS.length} topics · {TOPICS.reduce((a, t) => a + t.count, 0)} questions</p>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="pt-grid">
          {TOPICS.map(topic => (
            <div
              key={topic.id}
              className="pt-card"
              onClick={() => navigate('question', { topicId: topic.id })}
            >
              <div className="pt-card-icon" style={{ background: `${topic.color}15` }}>
                {topic.icon}
              </div>
              <div className="pt-card-info">
                <p className="pt-card-name">{topic.name}</p>
                <div className="pt-card-progress">
                  <div className="pt-card-progress-fill" style={{ width: `${topic.progress}%`, background: topic.color }} />
                </div>
                <p className="pt-card-meta">{topic.progress}% · {topic.count}Q</p>
              </div>
              {!topic.free && <span className="pt-lock-badge">🔒</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeTopicsScreen;
