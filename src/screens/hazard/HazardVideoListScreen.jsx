import React from 'react';
import { ChevronLeft, Play, CheckCircle2 } from 'lucide-react';
import '../hazard.css';

const videosByCategory = {
  cgi: [
    { id: 1,  title: 'Pedestrian crossing the road',   duration: '1:05', status: 'completed', stars: 5 },
    { id: 2,  title: 'Car pulling out from junction',   duration: '0:58', status: 'completed', stars: 4 },
    { id: 3,  title: 'Cyclist swerving into your lane',  duration: '1:12', status: 'completed', stars: 3 },
    { id: 4,  title: 'Child running behind parked car',  duration: '0:52', status: 'completed', stars: 5 },
    { id: 5,  title: 'Lorry merging on motorway',       duration: '1:20', status: 'new' },
    { id: 6,  title: 'Roundabout with blind spot',       duration: '1:08', status: 'new' },
    { id: 7,  title: 'Emergency vehicle approaching',    duration: '0:55', status: 'new' },
    { id: 8,  title: 'Ice on the road surface',          duration: '1:15', status: 'new' },
    { id: 9,  title: 'Horse and rider on narrow lane',   duration: '1:02', status: 'new' },
    { id: 10, title: 'Bus stopping at bus stop',         duration: '0:48', status: 'new' },
  ],
  hd: [
    { id: 11, title: 'Urban high street pedestrians',     duration: '1:10', status: 'completed', stars: 4 },
    { id: 12, title: 'Traffic light change at junction',   duration: '1:03', status: 'completed', stars: 3 },
    { id: 13, title: 'Overtaking slow moving vehicle',     duration: '1:18', status: 'new' },
    { id: 14, title: 'School zone with children',          duration: '0:55', status: 'new' },
    { id: 15, title: 'Roadworks with temporary lights',    duration: '1:22', status: 'new' },
    { id: 16, title: 'Merging traffic on dual carriageway', duration: '1:05', status: 'new' },
    { id: 17, title: 'Parked van blocking visibility',     duration: '0:58', status: 'new' },
    { id: 18, title: 'Country lane with blind bends',      duration: '1:15', status: 'new' },
  ],
  sd: [
    { id: 19, title: 'Basic junction awareness',           duration: '0:50', status: 'completed', stars: 5 },
    { id: 20, title: 'Following a bus',                    duration: '0:48', status: 'new' },
    { id: 21, title: 'Car door opening ahead',             duration: '0:42', status: 'new' },
    { id: 22, title: 'Pedestrian on a zebra crossing',     duration: '0:55', status: 'new' },
    { id: 23, title: 'Speed limit change sign',            duration: '0:38', status: 'new' },
    { id: 24, title: 'Turning into residential road',      duration: '0:52', status: 'new' },
  ],
};

const categoryMeta = {
  cgi: { title: 'CGI Training', emoji: '🎮', gradient: 'linear-gradient(135deg, #4F8CFF, #7B61FF)' },
  hd:  { title: 'Real HD Clips', emoji: '🎬', gradient: 'linear-gradient(135deg, #00C9A7, #00B4D8)' },
  sd:  { title: 'Standard Clips', emoji: '📹', gradient: 'linear-gradient(135deg, #FF9500, #FF6B6B)' },
};

const HazardVideoListScreen = ({ navigate, onBack, categoryId = 'cgi' }) => {
  const videos = videosByCategory[categoryId] || videosByCategory.cgi;
  const meta = categoryMeta[categoryId] || categoryMeta.cgi;
  const completedCount = videos.filter(v => v.status === 'completed').length;

  return (
    <div className="screen animate-fade-in" style={{ padding: '20px', background: 'var(--bg-main)' }}>
      <header className="screen-header" style={{ marginBottom: 16 }}>
        <button className="back-btn" onClick={onBack}><ChevronLeft size={20} /></button>
        <h2 className="screen-title">{meta.title}</h2>
        <div style={{ width: 40 }} />
      </header>

      <div className="scroll-content" style={{ paddingBottom: 100 }}>
        {/* Category banner */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '12px 16px', borderRadius: 14, marginBottom: 16,
          background: meta.gradient + '10',
          border: '1px solid' + meta.gradient.slice(-8, -1) + '15)',
        }}>
          <span style={{ fontSize: 24 }}>{meta.emoji}</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700 }}>{completedCount}/{videos.length} videos completed</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <div style={{ flex: 1, height: 4, background: '#E5E5EA', borderRadius: 2, overflow: 'hidden', width: 100 }}>
                <div style={{ height: '100%', width: `${(completedCount / videos.length) * 100}%`, background: meta.gradient, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)' }}>{Math.round((completedCount / videos.length) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Video List */}
        {videos.map((video) => (
          <div
            key={video.id}
            className="hz-vlist-card"
            onClick={() => navigate('hazard-player', { videoId: video.id, categoryId })}
          >
            <div className="hz-vlist-thumb">
              <div className="hz-vlist-thumb-bg" style={{ background: meta.gradient }}>
                <span style={{ fontSize: 20, filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.3))' }}>
                  {meta.emoji}
                </span>
              </div>
              <span className="hz-vlist-duration">{video.duration}</span>
              <div className="hz-vlist-play">
                <div className="hz-vlist-play-icon">
                  <Play size={12} color="white" fill="white" />
                </div>
              </div>
            </div>
            <div className="hz-vlist-info">
              <p className="hz-vlist-title">{video.title}</p>
              <p className="hz-vlist-meta">Clip #{video.id} · {video.duration}</p>
              {video.status === 'completed' ? (
                <div className="hz-vlist-status" style={{ background: 'rgba(52,199,89,0.1)', color: '#34C759' }}>
                  <CheckCircle2 size={10} /> {'⭐'.repeat(video.stars)} {video.stars}/5
                </div>
              ) : (
                <div className="hz-vlist-status" style={{ background: 'rgba(79,140,255,0.1)', color: '#4F8CFF' }}>
                  ● New
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HazardVideoListScreen;
