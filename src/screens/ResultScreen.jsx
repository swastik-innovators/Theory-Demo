import React from 'react';
import { ChevronLeft, CheckCircle2, XCircle, ChevronRight, Home, RotateCcw, X as XIcon, Info, Share2, Award, ClipboardList } from 'lucide-react';
import './screens.css';

const ResultScreen = ({ navigate, onBack, score = 43, total = 50, answers = [] }) => {
  const pass = score >= 43;
  const scorePercent = Math.round((score / total) * 100);

  // Mock answers if none provided
  const displayAnswers = answers.length > 0 ? answers : [
    { questionIdx: 0, questionText: "Speed limit on a motorway for cars?", correct: true, explanation: "70 mph." },
    { questionIdx: 1, questionText: "Blue circular sign meaning?", correct: false, explanation: "Mandatory requirement." },
    { questionIdx: 2, questionText: "Red triangular sign meaning?", correct: true, explanation: "Warning." },
    { questionIdx: 3, questionText: "What to do if vehicle breakdown on motorway?", correct: true, explanation: "Pull over to hard shoulder." },
    { questionIdx: 4, questionText: "Diamond sign indicates?", correct: false, explanation: "Trams." },
  ];

  return (
    <div className="screen animate-fade-in rs-container" style={{ padding: 0, background: '#F2F2F7' }}>
      <header className="rs-header">
        <button className="back-btn" onClick={onBack}><XIcon size={20} /></button>
        <h2 className="screen-title">Test Result</h2>
        <button className="back-btn" style={{ background: 'none' }}><Share2 size={20} color="var(--primary)" /></button>
      </header>

      <div className="scroll-content rs-content" style={{ paddingBottom: 120 }}>
        {/* Pass/Fail Hero */}
        <div className={`rs-hero-card ${pass ? 'pass' : 'fail'}`}>
          <div className="rs-hero-circle">
            <h1 className="rs-hero-score-num">{score}</h1>
            <span className="rs-hero-score-total">/{total}</span>
          </div>
          <div className="rs-hero-text">
            <h2 className="rs-hero-status">{pass ? 'PASSED' : 'FAILED'}</h2>
            <p className="rs-hero-desc">{pass ? 'Excellent! You are test-ready.' : 'You need 43 correct answers to pass.'}</p>
          </div>
          <div className="rs-hero-glow" />
        </div>

        {/* Stats Summary */}
        <div className="rs-stats-row">
           <div className="rs-mini-stat">
              <span className="rs-mini-label">Accuracy</span>
              <h4 className="rs-mini-val" style={{ color: pass ? '#34C759' : '#FF3B30' }}>{scorePercent}%</h4>
           </div>
           <div className="rs-mini-stat">
              <span className="rs-mini-label">Time</span>
              <h4 className="rs-mini-val">42:15</h4>
           </div>
           <div className="rs-mini-stat">
              <span className="rs-mini-label">Level</span>
              <h4 className="rs-mini-val">{pass ? 'Pro' : 'Starter'}</h4>
           </div>
        </div>

        {/* Reward Card */}
        {pass && (
          <div className="rs-reward-card">
            <Award size={24} color="#FF9500" fill="rgba(255,149,0,0.1)" />
            <div className="rs-reward-info">
              <h4>Achievement Unlocked!</h4>
              <p>You earned the 'Test Ready' badge for score over 85%.</p>
            </div>
            <ChevronRight size={18} color="#C7C7CC" />
          </div>
        )}

        {/* Detailed Review */}
        <div className="rs-section-header">
           <h3 className="rs-section-title">Review Answers</h3>
           <span className="rs-section-badge">{displayAnswers.length} Total</span>
        </div>

        <div className="rs-review-group">
          {displayAnswers.map((a, i) => (
            <div key={i} className={`rs-review-card ${a.correct ? 'correct' : 'wrong'}`}>
              <div className="rs-review-top">
                <span className="rs-review-num">Question {i + 1}</span>
                {a.correct ? <CheckCircle2 size={18} color="#34C759" /> : <XCircle size={18} color="#FF3B30" />}
              </div>
              <p className="rs-review-q">{a.questionText}</p>
              {!a.correct && (
                <div className="rs-review-xp">
                  <div className="rs-xp-header"><Info size={12} /> Explanation</div>
                  <p>{a.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rs-footer">
        <button className="rs-btn-home" onClick={() => navigate('home')}>
          <Home size={18} /> Home
        </button>
        <button className="rs-btn-retry" onClick={() => navigate('mocktest')}>
          <RotateCcw size={18} /> Try Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
