import React, { useState, useMemo } from 'react';
import { PRACTICE_QUESTIONS } from '../data/mockData';
import { ChevronLeft, Info, CheckCircle2, XCircle, RotateCcw, Home, Trophy, Target, X as XIcon } from 'lucide-react';
import './screens.css';

const LETTERS = ['A', 'B', 'C', 'D'];

const QuestionScreen = ({ onFinish, onBack, topicId }) => {
  const questions = useMemo(() => {
    return PRACTICE_QUESTIONS[topicId] || PRACTICE_QUESTIONS.default;
  }, [topicId]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]); // { questionIdx, selectedIdx, correct }
  const [showScore, setShowScore] = useState(false);

  const question = questions[currentIdx];
  const totalQ = questions.length;
  const progress = ((currentIdx + 1) / totalQ) * 100;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    setAnswers(prev => [...prev, {
      questionIdx: currentIdx,
      selectedIdx: idx,
      correct: idx === question.correct,
      questionText: question.text,
    }]);
  };

  const handleNext = () => {
    if (currentIdx < totalQ - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const correctCount = answers.filter(a => a.correct).length;
  const wrongCount = answers.filter(a => !a.correct).length;
  const scorePercent = Math.round((correctCount / totalQ) * 100);
  const passed = scorePercent >= 70;

  /* ─── SCORE SCREEN ─── */
  if (showScore) {
    return (
      <div className="screen animate-fade-in rs-container" style={{ padding: 0 }}>
        {/* Header */}
        <header className="screen-header" style={{ padding: '20px', marginBottom: 0 }}>
          <button className="back-btn" onClick={onBack}><XIcon size={20} /></button>
          <h2 className="screen-title">Practice Result</h2>
          <div style={{ width: 40 }} />
        </header>

        <div className="scroll-content" style={{ paddingBottom: 32 }}>
          {/* Hero */}
          <div className="rs-hero">
            <div className="rs-badge">
              <div className="rs-badge-ring" style={{ background: passed ? 'linear-gradient(135deg, #34C759, #30D158)' : 'linear-gradient(135deg, #FF3B30, #FF6B6B)' }} />
              <div className="rs-badge-inner">
                <span className="rs-badge-score" style={{ color: passed ? '#34C759' : '#FF3B30' }}>{correctCount}</span>
                <span className="rs-badge-total">/{totalQ}</span>
              </div>
            </div>
            <p className="rs-status" style={{ color: passed ? '#34C759' : '#FF3B30' }}>
              {passed ? '🎉 Well Done!' : '💪 Keep Practising!'}
            </p>
            <p className="rs-status-sub">
              {passed ? 'You scored above 70% – great knowledge!' : 'Try again to improve your score.'}
            </p>
          </div>

          {/* Stats */}
          <div className="rs-stats-row">
            <div className="rs-stat-item">
              <p className="rs-stat-num" style={{ color: '#34C759' }}>{correctCount}</p>
              <p className="rs-stat-label">Correct</p>
            </div>
            <div className="rs-stat-item">
              <p className="rs-stat-num" style={{ color: '#FF3B30' }}>{wrongCount}</p>
              <p className="rs-stat-label">Wrong</p>
            </div>
            <div className="rs-stat-item">
              <p className="rs-stat-num" style={{ color: 'var(--primary)' }}>{scorePercent}%</p>
              <p className="rs-stat-label">Score</p>
            </div>
          </div>

          {/* Review */}
          <div style={{ padding: '0 20px', marginBottom: 16 }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Review Answers</h4>
          </div>
          <div className="rs-review-list">
            {answers.map((a, i) => (
              <div key={i} className="rs-review-item">
                <div className="rs-review-num" style={{ background: a.correct ? '#34C759' : '#FF3B30' }}>
                  {i + 1}
                </div>
                <p className="rs-review-text">{a.questionText}</p>
                <div className="rs-review-icon">
                  {a.correct
                    ? <CheckCircle2 size={20} color="#34C759" />
                    : <XCircle size={20} color="#FF3B30" />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{ padding: '16px 20px', display: 'flex', gap: 10, background: 'var(--bg-main)' }}>
          <button className="btn" onClick={onBack}
            style={{ flex: 1, background: '#F2F2F7', color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, padding: '14px 16px', borderRadius: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Home size={18} /> Home
          </button>
          <button className="btn btn-primary" onClick={() => { setCurrentIdx(0); setSelected(null); setShowExplanation(false); setAnswers([]); setShowScore(false); }}
            style={{ flex: 1.4, fontSize: 14, padding: '14px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <RotateCcw size={18} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ─── QUESTION SCREEN ─── */
  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', position: 'relative' }}>
      <header className="screen-header" style={{ marginBottom: 20 }}>
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <div className="qs-progress-wrap">
          <div className="qs-progress-bar">
            <div className="qs-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="qs-counter">{currentIdx + 1}/{totalQ}</span>
        </div>
      </header>

      <div className="scroll-content" style={{ paddingBottom: 80 }}>
        {/* Question */}
        <h3 className="qs-question-text">{question.text}</h3>

        {/* Image (if road sign / image question) */}
        {question.image && (
          <div className="qs-image-wrap">
            <img src={question.image} alt="Question visual" />
          </div>
        )}

        {/* Options */}
        <div className="qs-options">
          {question.options.map((opt, idx) => {
            let cls = 'qs-option';
            if (selected !== null) {
              if (idx === question.correct) cls += ' correct';
              else if (idx === selected) cls += ' wrong';
            }
            return (
              <div key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="qs-option-letter">{LETTERS[idx]}</span>
                <span className="qs-option-text">{opt}</span>
                {selected !== null && idx === question.correct && (
                  <CheckCircle2 size={20} color="#34C759" className="qs-option-icon" />
                )}
                {selected !== null && idx === selected && idx !== question.correct && (
                  <XCircle size={20} color="#FF3B30" className="qs-option-icon" />
                )}
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="qs-explanation">
            <h5><Info size={14} /> Explanation</h5>
            <p>{question.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {selected !== null && (
          <div className="qs-next-btn">
            <button className="btn btn-primary" onClick={handleNext}
              style={{ borderRadius: 14, fontSize: 15 }}>
              {currentIdx < totalQ - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen;
