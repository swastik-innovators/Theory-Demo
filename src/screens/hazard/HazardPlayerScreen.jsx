import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, Play, Pause, RotateCcw, ChevronRight, X as XIcon, Pointer } from 'lucide-react';
import '../hazard.css';

const HazardPlayerScreen = ({ onBack, videoId = 1 }) => {
  const [phase, setPhase] = useState('ready'); // 'ready' | 'playing' | 'result'
  const [progress, setProgress] = useState(0);
  const [taps, setTaps] = useState([]);
  const [ripples, setRipples] = useState([]);
  const timerRef = useRef(null);

  const DURATION = 12; // seconds for demo
  // Hazard window is between 40%-70% of the video
  const HAZARD_START = 40;
  const HAZARD_END = 70;

  const startPlaying = () => {
    setPhase('playing');
    setProgress(0);
    setTaps([]);
    setRipples([]);
  };

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          setPhase('result');
          return 100;
        }
        return prev + (100 / (DURATION * 20)); // ~50ms intervals
      });
    }, 50);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const handleTap = useCallback((e) => {
    if (phase !== 'playing') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tapTime = progress;

    // Add ripple
    const rippleId = Date.now();
    setRipples(prev => [...prev, { x, y, id: rippleId }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rippleId)), 700);

    // Record tap
    setTaps(prev => [...prev, { x, y, time: tapTime, id: rippleId }]);
  }, [phase, progress]);

  // Calculate score
  const getScore = () => {
    if (taps.length === 0) return { stars: 0, points: 0, feedback: 'No taps detected', color: '#8E8E93' };
    // Find best tap (closest to hazard window)
    let bestTap = null;
    let bestDist = Infinity;
    for (const t of taps) {
      if (t.time >= HAZARD_START && t.time <= HAZARD_END) {
        const center = (HAZARD_START + HAZARD_END) / 2;
        const dist = Math.abs(t.time - center);
        if (dist < bestDist) { bestDist = dist; bestTap = t; }
      }
    }
    if (bestTap) {
      const center = (HAZARD_START + HAZARD_END) / 2;
      const halfWidth = (HAZARD_END - HAZARD_START) / 2;
      const accuracy = 1 - (Math.abs(bestTap.time - center) / halfWidth);
      if (accuracy > 0.8) return { stars: 5, points: 5, feedback: 'Perfect timing! 🎯', color: '#34C759' };
      if (accuracy > 0.6) return { stars: 4, points: 4, feedback: 'Great response!', color: '#34C759' };
      if (accuracy > 0.4) return { stars: 3, points: 3, feedback: 'Good timing', color: '#FF9500' };
      return { stars: 2, points: 2, feedback: 'A bit late', color: '#FF9500' };
    }
    // Taps outside window
    const earlyTaps = taps.filter(t => t.time < HAZARD_START);
    if (earlyTaps.length > 0) return { stars: 1, points: 1, feedback: 'Too early! Wait for it to develop.', color: '#FF3B30' };
    return { stars: 1, points: 1, feedback: 'Too late! Tap sooner next time.', color: '#FF3B30' };
  };

  const score = getScore();

  /* ─── RESULT SCREEN ─── */
  if (phase === 'result') {
    return (
      <div className="screen animate-fade-in hz-player" style={{ background: 'var(--bg-main)' }}>
        {/* Mini video replay area */}
        <div style={{
          width: '100%', aspectRatio: '16/9', position: 'relative',
          background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <button onClick={onBack} style={{
            position: 'absolute', top: 12, left: 12,
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5,
          }}>
            <XIcon size={16} color="white" />
          </button>
          <span style={{ fontSize: 40, opacity: 0.6 }}>🚗</span>
          <div style={{ position: 'absolute', bottom: 8, left: 12, right: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Clip #{videoId}</span>
          </div>
        </div>

        {/* Result Area */}
        <div className="hz-result-area" style={{ animation: 'hz-slide-up 0.5s ease' }}>
          {/* Stars */}
          <div className="hz-stars">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="hz-star" style={{
                animationDelay: `${i * 0.12}s`,
                filter: i <= score.stars ? 'none' : 'grayscale(1) opacity(0.25)',
              }}>⭐</span>
            ))}
          </div>

          {/* Score */}
          <div style={{ textAlign: 'center', marginBottom: 16, animation: 'hz-score-count 0.6s ease 0.7s both' }}>
            <p style={{ fontSize: 36, fontWeight: 800, color: score.color }}>{score.points}</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-tertiary)' }}>out of 5 points</p>
          </div>

          {/* Feedback Badge */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hz-feedback-badge" style={{ background: `${score.color}15`, color: score.color }}>
              {score.feedback}
            </div>
          </div>

          {/* Timeline Visualization */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 8 }}>TIMING ANALYSIS</p>
            <div className="hz-timeline-vis">
              {/* Hazard scoring window */}
              <div className="hz-timeline-window" style={{ left: `${HAZARD_START}%`, width: `${HAZARD_END - HAZARD_START}%` }} />
              {/* User taps */}
              {taps.map((t, i) => (
                <div key={i} className="hz-timeline-tap" style={{
                  left: `${Math.min(t.time, 100)}%`,
                  background: (t.time >= HAZARD_START && t.time <= HAZARD_END) ? '#34C759' : '#FF3B30',
                  boxShadow: `0 0 6px ${(t.time >= HAZARD_START && t.time <= HAZARD_END) ? 'rgba(52,199,89,0.5)' : 'rgba(255,59,48,0.5)'}`,
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>0s</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#34C759' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: '#34C759', display: 'inline-block' }} /> Scoring window
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: '#FF3B30' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: '#FF3B30', display: 'inline-block' }} /> Your taps
                </span>
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{DURATION}s</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => { setPhase('ready'); setProgress(0); setTaps([]); }}
              style={{ flex: 1, padding: '14px', borderRadius: 14, border: '1px solid #E5E5EA', background: 'var(--bg-card)', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <RotateCcw size={16} /> Retry
            </button>
            <button onClick={onBack} className="btn btn-primary"
              style={{ flex: 1.2, padding: '14px', borderRadius: 14, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              Next Video <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── READY / PLAYING ─── */
  return (
    <div className="screen hz-player">
      {/* Video Area */}
      <div className="hz-player-video" onClick={phase === 'playing' ? handleTap : undefined}>
        {/* Simulated video with gradient background */}
        <div style={{
          width: '100%', height: '100%',
          background: phase === 'playing'
            ? `linear-gradient(${135 + progress}deg, #0F2027, #203A43, #2C5364)`
            : 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.5s',
        }}>
          {/* Moving car emoji to simulate video */}
          {phase === 'playing' && (
            <span style={{
              fontSize: 36,
              transform: `translateX(${(progress - 50) * 1.5}px)`,
              transition: 'transform 0.3s linear',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
            }}>🚗</span>
          )}
          {/* Pedestrian appears during hazard window */}
          {phase === 'playing' && progress >= HAZARD_START * 0.9 && (
            <span style={{
              position: 'absolute',
              left: '30%',
              fontSize: 28,
              opacity: Math.min((progress - HAZARD_START * 0.9) / 10, 1),
              transform: `translateX(${Math.min(progress - HAZARD_START * 0.9, 30)}px)`,
              transition: 'all 0.3s',
            }}>🚶</span>
          )}
        </div>

        {/* Back button */}
        <button onClick={onBack} style={{
          position: 'absolute', top: 12, left: 12, zIndex: 5,
          width: 34, height: 34, borderRadius: '50%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={16} color="white" />
        </button>

        {/* Tap ripples */}
        {ripples.map(r => (
          <div key={r.id} className="hz-tap-ripple" style={{ left: r.x, top: r.y }} />
        ))}

        {/* Tap markers */}
        {phase === 'playing' && taps.map(t => (
          <div key={t.id} className="hz-tap-marker" style={{ left: t.x, top: t.y }} />
        ))}

        {/* Play overlay (ready state) */}
        {phase === 'ready' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 12,
          }} onClick={startPlaying}>
            <button onClick={(e) => { e.stopPropagation(); startPlaying(); }} style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'transform 0.2s',
            }}>
              <Play size={26} color="white" fill="white" />
            </button>
            <p style={{ color: 'white', fontSize: 13, fontWeight: 700 }}>Tap to start</p>
          </div>
        )}

        {/* Progress bar (playing) */}
        {phase === 'playing' && (
          <div className="hz-player-controls">
            <div className="hz-player-progress">
              <div className="hz-player-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Instruction Area */}
      <div style={{
        flex: 1, background: 'var(--bg-main)',
        borderRadius: '24px 24px 0 0', marginTop: -16,
        position: 'relative', zIndex: 2, padding: '24px 20px',
        display: 'flex', flexDirection: 'column',
      }}>
        {phase === 'ready' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👁️</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Clip #{videoId}</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 280, marginBottom: 20 }}>
              Watch the video and <strong>tap the screen</strong> as soon as you see a developing hazard.
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', borderRadius: 12,
              background: 'rgba(79,140,255,0.08)',
              border: '1px solid rgba(79,140,255,0.15)',
            }}>
              <Pointer size={16} color="#4F8CFF" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#4F8CFF' }}>Tap when you see a hazard!</span>
            </div>
          </div>
        )}

        {phase === 'playing' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <div className="hz-player-instruction">
              <Pointer size={16} color="#4F8CFF" />
              <p>Tap on the video when you see a developing hazard</p>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)' }}>{taps.length}</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)' }}>TAPS</p>
              </div>
              <div style={{ width: 1, height: 30, background: '#E5E5EA' }} />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>{Math.ceil(DURATION - (progress / 100) * DURATION)}s</p>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)' }}>LEFT</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HazardPlayerScreen;
