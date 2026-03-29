import React, { useState, useRef, useMemo } from 'react';
import { VIDEO_QUESTIONS } from '../data/mockData';
import { ChevronLeft, Play, Pause, CheckCircle2, XCircle, Info, Home, RotateCcw, X as XIcon } from 'lucide-react';
import './screens.css';

const LETTERS = ['A', 'B', 'C', 'D'];

const VideoQuestionScreen = ({ onBack, videoId = 1 }) => {
  const videoData = useMemo(() => VIDEO_QUESTIONS.find(v => v.id === videoId) || VIDEO_QUESTIONS[0], [videoId]);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [phase, setPhase] = useState('video'); // 'video' | 'questions' | 'score'

  const totalQ = videoData.questions.length;
  const question = videoData.questions[currentQIdx];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoWatched(true);
  };

  const startQuestions = () => {
    setPhase('questions');
    setVideoWatched(true);
  };

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setAnswers(prev => [...prev, {
      questionIdx: currentQIdx,
      selectedIdx: idx,
      correct: idx === question.correct,
      questionText: question.text,
    }]);
  };

  const handleNext = () => {
    if (currentQIdx < totalQ - 1) {
      setCurrentQIdx(p => p + 1);
      setSelected(null);
    } else {
      setPhase('score');
    }
  };

  const correctCount = answers.filter(a => a.correct).length;
  const wrongCount = answers.filter(a => !a.correct).length;
  const scorePercent = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const passed = scorePercent >= 70;

  /* ─── SCORE SCREEN ─── */
  if (phase === 'score') {
    return (
      <div className="screen animate-fade-in rs-container" style={{ padding: 0 }}>
        <header className="screen-header" style={{ padding: '20px', marginBottom: 0 }}>
          <button className="back-btn" onClick={onBack}><XIcon size={20} /></button>
          <h2 className="screen-title">Video Quiz Result</h2>
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
              {passed ? '🎉 Great Job!' : '💪 Watch Again!'}
            </p>
            <p className="rs-status-sub">{videoData.title}</p>
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

          <div className="rs-review-list">
            {answers.map((a, i) => (
              <div key={i} className="rs-review-item">
                <div className="rs-review-num" style={{ background: a.correct ? '#34C759' : '#FF3B30' }}>{i + 1}</div>
                <p className="rs-review-text">{a.questionText}</p>
                {a.correct ? <CheckCircle2 size={20} color="#34C759" /> : <XCircle size={20} color="#FF3B30" />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '16px 20px', display: 'flex', gap: 10, background: 'var(--bg-main)' }}>
          <button className="btn" onClick={onBack}
            style={{ flex: 1, background: '#F2F2F7', color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, padding: '14px', borderRadius: 14, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Home size={18} /> Home
          </button>
          <button className="btn btn-primary" onClick={() => { setPhase('video'); setCurrentQIdx(0); setSelected(null); setAnswers([]); setIsPlaying(false); setVideoWatched(false); }}
            style={{ flex: 1.4, fontSize: 14, padding: '14px', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <RotateCcw size={18} /> Watch Again
          </button>
        </div>
      </div>
    );
  }

  /* ─── VIDEO PHASE ─── */
  if (phase === 'video') {
    return (
      <div className="screen animate-fade-in" style={{ padding: 0, background: '#000' }}>
        {/* Video Player (landscape) */}
        <div className="vp-video-wrap">
          <video
            ref={videoRef}
            className="vp-video"
            src={videoData.videoUrl}
            onEnded={handleVideoEnd}
            playsInline
            poster=""
          />
          {!isPlaying && (
            <div className="vp-overlay" onClick={togglePlay}>
              <button className="vp-play-btn" onClick={(e) => { e.stopPropagation(); togglePlay(); }}>
                <Play size={24} color="white" fill="white" />
              </button>
            </div>
          )}
          {isPlaying && (
            <div style={{ position: 'absolute', inset: 0 }} onClick={togglePlay} />
          )}
          {/* Back button overlay */}
          <button onClick={onBack} style={{
            position: 'absolute', top: 16, left: 16,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <ChevronLeft size={18} color="white" />
          </button>
        </div>

        {/* Info Area Below Video */}
        <div className="vp-question-area" style={{ background: 'var(--bg-main)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{videoData.thumbnail}</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{videoData.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 6 }}>Duration: {videoData.duration}</p>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.5, maxWidth: 280 }}>
              Watch the video then answer {totalQ} question{totalQ > 1 ? 's' : ''} to test your understanding.
            </p>
          </div>

          <div style={{ padding: '0 20px 24px' }}>
            <button className="btn btn-primary" onClick={startQuestions}
              style={{ borderRadius: 16, fontSize: 15, padding: '16px 24px', opacity: 1 }}>
              {videoWatched ? 'Start Questions' : 'Skip to Questions'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── QUESTIONS PHASE ─── */
  return (
    <div className="screen animate-fade-in" style={{ padding: 20, position: 'relative' }}>
      <header className="screen-header" style={{ marginBottom: 20 }}>
        <button className="back-btn" onClick={() => setPhase('video')}>
          <ChevronLeft size={20} />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 8 }}>
          <div style={{ flex: 1, height: 6, background: '#E5E5EA', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((currentQIdx + 1) / totalQ) * 100}%`, background: videoData.color, borderRadius: 3, transition: 'width 0.4s' }} />
          </div>
          <span style={{ fontWeight: 800, fontSize: 13, color: 'var(--text-tertiary)' }}>{currentQIdx + 1}/{totalQ}</span>
        </div>
      </header>

      <div className="scroll-content" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 10, background: `${videoData.color}12`, marginBottom: 16 }}>
          <span style={{ fontSize: 14 }}>{videoData.thumbnail}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: videoData.color }}>{videoData.title}</span>
        </div>

        <h3 className="qs-question-text">{question.text}</h3>

        <div className="qs-options">
          {question.options.map((opt, idx) => {
            let cls = 'qs-option';
            if (selected !== null) {
              if (idx === question.correct) cls += ' correct';
              else if (idx === selected) cls += ' wrong';
            }
            return (
              <div key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="qs-option-letter" style={selected !== null && idx === question.correct ? { background: '#34C759', color: 'white' } : selected !== null && idx === selected && idx !== question.correct ? { background: '#FF3B30', color: 'white' } : {}}>{LETTERS[idx]}</span>
                <span className="qs-option-text">{opt}</span>
                {selected !== null && idx === question.correct && <CheckCircle2 size={18} color="#34C759" />}
                {selected !== null && idx === selected && idx !== question.correct && <XCircle size={18} color="#FF3B30" />}
              </div>
            );
          })}
        </div>

        {selected !== null && (
          <div className="qs-explanation">
            <h5><Info size={14} /> Explanation</h5>
            <p>{question.explanation}</p>
          </div>
        )}

        {selected !== null && (
          <div style={{ marginTop: 16 }}>
            <button className="btn btn-primary" onClick={handleNext} style={{ borderRadius: 14, fontSize: 15 }}>
              {currentQIdx < totalQ - 1 ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoQuestionScreen;
