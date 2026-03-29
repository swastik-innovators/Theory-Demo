import React from 'react';
import { ChevronLeft, Clock, HelpCircle, Target, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import './screens.css';

const MockTestInstructionScreen = ({ testId = 1, onBack, onStart, vehicleType = 'car' }) => {
  const vehicleLabel = { car: 'Car', motorcycle: 'Motorcycle', lgv: 'LGV', pcv: 'PCV' }[vehicleType] || 'Car';

  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', background: 'var(--bg-main)' }}>
      <header className="screen-header" style={{ marginBottom: 16 }}>
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title">Mock Test {testId}</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="scroll-content" style={{ paddingBottom: 100 }}>
        {/* Title Card */}
        <div style={{
          textAlign: 'center',
          padding: '28px 20px',
          borderRadius: 22,
          background: 'linear-gradient(135deg, #4F8CFF 0%, #7B61FF 100%)',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15), transparent 60%)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{vehicleLabel} Theory</p>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 4 }}>Mock Test {testId}</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>DVSA Standard · 2026 Question Bank</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mti-stat-row">
          <div className="mti-stat" style={{ background: '#F0F5FF' }}>
            <p className="mti-stat-value" style={{ color: '#4F8CFF' }}>57</p>
            <p className="mti-stat-label" style={{ color: '#4F8CFF' }}>Minutes</p>
          </div>
          <div className="mti-stat" style={{ background: '#F0FFF4' }}>
            <p className="mti-stat-value" style={{ color: '#34C759' }}>50</p>
            <p className="mti-stat-label" style={{ color: '#34C759' }}>Questions</p>
          </div>
        </div>

        {/* Rules Card */}
        <div className="mti-card">
          <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Test Instructions</h4>

          <div className="mti-rule-item">
            <div className="mti-rule-icon" style={{ background: '#F0F5FF' }}>
              <Clock size={16} color="#4F8CFF" />
            </div>
            <p className="mti-rule-text">
              You have <strong>57 minutes</strong> to answer <strong>50 multiple choice</strong> driving theory test questions.
            </p>
          </div>

          <div className="mti-rule-item">
            <div className="mti-rule-icon" style={{ background: '#F0FFF4' }}>
              <Target size={16} color="#34C759" />
            </div>
            <p className="mti-rule-text">
              At least <strong>43 out of 50</strong> questions must be answered correctly in order to pass the test.
            </p>
          </div>

          <div className="mti-rule-item">
            <div className="mti-rule-icon" style={{ background: '#FFF8EE' }}>
              <HelpCircle size={16} color="#FF9500" />
            </div>
            <p className="mti-rule-text">
              Questions are from the <strong>latest 2026 question bank</strong>. Some questions may include images or road signs.
            </p>
          </div>

          <div className="mti-rule-item">
            <div className="mti-rule-icon" style={{ background: '#FFF5F5' }}>
              <AlertCircle size={16} color="#FF3B30" />
            </div>
            <p className="mti-rule-text">
              Answers may be reviewed after each question or you can wait until the end for your <strong>final score</strong>.
            </p>
          </div>

          <div className="mti-rule-item">
            <div className="mti-rule-icon" style={{ background: '#F0F0FF' }}>
              <CheckCircle2 size={16} color="#7B61FF" />
            </div>
            <p className="mti-rule-text">
              You can <strong>flag questions</strong> to review later before submitting your test. Good luck!
            </p>
          </div>
        </div>

        {/* Last Score (if applicable) */}
        <div className="mti-card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px' }}>
          <Zap size={20} color="var(--warning)" />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700 }}>Previous Best Score</p>
            <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>No attempts yet</p>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-tertiary)' }}>—</span>
        </div>
      </div>

      {/* Start Button */}
      <div style={{ padding: '16px 20px', position: 'sticky', bottom: 0, background: 'var(--bg-main)' }}>
        <button className="btn btn-primary" onClick={onStart} style={{ borderRadius: 16, fontSize: 16, padding: '16px 24px' }}>
          Start Mock Test
        </button>
      </div>
    </div>
  );
};

export default MockTestInstructionScreen;
