import React from 'react';
import { MOCK_TESTS } from '../data/mockData';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import './screens.css';

const MockTestListScreen = ({ navigate, onBack }) => {
  const completed = MOCK_TESTS.filter(t => t.status === 'completed').length;

  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', background: 'var(--bg-main)' }}>
      <header className="screen-header" style={{ marginBottom: 16 }}>
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title">Mock Tests</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="scroll-content" style={{ paddingBottom: 100 }}>
        {/* Progress Summary */}
        <div className="pt-summary" style={{ marginBottom: 20 }}>
          <div style={{ position: 'relative', width: 52, height: 52 }}>
            <svg width={52} height={52} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="26" cy="26" r="22" stroke="#F0F0F0" strokeWidth="5" fill="none" />
              <circle cx="26" cy="26" r="22" stroke="var(--primary)" strokeWidth="5" fill="none"
                strokeDasharray={138.2} strokeDashoffset={138.2 - (completed / MOCK_TESTS.length) * 138.2}
                strokeLinecap="round" />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>{completed}/{MOCK_TESTS.length}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 15, fontWeight: 800 }}>Tests Completed</p>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>{MOCK_TESTS.length} tests · 50 questions each · 57 min</p>
          </div>
        </div>

        {/* Tests List */}
        {MOCK_TESTS.map(test => (
          <div key={test.id} className="mtl-card" onClick={() => navigate('mock-instruction', { testId: test.id })}>
            <div className="mtl-number" style={{
              background: test.status === 'completed'
                ? 'linear-gradient(135deg, #34C759, #30D158)'
                : 'linear-gradient(135deg, #4F8CFF, #7B61FF)'
            }}>
              {test.id}
            </div>
            <div className="mtl-info">
              <p className="mtl-title">{test.title}</p>
              <p className="mtl-meta">
                {test.status === 'completed'
                  ? `Score: ${test.score}/${test.total} · ${test.time} · ${test.date}`
                  : `${test.total} questions · 57 min`
                }
              </p>
            </div>
            {test.status === 'completed' ? (
              <div className="mtl-badge" style={{
                background: test.score >= 43 ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)',
                color: test.score >= 43 ? '#34C759' : '#FF3B30',
              }}>
                {test.score >= 43 ? '✓ Pass' : '✗ Fail'}
              </div>
            ) : (
              <ChevronRight size={18} color="#C7C7CC" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockTestListScreen;
