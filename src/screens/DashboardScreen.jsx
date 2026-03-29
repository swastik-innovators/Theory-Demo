import React from 'react';
import {
  Play, ClipboardList, AlertTriangle, MessageSquare,
  Flame, ChevronRight, Clock, Zap, Crown, BookOpen,
  Video, Target, Shield, Car, Bike, Truck, Bus,
  Signpost, ScrollText
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
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   DASHBOARD SCREEN
   ═══════════════════════════════════════════════════ */
const DashboardScreen = ({ navigate, userName = 'Alex', vehicleType = 'car', onUpdateVehicle }) => {
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

        {/* ──── 2. VEHICLE SCOREBOARD HERO ──── */}
        <div className="db-score-hero" onClick={() => navigate('profile')}>
          <div className="db-score-hero-gradient" style={{ background: vehicle.gradient }} />
          
          <div className="db-score-hero-left">
            <span className="db-score-hero-tag">PREPARING FOR</span>
            <h3 className="db-score-hero-title">{vehicle.label}</h3>
            
            <div className="db-score-hero-stats">
              <div className="db-score-hero-stat">
                <CircularProgress percent={70} color="white" size={32} strokeWidth={3} />
                <div className="db-score-hero-stat-info">
                  <span className="db-score-hero-stat-value">70%</span>
                  <span className="db-score-hero-stat-label">Overall</span>
                </div>
              </div>
              <div className="db-score-hero-stat-divider" />
              <div className="db-score-hero-stat">
                <div className="db-score-hero-fire">🔥</div>
                <div className="db-score-hero-stat-info">
                  <span className="db-score-hero-stat-value">5 Days</span>
                  <span className="db-score-hero-stat-label">Streak</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="db-score-hero-right">
            <img src={vehicle.image} alt={vehicle.label} />
          </div>
        </div>

   {/* ──── 5A. QUICK ACTIONS ──── */}
        <div className="db-section-header" style={{ animation: 'db-stagger-in 0.5s ease 0.2s both' }}>
          <h3 className="db-section-title">Quick Actions</h3>
        </div>
        <div className="db-actions-scroll-wrap">
          <div className="db-action-item" onClick={() => navigate('practice')}>
            <div className="db-action-icon" style={{ background: 'rgba(79, 140, 255, 0.12)' }}>
              <BookOpen size={24} color="#4F8CFF" />
            </div>
            <span className="db-action-label">Practice</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('mock-list')}>
            <div className="db-action-icon" style={{ background: 'rgba(123, 97, 255, 0.12)' }}>
              <ClipboardList size={24} color="#7B61FF" />
            </div>
            <span className="db-action-label">Mock Test</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('hazard')}>
            <div className="db-action-icon" style={{ background: 'rgba(255, 149, 0, 0.12)' }}>
              <AlertTriangle size={24} color="#FF9500" />
            </div>
            <span className="db-action-label">Hazard</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('drive-coach')}>
            <div className="db-action-icon" style={{ background: 'rgba(0, 209, 255, 0.12)' }}>
              <MessageSquare size={24} color="#00B4D8" />
            </div>
            <span className="db-action-label">Drive Coach</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('road-signs')}>
            <div className="db-action-icon" style={{ background: 'rgba(255, 45, 85, 0.12)' }}>
              <Signpost size={24} color="#FF2D55" />
            </div>
            <span className="db-action-label">Road Signs</span>
          </div>
          <div className="db-action-item" onClick={() => navigate('highway-code')}>
            <div className="db-action-icon" style={{ background: 'rgba(52, 199, 89, 0.12)' }}>
              <ScrollText size={24} color="#34C759" />
            </div>
            <span className="db-action-label">Highway Code</span>
          </div>
        </div>


     

        {/* ──── 4. PRACTICE PROGRESS HERO ──── */}
        <div className="db-progress-hero practice" onClick={() => navigate('practice')}>
          <div className="db-progress-hero-content">
            <span className="db-progress-hero-label">PRACTICE PROGRESS</span>
            <h3>14 Topics Total</h3>
            <p>9 of 14 topics completed</p>
            <div className="db-progress-hero-bar-container">
              <div className="db-progress-hero-bar-fill" style={{ width: '64%' }} />
            </div>
            <button className="db-progress-hero-btn">
              Continue Practice <ChevronRight size={14} />
            </button>
          </div>
          <div className="db-progress-hero-visual">
            <img src="/practice_hero_illu_1774783438550.png" alt="Practice Illustration" />
          </div>
        </div>

        {/* ──── 5. TOPIC LIST ──── */}
        <div className="db-section-subheader">
          <h4>Explore Topics</h4>
          <button onClick={() => navigate('practice')}>See All</button>
        </div>
        <div className="db-topics-scroll">
          {practiceTopics.map((t, i) => (
            <div key={i} className="db-topic-card-compact" onClick={() => navigate('question', { topicId: i + 1 })}>
              <div className="db-topic-icon-wrap" style={{ background: `${t.color}15` }}>
                {t.icon}
              </div>
              <div className="db-topic-info">
                <p className="db-topic-name">{t.name}</p>
                <span className="db-topic-percent">{t.progress}% done</span>
              </div>
            </div>
          ))}
        </div>

        {/* ──── 6. MOCK TEST PROGRESS HERO ──── */}
        <div className="db-progress-hero mock" onClick={() => navigate('mock-list')}>
          <div className="db-progress-hero-content">
            <span className="db-progress-hero-label" style={{ color: 'rgba(255,255,255,0.7)' }}>MOCK TEST PROGRESS</span>
            <h3>15 Tests Total</h3>
            <p>5 of 15 tests completed</p>
            <div className="db-progress-hero-bar-container">
              <div className="db-progress-hero-bar-fill" style={{ width: '33%', background: 'white' }} />
            </div>
            <button className="db-progress-hero-btn">
              Start Next Test <ChevronRight size={14} />
            </button>
          </div>
          <div className="db-progress-hero-visual">
            <img src="/mock_hero_illu_1774783463055.png" alt="Mock Illustration" />
          </div>
        </div>

        {/* ──── 7. MOCK LIST ──── */}
        <div className="db-section-subheader">
          <h4>Mock Exams</h4>
          <button onClick={() => navigate('mock-list')}>See All</button>
        </div>
        <div className="db-mocks-scroll">
          {mockTests.map((m) => (
            <div key={m.id} className="db-mock-card-compact" onClick={() => navigate('mock-instruction', { testId: m.id })}>
              <div className="db-mock-header">
                <span className="db-mock-badge" style={{ 
                  background: m.status === 'completed' ? 'rgba(52, 199, 89, 0.08)' : 'rgba(0, 122, 255, 0.08)',
                  color: m.status === 'completed' ? '#34C759' : '#007AFF'
                }}>
                  {m.status === 'completed' ? 'Done' : 'New'}
                </span>
                {m.score && <span className="db-mock-score">{m.score}</span>}
              </div>
              <p className="db-mock-title">{m.title}</p>
            </div>
          ))}
        </div>

        {/* ──── 8. PREMIUM BANNER ──── */}
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
            <button className="db-premium-cta">Go Pro</button>
          </div>
        </div>

        {/* ──── 9. VIDEO TRAINING HERO ──── */}
        {/* <div className="db-progress-hero video" onClick={() => navigate('hazard')}>
          <div className="db-progress-hero-content">
            <span className="db-progress-hero-label" style={{ color: 'rgba(255,255,255,0.7)' }}>VIDEO TRAINING</span>
            <h3>Hazard Awareness</h3>
            <p>3 of 6 training videos watched</p>
            <div className="db-progress-hero-bar-container">
              <div className="db-progress-hero-bar-fill" style={{ width: '50%', background: '#00C9A7' }} />
            </div>
            <button className="db-progress-hero-btn">
              Watch Next Video <ChevronRight size={14} />
            </button>
          </div>
          <div className="db-progress-hero-visual">
            <img src="/video_hero_illu_1774783645403.png" alt="Video Training" />
          </div>
        </div> */}

        {/* ──── 10. VIDEO REELS LIST ──── */}
        <div className="db-section-subheader">
          <h4>Video Quiz Reels</h4>
          <button onClick={() => navigate('hazard')}>See All</button>
        </div>
        <div className="db-reels-scroll">
          {reels.map((r) => (
            <div key={r.id} className="db-reel-card-compact" onClick={() => navigate('video-question', { videoId: r.id })}>
              <div className="db-reel-thumb-placeholder" style={{ background: `linear-gradient(135deg, ${r.color}22, ${r.color}44)` }}>
                {r.icon}
                <div className="db-reel-play-btn">
                  <Play size={12} fill="white" color="white" />
                </div>
              </div>
              <div className="db-reel-info">
                <p className="db-reel-title">{r.title.replace('\n', ' ')}</p>
                <div className="db-reel-meta">
                  <Clock size={10} /> {r.duration}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DashboardScreen;
