import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_TEST_QUESTIONS } from '../data/mockData';
import { ChevronLeft, Clock, Flag, CheckCircle2, XCircle, Info, Home, RotateCcw, X as XIcon, ChevronRight } from 'lucide-react';
import './screens.css';

const LETTERS = ['A', 'B', 'C', 'D'];

const MockTestScreen = ({ onFinish, onBack, testId = 1 }) => {
  const questions = useMemo(() => MOCK_TEST_QUESTIONS, []);
  const totalQ = questions.length;

  const [timeLeft, setTimeLeft] = useState(57 * 60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [flagged, setFlagged] = useState([]);
  const [answers, setAnswers] = useState({}); // { idx: selectedOption }
  const [showResult, setShowResult] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(null);

  useEffect(() => {
    if (showResult) return;
    const timer = setInterval(() => {
      setTimeLeft(p => p > 0 ? p - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const question = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;

  const handleSelect = (idx) => {
    if (answers[currentIdx] !== undefined) return;
    setSelected(idx);
    setAnswers(prev => ({ ...prev, [currentIdx]: idx }));
  };

  const handleNext = () => {
    if (currentIdx < totalQ - 1) {
      setCurrentIdx(p => p + 1);
      setSelected(null);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(p => p - 1);
      setSelected(null);
    }
  };

  const handleSubmit = () => setShowResult(true);

  const toggleFlag = () => {
    setFlagged(prev =>
      prev.includes(currentIdx)
        ? prev.filter(i => i !== currentIdx)
        : [...prev, currentIdx]
    );
  };

  // Calculate results
  const correctCount = Object.entries(answers).filter(([qi, si]) => questions[parseInt(qi)].correct === si).length;
  const wrongCount = Object.entries(answers).filter(([qi, si]) => questions[parseInt(qi)].correct !== si).length;
  const unanswered = totalQ - answeredCount;
  const passed = correctCount >= Math.ceil(totalQ * 0.86); // 43/50
  const scorePercent = Math.round((correctCount / totalQ) * 100);

  /* ─── REVIEW SINGLE QUESTION ─── */
  if (reviewIdx !== null) {
    const rq = questions[reviewIdx];
    const userAnswer = answers[reviewIdx];
    return (
      <div className="screen animate-fade-in" style={{ padding: 20 }}>
        <header className="screen-header" style={{ marginBottom: 20 }}>
          <button className="back-btn" onClick={() => setReviewIdx(null)}><ChevronLeft size={20} /></button>
          <h2 className="screen-title" style={{ fontSize: 16 }}>Q{reviewIdx + 1} Review</h2>
          <div style={{ width: 40 }} />
        </header>
        <div className="scroll-content">
          <h3 className="qs-question-text">{rq.text}</h3>
          {rq.image && <div className="qs-image-wrap"><img src={rq.image} alt="Q" /></div>}
          <div className="qs-options">
            {rq.options.map((opt, idx) => {
              let cls = 'qs-option';
              if (idx === rq.correct) cls += ' correct';
              else if (idx === userAnswer && idx !== rq.correct) cls += ' wrong';
              return (
                <div key={idx} className={cls}>
                  <span className="qs-option-letter">{LETTERS[idx]}</span>
                  <span className="qs-option-text">{opt}</span>
                  {idx === rq.correct && <CheckCircle2 size={20} color="#34C759" />}
                  {idx === userAnswer && idx !== rq.correct && <XCircle size={20} color="#FF3B30" />}
                </div>
              );
            })}
          </div>
          <div className="qs-explanation" style={{ marginTop: 16 }}>
            <h5><Info size={14} /> Explanation</h5>
            <p>{rq.explanation}</p>
          </div>
        </div>
      </div>
    );
  }

  /* ─── RESULT SCREEN ─── */
  if (showResult) {
    return (
      <div className="screen animate-fade-in rs-container" style={{ padding: 0 }}>
        <header className="screen-header" style={{ padding: '20px', marginBottom: 0 }}>
          <button className="back-btn" onClick={onBack}><XIcon size={20} /></button>
          <h2 className="screen-title">Mock Test {testId} Result</h2>
          <div style={{ width: 40 }} />
        </header>

        <div className="scroll-content" style={{ paddingBottom: 32 }}>
          <div className="rs-hero">
            <div className="rs-badge">
              <div className="rs-badge-ring" style={{ background: passed ? 'linear-gradient(135deg, #34C759, #30D158)' : 'linear-gradient(135deg, #FF3B30, #FF6B6B)' }} />
              <div className="rs-badge-inner">
                <span className="rs-badge-score" style={{ color: passed ? '#34C759' : '#FF3B30' }}>{correctCount}</span>
                <span className="rs-badge-total">/{totalQ}</span>
              </div>
            </div>
            <p className="rs-status" style={{ color: passed ? '#34C759' : '#FF3B30' }}>
              {passed ? '🎉 Congratulations!' : '😔 Almost There!'}
            </p>
            <p className="rs-status-sub">
              {passed ? 'You passed the mock test!' : `You need ${Math.ceil(totalQ * 0.86)} correct answers to pass.`}
            </p>
          </div>

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

          {/* Review All Questions */}
          <div style={{ padding: '0 20px', marginBottom: 12 }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>Review All Questions</h4>
          </div>
          <div className="rs-review-list">
            {questions.map((q, i) => {
              const userAns = answers[i];
              const isCorrect = userAns === q.correct;
              const wasAnswered = userAns !== undefined;
              return (
                <div key={i} className="rs-review-item" onClick={() => setReviewIdx(i)}>
                  <div className="rs-review-num" style={{
                    background: !wasAnswered ? '#8E8E93' : isCorrect ? '#34C759' : '#FF3B30'
                  }}>
                    {i + 1}
                  </div>
                  <p className="rs-review-text">{q.text}</p>
                  <ChevronRight size={16} color="#C7C7CC" />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', gap: 10, background: 'var(--bg-main)' }}>
          <button className="btn" onClick={onBack}
            style={{ flex: 1, background: '#F2F2F7', color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Home size={18} /> Home
          </button>
          <button className="btn btn-primary" onClick={() => { setShowResult(false); setCurrentIdx(0); setSelected(null); setAnswers({}); setFlagged([]); setTimeLeft(57 * 60); }}
            style={{ flex: 1.4, fontSize: 14, padding: '14px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <RotateCcw size={18} /> Retry
          </button>
        </div>
      </div>
    );
  }

  /* ─── QUESTION SCREEN (MOCK TEST MODE) ─── */
  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', position: 'relative' }}>
      {/* Header */}
      <header className="screen-header" style={{ marginBottom: 16 }}>
        <button className="back-btn" onClick={onBack}><ChevronLeft size={20} /></button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: timeLeft < 300 ? '#FFF2F2' : '#F0F5FF', padding: '6px 12px', borderRadius: 12 }}>
          <Clock size={15} color={timeLeft < 300 ? '#FF3B30' : '#4F8CFF'} />
          <span style={{ fontWeight: 800, fontSize: 14, color: timeLeft < 300 ? '#FF3B30' : '#4F8CFF' }}>{formatTime(timeLeft)}</span>
        </div>
        <button onClick={handleSubmit} style={{ fontWeight: 800, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
          Submit
        </button>
      </header>

      <div className="scroll-content" style={{ paddingBottom: 80 }}>
        {/* Question counter + flag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-tertiary)' }}>Question {currentIdx + 1}/{totalQ}</span>
          <button onClick={toggleFlag} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 13, fontWeight: 700,
            color: flagged.includes(currentIdx) ? '#FF9500' : 'var(--text-tertiary)',
          }}>
            <Flag size={14} fill={flagged.includes(currentIdx) ? '#FF9500' : 'none'} /> Flag
          </button>
        </div>

        {/* Progress dots (compact) */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 20, flexWrap: 'wrap' }}>
          {questions.map((_, i) => (
            <div key={i} onClick={() => { setCurrentIdx(i); setSelected(null); }}
              style={{
                width: 24, height: 24, borderRadius: 6,
                background: i === currentIdx ? 'var(--primary)'
                  : answers[i] !== undefined ? (questions[i].correct === answers[i] ? '#34C759' : '#E5E5EA')
                  : flagged.includes(i) ? '#FF9500' : '#F0F0F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: i === currentIdx ? 'white' : '#666',
                cursor: 'pointer', transition: 'all 0.15s ease',
              }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Question */}
        <h3 className="qs-question-text">{question.text}</h3>
        {question.image && <div className="qs-image-wrap"><img src={question.image} alt="Q" /></div>}

        {/* Options */}
        <div className="qs-options">
          {question.options.map((opt, idx) => {
            const answered = answers[currentIdx] !== undefined;
            let cls = 'qs-option';
            if (answered) {
              if (idx === question.correct) cls += ' correct';
              else if (idx === answers[currentIdx]) cls += ' wrong';
            }
            return (
              <div key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="qs-option-letter">{LETTERS[idx]}</span>
                <span className="qs-option-text">{opt}</span>
                {answered && idx === question.correct && <CheckCircle2 size={18} color="#34C759" />}
                {answered && idx === answers[currentIdx] && idx !== question.correct && <XCircle size={18} color="#FF3B30" />}
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button onClick={handlePrev} disabled={currentIdx === 0}
            style={{ flex: 1, padding: '14px', borderRadius: 14, border: '1px solid #E5E5EA', background: 'var(--bg-card)', fontWeight: 700, fontSize: 14, cursor: currentIdx === 0 ? 'default' : 'pointer', opacity: currentIdx === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Previous
          </button>
          {currentIdx < totalQ - 1 ? (
            <button onClick={handleNext} className="btn btn-primary"
              style={{ flex: 1, padding: '14px', borderRadius: 14, fontSize: 14 }}>
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn btn-primary"
              style={{ flex: 1, padding: '14px', borderRadius: 14, fontSize: 14 }}>
              Submit Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockTestScreen;
