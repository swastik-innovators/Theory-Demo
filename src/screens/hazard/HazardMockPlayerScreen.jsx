import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, Play, RotateCcw, Home, Pointer, X as XIcon, ChevronRight } from 'lucide-react';
import '../hazard.css';

const CLIPS_COUNT = 14;
const CLIP_DURATION = 8; // seconds per clip (demo)
const PASS_MARK = 44;

/* generate random hazard windows for each clip */
const generateClips = () => Array.from({ length: CLIPS_COUNT }, (_, i) => {
  const start = 30 + Math.random() * 20;
  return { id: i + 1, hazardStart: start, hazardEnd: start + 25 + Math.random() * 10, maxPoints: 5 };
});

const HazardMockPlayerScreen = ({ onBack, testId = 1 }) => {
  const [clips] = useState(generateClips);
  const [currentClip, setCurrentClip] = useState(0);
  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'between' | 'result'
  const [progress, setProgress] = useState(0);
  const [taps, setTaps] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [clipScores, setClipScores] = useState([]);
  const timerRef = useRef(null);

  const clip = clips[currentClip];

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          finishClip();
          return 100;
        }
        return prev + (100 / (CLIP_DURATION * 20));
      });
    }, 50);
    return () => clearInterval(timerRef.current);
  }, [phase, currentClip]);

  const startClip = () => {
    setPhase('playing');
    setProgress(0);
    setTaps([]);
    setRipples([]);
  };

  const finishClip = () => {
    clearInterval(timerRef.current);
    // Score this clip
    const score = calcClipScore();
    setClipScores(prev => [...prev, { clipId: currentClip + 1, ...score }]);

    if (currentClip < CLIPS_COUNT - 1) {
      setPhase('between');
    } else {
      setPhase('result');
    }
  };

  const nextClip = () => {
    setCurrentClip(prev => prev + 1);
    setTaps([]);
    setRipples([]);
    setProgress(0);
    setPhase('playing');
  };

  const handleTap = useCallback((e) => {
    if (phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rid = Date.now();
    setRipples(prev => [...prev, { x, y, id: rid }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rid)), 700);
    setTaps(prev => [...prev, { x, y, time: progress, id: rid }]);
  }, [phase, progress]);

  const calcClipScore = () => {
    if (taps.length === 0) return { points: 0, feedback: 'No response' };
    let best = null;
    for (const t of taps) {
      if (t.time >= clip.hazardStart && t.time <= clip.hazardEnd) {
        if (!best || Math.abs(t.time - (clip.hazardStart + clip.hazardEnd) / 2) < Math.abs(best.time - (clip.hazardStart + clip.hazardEnd) / 2)) {
          best = t;
        }
      }
    }
    if (best) {
      const center = (clip.hazardStart + clip.hazardEnd) / 2;
      const halfW = (clip.hazardEnd - clip.hazardStart) / 2;
      const acc = 1 - Math.abs(best.time - center) / halfW;
      if (acc > 0.8) return { points: 5, feedback: 'Perfect' };
      if (acc > 0.6) return { points: 4, feedback: 'Great' };
      if (acc > 0.4) return { points: 3, feedback: 'Good' };
      return { points: 2, feedback: 'Late' };
    }
    return { points: 1, feedback: taps[0].time < clip.hazardStart ? 'Too early' : 'Too late' };
  };

  const totalScore = clipScores.reduce((a, c) => a + c.points, 0);
  const totalMax = CLIPS_COUNT * 5;
  const passed = totalScore >= PASS_MARK;

  /* ─── RESULT SCREEN ─── */
  if (phase === 'result') {
    return (
      <div className="screen animate-fade-in" style={{ padding: 0, background: 'var(--bg-main)' }}>
        <header className="screen-header" style={{ padding: '20px', marginBottom: 0 }}>
          <button className="back-btn" onClick={onBack}><XIcon size={20} /></button>
          <h2 className="screen-title">Mock Test {testId}</h2>
          <div style={{ width: 40 }} />
        </header>

        <div className="scroll-content" style={{ paddingBottom: 32, padding: 20 }}>
          {/* Score Circle */}
          <div style={{ textAlign: 'center', marginBottom: 20, animation: 'hz-score-count 0.6s ease' }}>
            <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto 16px' }}>
              <svg width={120} height={120} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="52" stroke="#E5E5EA" strokeWidth="8" fill="none" />
                <circle cx="60" cy="60" r="52" stroke={passed ? '#34C759' : '#FF3B30'} strokeWidth="8" fill="none"
                  strokeDasharray={326.7} strokeDashoffset={326.7 - (totalScore / totalMax) * 326.7}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: passed ? '#34C759' : '#FF3B30' }}>{totalScore}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-tertiary)' }}>/{totalMax}</span>
              </div>
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 20px', borderRadius: 12,
              background: passed ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)',
              color: passed ? '#34C759' : '#FF3B30',
              fontSize: 16, fontWeight: 800,
            }}>
              {passed ? '🎉 PASS' : '😔 FAIL'}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 8, fontWeight: 500 }}>
              {passed ? 'Congratulations! You passed the hazard perception test.' : `You need ${PASS_MARK} marks to pass. Keep practicing!`}
            </p>
          </div>

          {/* Clip Breakdown */}
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 0.5 }}>Score Breakdown</p>
          {clipScores.map((cs, i) => (
            <div key={i} className="hz-clip-row">
              <div className="hz-clip-num" style={{ background: cs.points >= 3 ? '#34C759' : cs.points >= 1 ? '#FF9500' : '#FF3B30' }}>
                {i + 1}
              </div>
              <div className="hz-clip-info">
                <span>Clip {i + 1}</span>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 8 }}>{cs.feedback}</span>
              </div>
              <span className="hz-clip-score" style={{ color: cs.points >= 3 ? '#34C759' : cs.points >= 1 ? '#FF9500' : '#FF3B30' }}>
                {cs.points}/5
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div style={{ padding: '16px 20px', display: 'flex', gap: 10, background: 'var(--bg-main)' }}>
          <button onClick={onBack}
            style={{ flex: 1, padding: '14px', borderRadius: 14, border: 'none', background: '#F2F2F7', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-primary)' }}>
            <Home size={16} /> Home
          </button>
          <button onClick={() => { setCurrentClip(0); setClipScores([]); setTaps([]); setProgress(0); setPhase('intro'); }}
            className="btn btn-primary"
            style={{ flex: 1.3, padding: '14px', borderRadius: 14, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <RotateCcw size={16} /> Retry Test
          </button>
        </div>
      </div>
    );
  }

  /* ─── BETWEEN CLIPS ─── */
  if (phase === 'between') {
    const lastScore = clipScores[clipScores.length - 1];
    return (
      <div className="screen animate-fade-in" style={{ padding: 20, background: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="hz-stars" style={{ marginBottom: 12 }}>
            {[1,2,3,4,5].map(i => (
              <span key={i} className="hz-star" style={{ animationDelay: `${i * 0.1}s`, filter: i <= lastScore.points ? 'none' : 'grayscale(1) opacity(0.2)' }}>⭐</span>
            ))}
          </div>
          <p style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Clip {currentClip + 1} Complete</p>
          <p style={{ fontSize: 14, color: 'var(--text-tertiary)', marginBottom: 6 }}>{lastScore.feedback} · {lastScore.points}/5 points</p>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>Running total: <strong style={{ color: 'var(--primary)' }}>{totalScore}/{(currentClip + 1) * 5}</strong></p>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 4 }}>Clip {currentClip + 2} of {CLIPS_COUNT} next</p>
        </div>
        <button onClick={nextClip} className="btn btn-primary" style={{ borderRadius: 14, fontSize: 15, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          Next Clip <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  /* ─── INTRO ─── */
  if (phase === 'intro') {
    return (
      <div className="screen animate-fade-in" style={{ padding: 20, background: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
        <header className="screen-header" style={{ marginBottom: 16 }}>
          <button className="back-btn" onClick={onBack}><ChevronLeft size={20} /></button>
          <h2 className="screen-title">Mock Test {testId}</h2>
          <div style={{ width: 40 }} />
        </header>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎯</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Hazard Mock Test {testId}</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 280, marginBottom: 24 }}>
            You will watch <strong>{CLIPS_COUNT} video clips</strong>. Tap the screen when you see a developing hazard. Each clip scores up to <strong>5 points</strong>.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 260, marginBottom: 20 }}>
            <div style={{ textAlign: 'center', padding: '12px', borderRadius: 14, background: 'rgba(79,140,255,0.08)' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#4F8CFF' }}>{CLIPS_COUNT}</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Clips</p>
            </div>
            <div style={{ textAlign: 'center', padding: '12px', borderRadius: 14, background: 'rgba(52,199,89,0.08)' }}>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#34C759' }}>{PASS_MARK}</p>
              <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Pass Mark</p>
            </div>
          </div>
        </div>
        <button onClick={startClip} className="btn btn-primary" style={{ borderRadius: 16, fontSize: 16, padding: '16px' }}>
          Start Test
        </button>
      </div>
    );
  }

  /* ─── PLAYING ─── */
  return (
    <div className="screen hz-player" style={{ background: '#000' }}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onBack} style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={16} color="white" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'white', background: 'rgba(0,0,0,0.4)', padding: '5px 10px', borderRadius: 8, backdropFilter: 'blur(8px)' }}>
            Clip {currentClip + 1}/{CLIPS_COUNT}
          </span>
          <span style={{ fontSize: 12, fontWeight: 800, color: '#4F8CFF', background: 'rgba(0,0,0,0.4)', padding: '5px 10px', borderRadius: 8, backdropFilter: 'blur(8px)' }}>
            Score: {totalScore}
          </span>
        </div>
      </div>

      {/* Video Area */}
      <div className="hz-player-video" onClick={handleTap} style={{ flex: 1 }}>
        <div style={{
          width: '100%', height: '100%',
          background: `linear-gradient(${120 + progress * 0.5}deg, #0a1628, #1a2a4a, #0d2137)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Road simulation */}
          <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 3, height: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{
            fontSize: 32,
            transform: `translateX(${(progress - 50) * 1.2}px)`,
            transition: 'transform 0.2s linear',
          }}>🚗</span>
          {progress >= clip.hazardStart * 0.85 && (
            <span style={{
              position: 'absolute', left: '35%',
              fontSize: 24,
              opacity: Math.min((progress - clip.hazardStart * 0.85) / 8, 1),
              transform: `translateX(${(progress - clip.hazardStart * 0.85) * 0.8}px)`,
            }}>🚶</span>
          )}
        </div>

        {/* Ripples */}
        {ripples.map(r => <div key={r.id} className="hz-tap-ripple" style={{ left: r.x, top: r.y }} />)}
        {taps.map(t => <div key={t.id} className="hz-tap-marker" style={{ left: t.x, top: t.y }} />)}

        {/* Progress */}
        <div className="hz-player-controls">
          <div className="hz-player-progress">
            <div className="hz-player-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Bottom instruction */}
      <div style={{ background: 'var(--bg-main)', padding: '16px 20px', borderRadius: '20px 20px 0 0', marginTop: -12, position: 'relative', zIndex: 2 }}>
        <div className="hz-player-instruction" style={{ animation: 'none' }}>
          <Pointer size={15} color="#4F8CFF" />
          <p style={{ fontSize: 12 }}>Tap when you see a developing hazard</p>
        </div>
      </div>
    </div>
  );
};

export default HazardMockPlayerScreen;
