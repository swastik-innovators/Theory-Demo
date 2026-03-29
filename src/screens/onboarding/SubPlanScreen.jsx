import React from 'react';
import './onboarding.css';
import { CheckCircle2, Star, Zap, X } from 'lucide-react';

const SubPlanScreen = ({ onNext, onBack }) => {
  return (
    <div className="ob-screen ob-subscription">
      <div className="ob-progress-bar">
        <div className="ob-progress-fill" style={{ width: '57%' }}></div>
      </div>

      <div className="ob-top-actions">
        <button className="ob-btn-back-sm" onClick={onBack}>&larr;</button>
        <button className="ob-skip-btn" onClick={onNext}>Skip</button>
      </div>

      <div className="ob-content sub-content">
        <div className="sub-hero">
          <div className="sub-icon-glow">
            <Star fill="white" color="white" size={32} />
          </div>
          <h1 className="ob-title">Unlock Everything</h1>
          <p className="ob-subtitle">Join 100,000+ drivers who passed first time</p>
        </div>

        {/* Comparison */}
        <div className="sub-comparison">
          {/* Free */}
          <div className="sub-plan-card free">
            <h4 className="sub-plan-name">Free</h4>
            <div className="sub-plan-price">
              <span className="price-value">£0</span>
              <span className="price-period">forever</span>
            </div>
            <ul className="sub-features-list">
              <li><CheckCircle2 size={16} color="#8E8E93" /> 50 Practice Questions</li>
              <li><CheckCircle2 size={16} color="#8E8E93" /> 1 Mock Test / Day</li>
              <li><X size={16} color="#D1D1D6" /> AI Study Buddy</li>
              <li><X size={16} color="#D1D1D6" /> Hazard Videos</li>
            </ul>
          </div>

          {/* Pro */}
          <div className="sub-plan-card pro">
            <div className="sub-plan-badge">BEST VALUE</div>
            <h4 className="sub-plan-name">Pro</h4>
            <div className="sub-plan-price">
              <span className="price-value">£7.99</span>
              <span className="price-period">/month</span>
            </div>
            <ul className="sub-features-list">
              <li><CheckCircle2 size={16} color="var(--success)" /> All 1,400 Questions</li>
              <li><CheckCircle2 size={16} color="var(--success)" /> Unlimited Mock Tests</li>
              <li><CheckCircle2 size={16} color="var(--success)" /> AI Study Buddy</li>
              <li><CheckCircle2 size={16} color="var(--success)" /> All Hazard Videos</li>
              <li><CheckCircle2 size={16} color="var(--success)" /> Pass Guarantee</li>
            </ul>

            <button className="ob-btn-primary sub-cta" onClick={onNext}>
              <Zap size={18} fill="white" /> Start 7-Day Free Trial
            </button>
          </div>
        </div>

        <p className="sub-disclaimer">Cancel anytime. No charge for 7 days.</p>
      </div>
    </div>
  );
};

export default SubPlanScreen;
