import React from 'react';
import { ChevronLeft, TrendingUp, Target, Zap, Calendar, Award } from 'lucide-react';
import './screens.css';

const ProgressScreen = ({ onBack }) => {
  return (
    <div className="screen pg-container animate-fade-in" style={{ background: '#F2F2F7' }}>
      <header className="pg-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title">Detailed Analytics</h2>
        <div style={{ width: '40px' }} />
      </header>
      
      <div className="scroll-content pg-content" style={{ padding: '0 20px 120px' }}>
        
        {/* 1. OVERALL CIRCULAR HERO */}
        <div className="pg-hero-card">
          <div className="pg-hero-main">
            <div className="pg-hero-ring-wrap">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="none" />
                <circle cx="60" cy="60" r="54" stroke="white" strokeWidth="10" fill="none"
                  strokeDasharray="339.3" strokeDashoffset="101.8" strokeLinecap="round" />
              </svg>
              <div className="pg-hero-text">
                <h3>70%</h3>
                <p>READY</p>
              </div>
            </div>
            <div className="pg-hero-stats">
              <div className="pg-hero-stat-item">
                <TrendingUp size={16} />
                <span>+12% than average</span>
              </div>
              <p className="pg-hero-sub">You're on track to pass by April 12th!</p>
            </div>
          </div>
          <div className="pg-hero-glass-overlay" />
        </div>

        {/* 2. ACTIVITY BAR CHART */}
        <div className="pg-section">
          <div className="pg-section-header">
             <h3>Weekly Activity</h3>
             <Calendar size={16} color="var(--text-tertiary)" />
          </div>
          <div className="pg-chart-card">
             <div className="pg-chart-bars">
                {[
                  { d: 'M', h: 40 }, { d: 'T', h: 65 }, { d: 'W', h: 30 }, 
                  { d: 'T', h: 85, a: true }, { d: 'F', h: 45 }, { d: 'S', h: 20 }, { d: 'S', h: 0 }
                ].map((b, i) => (
                  <div key={i} className="pg-chart-bar-wrap">
                    <div className={`pg-chart-bar ${b.a ? 'active' : ''}`} style={{ height: `${b.h}%` }} />
                    <span>{b.d}</span>
                  </div>
                ))}
             </div>
             <div className="pg-chart-info">
                <div>
                   <p className="pg-chart-label">Best Day</p>
                   <p className="pg-chart-value">Thursday</p>
                </div>
                <div>
                   <p className="pg-chart-label">Avg/Day</p>
                   <p className="pg-chart-value">42 min</p>
                </div>
             </div>
          </div>
        </div>

        {/* 3. TOPIC BREAKDOWN */}
        <div className="pg-section">
          <div className="pg-section-header">
             <h3>Knowledge Areas</h3>
             <button className="pg-text-btn">View All</button>
          </div>
          <div className="pg-card">
            {[
              { name: 'Road Signs', score: 88, color: '#34C759', icon: '🛑' },
              { name: 'Hazard Awareness', score: 45, color: '#FF9500', icon: '⚠️' },
              { name: 'Motorway Rules', score: 72, color: '#4F8CFF', icon: '🛣️' },
              { name: 'Vehicle Safety', score: 33, color: '#FF3B30', icon: '🔧' }
            ].map((topic, i) => (
              <div key={i} className="pg-topic-row">
                <div className="pg-topic-icon" style={{ background: `${topic.color}15` }}>{topic.icon}</div>
                <div className="pg-topic-main">
                  <div className="pg-topic-header">
                    <span className="pg-topic-name">{topic.name}</span>
                    <span className="pg-topic-score" style={{ color: topic.color }}>{topic.score}%</span>
                  </div>
                  <div className="pg-topic-bar-bg">
                    <div className="pg-topic-bar-fill" style={{ width: `${topic.score}%`, background: topic.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ACHIEVEMENTS PREVIEW */}
        <div className="pg-section">
           <div className="pg-section-header">
             <h3>Achievements</h3>
             <Award size={16} color="var(--text-tertiary)" />
           </div>
           <div className="pg-ach-row">
              <div className="pg-ach-item unlocked">
                 <div className="pg-ach-icon">🔥</div>
                 <span>5 Day Streak</span>
              </div>
              <div className="pg-ach-item unlocked">
                 <div className="pg-ach-icon">🎯</div>
                 <span>Quick Learner</span>
              </div>
              <div className="pg-ach-item locked">
                 <div className="pg-ach-icon">🏆</div>
                 <span>Mock Master</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProgressScreen;

