import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Film, Clapperboard } from 'lucide-react';
import '../hazard.css';

const categories = [
  {
    id: 'cgi',
    title: 'CGI Training',
    sub: 'High clarity simulated hazards',
    emoji: '🎮',
    videoCount: 30,
    gradient: 'linear-gradient(135deg, #4F8CFF 0%, #7B61FF 100%)',
    completed: 18,
    icon: Sparkles,
  },
  {
    id: 'hd',
    title: 'Real HD Clips',
    sub: 'Real-world driving scenarios',
    emoji: '🎬',
    videoCount: 28,
    gradient: 'linear-gradient(135deg, #00C9A7 0%, #00B4D8 100%)',
    completed: 10,
    icon: Film,
  },
  {
    id: 'sd',
    title: 'Standard Clips',
    sub: 'Basic practice videos',
    emoji: '📹',
    videoCount: 24,
    gradient: 'linear-gradient(135deg, #FF9500 0%, #FF6B6B 100%)',
    completed: 4,
    icon: Clapperboard,
  },
];

const HazardCategoryScreen = ({ navigate, onBack }) => {
  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', background: 'var(--bg-main)' }}>
      <header className="screen-header" style={{ marginBottom: 16 }}>
        <button className="back-btn" onClick={onBack}><ChevronLeft size={20} /></button>
        <h2 className="screen-title">Choose Practice Type</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="scroll-content" style={{ paddingBottom: 100 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 20 }}>
          Select a video category to begin your hazard perception training.
        </p>

        {categories.map((cat) => {
          const progress = Math.round((cat.completed / cat.videoCount) * 100);
          return (
            <div
              key={cat.id}
              className="hz-cat-card"
              onClick={() => navigate('hazard-video-list', { categoryId: cat.id })}
            >
              <div className="hz-cat-thumb">
                <div className="hz-cat-thumb-bg" style={{ background: cat.gradient }}>
                  <span style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>{cat.emoji}</span>
                </div>
              </div>
              <div className="hz-cat-info">
                <p className="hz-cat-title">{cat.title}</p>
                <p className="hz-cat-sub">{cat.sub}</p>
                <div className="hz-cat-meta">
                  <span className="hz-cat-count">{cat.videoCount} videos</span>
                  <div style={{ flex: 1, height: 4, background: '#F0F0F0', borderRadius: 2, overflow: 'hidden', maxWidth: 60 }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: cat.gradient, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)' }}>{progress}%</span>
                </div>
              </div>
              <ChevronRight size={18} color="#C7C7CC" />
            </div>
          );
        })}

        {/* Total Videos */}
        <div style={{
          marginTop: 20, padding: '16px 20px', borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(79,140,255,0.06), rgba(123,97,255,0.06))',
          border: '1px solid rgba(79,140,255,0.08)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', marginBottom: 2 }}>82</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)' }}>Total Practice Videos Available</p>
        </div>
      </div>
    </div>
  );
};

export default HazardCategoryScreen;
