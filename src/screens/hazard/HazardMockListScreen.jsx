import React from 'react';
import { ChevronLeft, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import '../hazard.css';

const mockTests = [
  { id: 1, clips: 14, status: 'completed', score: 52, total: 75, date: '28 Mar' },
  { id: 2, clips: 14, status: 'completed', score: 58, total: 75, date: '26 Mar' },
  { id: 3, clips: 14, status: 'completed', score: 45, total: 75, date: '24 Mar' },
  { id: 4, clips: 14, status: 'unlocked', score: null, total: 75 },
  { id: 5, clips: 14, status: 'unlocked', score: null, total: 75 },
  { id: 6, clips: 14, status: 'locked', score: null, total: 75 },
  { id: 7, clips: 14, status: 'locked', score: null, total: 75 },
  { id: 8, clips: 14, status: 'locked', score: null, total: 75 },
  { id: 9, clips: 14, status: 'locked', score: null, total: 75 },
];

const HazardMockListScreen = ({ navigate, onBack }) => {
  const completed = mockTests.filter(t => t.status === 'completed').length;
  const bestScore = Math.max(...mockTests.filter(t => t.score).map(t => t.score), 0);

  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', background: 'var(--bg-main)' }}>
      <header className="screen-header" style={{ marginBottom: 16 }}>
        <button className="back-btn" onClick={onBack}><ChevronLeft size={20} /></button>
        <h2 className="screen-title">Hazard Mock Tests</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="scroll-content" style={{ paddingBottom: 100 }}>
        {/* Summary */}
        <div style={{
          padding: '18px', borderRadius: 18,
          background: 'linear-gradient(135deg, rgba(123,97,255,0.08), rgba(79,140,255,0.08))',
          border: '1px solid rgba(123,97,255,0.1)',
          marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <div style={{ position: 'relative', width: 52, height: 52 }}>
              <svg width={52} height={52} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="26" cy="26" r="22" stroke="#E5E5EA" strokeWidth="5" fill="none" />
                <circle cx="26" cy="26" r="22" stroke="#7B61FF" strokeWidth="5" fill="none"
                  strokeDasharray={138.2} strokeDashoffset={138.2 - (completed / 9) * 138.2}
                  strokeLinecap="round" />
              </svg>
              <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#7B61FF' }}>{completed}/9</span>
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800 }}>Tests Completed</p>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>14 clips per test · 75 marks total</p>
            </div>
          </div>
          {bestScore > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, background: bestScore >= 44 ? 'rgba(52,199,89,0.08)' : 'rgba(255,59,48,0.08)' }}>
              <span style={{ fontSize: 14 }}>🏆</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: bestScore >= 44 ? '#34C759' : '#FF3B30' }}>Best Score: {bestScore}/75 {bestScore >= 44 ? '(Pass!)' : '(Need 44+)'}</span>
            </div>
          )}
        </div>

        <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 0.5 }}>All Mock Tests</p>

        {/* Test Cards */}
        {mockTests.map((test) => {
          const passed = test.score && test.score >= 44;
          const isLocked = test.status === 'locked';

          return (
            <div
              key={test.id}
              className={`hz-mock-card ${isLocked ? 'locked' : ''}`}
              onClick={() => {
                if (!isLocked) navigate('hazard-mock-player', { testId: test.id });
              }}
            >
              <div className="hz-mock-num" style={{
                background: test.status === 'completed'
                  ? passed ? 'linear-gradient(135deg, #34C759, #30D158)' : 'linear-gradient(135deg, #FF3B30, #FF6B6B)'
                  : isLocked ? '#C7C7CC' : 'linear-gradient(135deg, #7B61FF, #4F8CFF)'
              }}>
                {isLocked ? <Lock size={16} /> : test.id}
              </div>
              <div className="hz-mock-info">
                <p className="hz-mock-title">Mock Test {test.id}</p>
                <p className="hz-mock-meta">
                  {test.status === 'completed'
                    ? `Score: ${test.score}/${test.total} · ${test.date}`
                    : isLocked ? 'Complete previous test to unlock' : `${test.clips} clips · ${test.total} marks`
                  }
                </p>
              </div>
              {test.status === 'completed' ? (
                <div style={{
                  padding: '5px 10px', borderRadius: 10,
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  background: passed ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)',
                  color: passed ? '#34C759' : '#FF3B30',
                }}>
                  {passed ? '✓ Pass' : '✗ Fail'}
                </div>
              ) : !isLocked ? (
                <ChevronRight size={18} color="#C7C7CC" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HazardMockListScreen;
