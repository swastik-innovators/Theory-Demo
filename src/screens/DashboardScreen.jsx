import React from 'react';
import {
  Play, ClipboardList, AlertTriangle, MessageSquare,
  Flame, ChevronRight, Clock, Zap, Crown, BookOpen,
  Video, Target, Shield, Car, Bike, Truck, Bus
} from 'lucide-react';
import './dashboard.css';

/* ─── Vehicle Data Map ─── */
const vehicleMap = {
  car:        { label: 'Car Test',        emoji: '🚗', image: '/car.png',        color: '#4F8CFF', gradient: 'linear-gradient(135deg, #4F8CFF 0%, #6C63FF 100%)' },
  motorcycle: { label: 'Motorcycle Test', emoji: '🏍️', image: '/motorcycle.png', color: '#7B61FF', gradient: 'linear-gradient(135deg, #7B61FF 0%, #B44FFF 100%)' },
  lgv:        { label: 'LGV Test',        emoji: '🚛', image: '/lgv.png',        color: '#00C9A7', gradient: 'linear-gradient(135deg, #00C9A7 0%, #00B4D8 100%)' },
  pcv:        { label: 'PCV Test',        emoji: '🚌', image: '/pcv.png',        color: '#FF9500', gradient: 'linear-gradient(135deg, #FF9500 0%, #FF6B6B 100%)' },
};

/* ─── Mock Practice Topics ─── */
const practiceTopics = [
  { name: 'Road Signs',        icon: '🚧', progress: 78, color: '#4F8CFF' },
  { name: 'Traffic Laws',      icon: '⚖️', progress: 62, color: '#7B61FF' },
  { name: 'Hazard Awareness',  icon: '⚠️', progress: 45, color: '#FF9500' },
  { name: 'Vehicle Handling',  icon: '🛞', progress: 85, color: '#00C9A7' },
  { name: 'Safety Margins',    icon: '📏', progress: 33, color: '#FF6B6B' },
  { name: 'Motorway Rules',    icon: '🛣️', progress: 50, color: '#13C2C2' },
  { name: 'Vulnerable Road Users', icon: '🚶', progress: 70, color: '#667eea' },
  { name: 'Documents',         icon: '📄', progress: 90, color: '#34C759' },
];

/* ─── Mock Tests Data ─── */
const mockTests = [
  { id: 1, title: 'Mock Test 1',  questions: 50, status: 'completed', score: '43/50' },
  { id: 2, title: 'Mock Test 2',  questions: 50, status: 'completed', score: '45/50' },
  { id: 3, title: 'Mock Test 3',  questions: 50, status: 'new',       score: null },
  { id: 4, title: 'Mock Test 4',  questions: 50, status: 'new',       score: null },
  { id: 5, title: 'Mock Test 5',  questions: 50, status: 'new',       score: null },
  { id: 6, title: 'Mock Test 6',  questions: 50, status: 'new',       score: null },
  { id: 7, title: 'Mock Test 7',  questions: 50, status: 'new',       score: null },
  { id: 8, title: 'Mock Test 8',  questions: 50, status: 'new',       score: null },
  { id: 9, title: 'Mock Test 9',  questions: 50, status: 'new',       score: null },
  { id: 10, title: 'Mock Test 10', questions: 50, status: 'new',      score: null },
  { id: 11, title: 'Mock Test 11', questions: 50, status: 'new',      score: null },
  { id: 12, title: 'Mock Test 12', questions: 50, status: 'new',      score: null },
  { id: 13, title: 'Mock Test 13', questions: 50, status: 'new',      score: null },
  { id: 14, title: 'Mock Test 14', questions: 50, status: 'new',      score: null },
  { id: 15, title: 'Mock Test 15', questions: 50, status: 'new',      score: null },
];

/* ─── Quick Learning Reels ─── */
const reels = [
  { id: 1, title: 'Roundabout\nRules',           duration: '1:30', color: '#4F8CFF', icon: '🔄' },
  { id: 2, title: 'Stopping\nDistances',         duration: '2:15', color: '#FF9500', icon: '📐' },
  { id: 3, title: 'Overtaking\nSafely',          duration: '1:45', color: '#7B61FF', icon: '🚗' },
  { id: 4, title: 'Night\nDriving',              duration: '2:00', color: '#13C2C2', icon: '🌙' },
  { id: 5, title: 'Emergency\nStops',            duration: '1:20', color: '#FF6B6B', icon: '🛑' },
  { id: 6, title: 'Motorway\nJoining',           duration: '1:55', color: '#34C759', icon: '🛣️' },
];

/* ─── Time-Based Greeting ─── */
const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

