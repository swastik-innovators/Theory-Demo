import React from 'react';
import { ChevronLeft, Play, ChevronRight, Eye, Shield, Award, Zap, Video, ClipboardList } from 'lucide-react';
import '../hazard.css';

const HazardHomeScreen = ({ navigate, onBack }) => {
  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', background: 'var(--bg-main)' }}>
      {/* Header */}
      <header className="screen-header" style={{ marginBottom: 16 }}>
        <button className="back-btn" onClick={onBack}><ChevronLeft size={20} /></button>
        <h2 className="screen-title">Hazard Perception</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="scroll-content" style={{ paddingBottom: 100 }}>
        {/* Intro Text */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Train your eyes to spot developing hazards on the road. Practice with videos and take mock tests.
          </p>
        </div>

        {/* Overall Score Summary */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '16px', borderRadius: 18,
          background: 'linear-gradient(135deg, rgba(79,140,255,0.08), rgba(123,97,255,0.08))',
          border: '1px solid rgba(79,140,255,0.1)',
          marginBottom: 20,
        }}>
          <div style={{ position: 'relative', width: 52, height: 52 }}>
            <svg width={52} height={52} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="26" cy="26" r="22" stroke="#E5E5EA" strokeWidth="5" fill="none" />
              <circle cx="26" cy="26" r="22" stroke="#4F8CFF" strokeWidth="5" fill="none"
                strokeDasharray={138.2} strokeDashoffset={138.2 - (0.69) * 138.2}
                strokeLinecap="round" />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#4F8CFF' }}>69%</span>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800 }}>Overall Progress</p>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>Best score: 52/75 · 3 tests completed</p>
          </div>
        </div>

        {/* ── Practice Videos Card ── */}
        <div className="hz-hero-card" onClick={() => navigate('hazard-categories')}>
          <div style={{
            width: '100%', aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Decorative road lines */}
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 4, height: '60%', background: 'rgba(255,255,255,0.15)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 30px)', width: 3, height: '40%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 'calc(50% + 30px)', width: 3, height: '40%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ fontSize: 56, filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}>🚗</div>
          </div>
          <div className="hz-hero-gradient" />
          <div className="hz-hero-content">
            <p className="hz-hero-label">Practice</p>
            <h3 className="hz-hero-title">Practice Videos</h3>
            <p className="hz-hero-sub">80+ videos across CGI, HD & SD categories</p>
            <button className="hz-hero-cta" style={{ background: 'white', color: '#1a1a1a' }} onClick={(e) => { e.stopPropagation(); navigate('hazard-categories'); }}>
              <Play size={14} fill="#1a1a1a" /> Start Practice
            </button>
          </div>
        </div>

        {/* ── Mock Tests Card ── */}
        <div className="hz-hero-card" onClick={() => navigate('hazard-mock-list')}>
          <div style={{
            width: '100%', aspectRatio: '16/9',
            background: 'linear-gradient(135deg, #1a0533 0%, #3b1f6e 50%, #5b2d99 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Decorative circles */}
            <div style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', top: -40, right: -40 }} />
            <div style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)', bottom: -30, left: -30 }} />
            <div style={{ fontSize: 56, filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }}>🎯</div>
          </div>
          <div className="hz-hero-gradient" />
          <div className="hz-hero-content">
            <p className="hz-hero-label">Assessment</p>
            <h3 className="hz-hero-title">Mock Tests</h3>
            <p className="hz-hero-sub">9 full tests · 75 marks each · Simulate real exam</p>
            <button className="hz-hero-cta" style={{ background: 'linear-gradient(135deg, #7B61FF, #4F8CFF)', color: 'white' }} onClick={(e) => { e.stopPropagation(); navigate('hazard-mock-list'); }}>
              <ClipboardList size={14} /> Start Test
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 6 }}>
          <div style={{ textAlign: 'center', padding: '14px 8px', borderRadius: 14, background: 'var(--bg-card)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#4F8CFF', marginBottom: 2 }}>32</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Watched</p>
          </div>
          <div style={{ textAlign: 'center', padding: '14px 8px', borderRadius: 14, background: 'var(--bg-card)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#34C759', marginBottom: 2 }}>4.2</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Avg Stars</p>
          </div>
          <div style={{ textAlign: 'center', padding: '14px 8px', borderRadius: 14, background: 'var(--bg-card)', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: '#7B61FF', marginBottom: 2 }}>3/9</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Tests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardHomeScreen;