/* ─── Circular Progress Component ─── */
const CircularProgress = ({ percent, size = 56, strokeWidth = 5, color = 'var(--primary)' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="db-progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="#F2F2F7" strokeWidth={strokeWidth} fill="none" />
        <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <span className="db-progress-ring-label" style={{ color }}>{percent}%</span>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   DASHBOARD SCREEN
   ═══════════════════════════════════════════════════ */
const DashboardScreen = ({ navigate, userName = 'Alex', vehicleType = 'car' }) => {
  const vehicle = vehicleMap[vehicleType] || vehicleMap.car;

  return (
    <div className="screen animate-fade-in" style={{ padding: '20px 20px 0', background: 'var(--bg-main)' }}>
      <div className="scroll-content" style={{ paddingBottom: '110px' }}>

        {/* ──── 1. PERSONALIZED HEADER ──── */}
        <div className="db-header">
          <div className="db-header-info">
            <h1>{getGreeting()}, {userName} 👋</h1>
            <p>Let's get you ready for your test</p>
          </div>
          <div className="db-avatar" onClick={() => navigate('profile')}>
            <img src="https://i.pravatar.cc/150?img=33" alt="Profile" />
          </div>
        </div>

        {/* ──── 2. SELECTED VEHICLE DISPLAY ──── */}
        <div className="db-vehicle-card" onClick={() => navigate('profile')}>

          <div className="db-vehicle-card-bg" style={{ background: vehicle.gradient }} />
          <div className="db-vehicle-card-glass" />
          <div className="db-vehicle-card-inner">
            <div className="db-vehicle-img-container">
              <div className="db-vehicle-pulse" style={{ background: vehicle.color }} />
              <div className="db-vehicle-img-wrap">
                <span className="db-vehicle-emoji" style={{ fontSize: '42px' }}>{vehicle.emoji}</span>
              </div>
            </div>
            <div className="db-vehicle-info">
              <p className="db-vehicle-label">Preparing for</p>
              <h3 className="db-vehicle-name">{vehicle.label}</h3>
              <div className="db-vehicle-badge" style={{ color: vehicle.color }}>
                <Zap size={11} fill={vehicle.color} strokeWidth={0} />
                <span>DVSA Category {vehicleType === 'car' ? 'B' : vehicleType === 'motorcycle' ? 'A' : vehicleType === 'lgv' ? 'C' : 'D'}</span>
              </div>
            </div>
            <ChevronRight size={18} color="#8E8E93" />
          </div>
        </div>

        {/* ──── 3. NEXT STEP / SUGGESTION ──── */}
        <div className="db-suggestion-card">
          <div className="db-suggestion-content">
            <div className="db-suggestion-header">
              <Target size={14} color="#FF9500" />
              <span>Recommended for you</span>
            </div>
            <h4>Review "Hazard Awareness"</h4>
            <p>You missed 3 questions on hazardous road conditions yesterday. Improving this will boost your pass rate!</p>
            <button className="db-suggestion-btn" onClick={() => navigate('question', { topicId: 3 })}>
              Quick Practice <ChevronRight size={14} />
            </button>
          </div>
          <div className="db-suggestion-visual">
             <CircularProgress percent={45} size={54} strokeWidth={4} color="#FF9500" />
          </div>
        </div>

        {/* ──── 4. PROGRESS + STREAK ROW ──── */}
        <div className="db-stats-row">
          <div className="db-stat-card" onClick={() => navigate('stats')}>
            <div className="db-stat-card-progress">
              <CircularProgress percent={70} color={vehicle.color} size={48} />
              <div>
                <p className="db-stat-title">Overall</p>
                <h4 className="db-stat-value">70%</h4>
              </div>
            </div>
          </div>

          <div className="db-stat-card streak" style={{ background: '#FFF8EE' }} onClick={() => navigate('stats')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="db-stat-icon-wrap" style={{ background: 'rgba(255, 149, 0, 0.1)' }}>
                <span>🔥</span>
              </div>
              <div>
                <p className="db-stat-title" style={{ color: '#D46B08' }}>Streak</p>
                <h4 className="db-stat-value" style={{ color: '#D46B08' }}>5 Days</h4>
              </div>
            </div>
          </div>
        </div>


        {/* ──── 4. PREMIUM BANNER ──── */}
        <div className="db-premium-banner" onClick={() => navigate('subscribe')}>
          <div className="db-premium-shimmer" />
          <div className="db-premium-content">
            <div className="db-premium-icon">
              <Crown size={26} color="white" />
            </div>
            <div className="db-premium-text">
              <h4>Unlock Premium ✨</h4>
              <p>Unlimited tests · AI learning · Hazard videos</p>
            </div>
            <button className="db-premium-cta" onClick={(e) => { e.stopPropagation(); navigate('subscribe'); }}>
              Go Pro
            </button>
          </div>
        </div>

        {/* ──── 5A. QUICK ACTIONS ──── */}
        <div className="db-section-header" style={{ animation: 'db-stagger-in 0.5s ease 0.2s both' }}>
          <h3 className="db-section-title">Quick Actions</h3>
        </div>
        <div className="db-actions-grid">
          <div className="db-action-item" onClick={() => navigate('practice')}>
            <div className="db-action-icon" style={{ background: 'rgba(79, 140, 255, 0.12)' }}>
              <BookOpen size={22} color="#4F8CFF" />
            </div>
            <span className="db-action-label">Practice</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('mock-list')}>
            <div className="db-action-icon" style={{ background: 'rgba(123, 97, 255, 0.12)' }}>
              <ClipboardList size={22} color="#7B61FF" />
            </div>
            <span className="db-action-label">Mock Test</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('hazard')}>
            <div className="db-action-icon" style={{ background: 'rgba(255, 149, 0, 0.12)' }}>
              <AlertTriangle size={22} color="#FF9500" />
            </div>
            <span className="db-action-label">Hazard</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('drive-coach')}>
            <div className="db-action-icon" style={{ background: 'rgba(0, 209, 255, 0.12)' }}>
              <MessageSquare size={22} color="#00B4D8" />
            </div>
            <span className="db-action-label">Drive Coach</span>
          </div>

        </div>

        {/* ──── 5B. PRACTICE TOPICS ──── */}
        <div className="db-section-header" style={{ animation: 'db-stagger-in 0.5s ease 0.25s both' }}>
          <h3 className="db-section-title">Practice by Topics</h3>
          <button className="db-section-see-all" onClick={() => navigate('practice')}>See All</button>
        </div>
        <div className="db-topics-scroll">
          {practiceTopics.map((t, i) => (
            <div key={i} className="db-topic-card" onClick={() => navigate('question', { topicId: i + 1 })}>
              <div className="db-topic-icon" style={{ background: `${t.color}15` }}>
                {t.icon}
              </div>
              <p className="db-topic-name">{t.name}</p>
              <div className="db-topic-progress-bar">
                <div className="db-topic-progress-fill" style={{ width: `${t.progress}%`, background: t.color }} />
              </div>
              <p className="db-topic-progress-text">{t.progress}% done</p>
            </div>
          ))}
        </div>

        {/* ──── 5C. MOCK TESTS ──── */}
        <div className="db-section-header" style={{ animation: 'db-stagger-in 0.5s ease 0.3s both' }}>
          <h3 className="db-section-title">Mock Tests</h3>
          <button className="db-section-see-all" onClick={() => navigate('mock-list')}>See All</button>
        </div>
        <div className="db-mocks-scroll">
          {mockTests.map((m) => (
            <div key={m.id} className="db-mock-card" onClick={() => navigate('mock-instruction', { testId: m.id })}>
              <div className="db-mock-number" style={{
                background: m.status === 'completed'
                  ? 'linear-gradient(135deg, #34C759, #30D158)'
                  : 'linear-gradient(135deg, #4F8CFF, #7B61FF)'
              }}>
                {m.id}
              </div>
              <p className="db-mock-title">{m.title}</p>
              <p className="db-mock-meta">{m.questions} questions</p>
              {m.status === 'completed' ? (
                <div className="db-mock-status completed">
                  <span>✓ {m.score}</span>
                </div>
              ) : (
                <div className="db-mock-status new">
                  <span>● New</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ──── 5D. VIDEO QUIZ ──── */}
        <div className="db-section-header" style={{ animation: 'db-stagger-in 0.5s ease 0.35s both' }}>
          <h3 className="db-section-title">Video Quiz</h3>
          <button className="db-section-see-all">See All</button>
        </div>
        <div className="db-reels-scroll">
          {reels.map((r) => (
            <div key={r.id} className="db-reel-card" onClick={() => navigate('video-question', { videoId: r.id })}>
              {/* Gradient thumbnail placeholder */}
              <div style={{
                width: '100%', height: '100%',
                background: `linear-gradient(150deg, ${r.color}22 0%, ${r.color}66 50%, ${r.color}DD 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '40px',
              }}>
                {r.icon}
              </div>
              <div className="db-reel-overlay">
                <div className="db-reel-play">
                  <Play size={16} color="white" fill="white" />
                </div>
                <p className="db-reel-title" style={{ whiteSpace: 'pre-line' }}>{r.title}</p>
                <span className="db-reel-duration">
                  <Clock size={10} /> {r.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DashboardScreen;
