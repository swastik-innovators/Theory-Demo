import React from 'react';
import { PLANS } from '../data/mockData';
import { ChevronLeft, CheckCircle2, Star, Zap } from 'lucide-react';

const SubscriptionScreen = ({ onBack, onFinish }) => {
  return (
    <div className="screen subscription-container animate-fade-in" style={{ padding: '24px', background: '#F9FAFB', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <div style={{ width: '40px' }}></div>
      </header>
      
      <div className="scroll-content">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--gradient-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 16px', boxShadow: 'var(--shadow-brand)' }}>
            <Star fill="white" size={32} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Unlock All Features</h1>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '15px' }}>Join 100,000+ drivers who passed on their first try.</p>
        </div>
        
        {/* Plans Container */}
        <div className="plans-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PLANS.map(plan => (
            <div key={plan.id} className="card plan-card" style={{ 
              position: 'relative', 
              padding: '24px', 
              border: plan.recommended ? '2px solid var(--primary)' : '1px solid #E5E5EA',
              background: plan.recommended ? 'white' : '#F9F0FF',
            }}>
              {plan.recommended && (
                <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '12px', textTransform: 'uppercase' }}>
                  Best Value
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>{plan.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '800' }}>{plan.price}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: '600' }}>{plan.period}</span>
                  </div>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: plan.recommended ? 'var(--gradient-primary)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={20} color={plan.recommended ? 'white' : 'var(--text-tertiary)'} fill={plan.recommended ? 'white' : 'none'} />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {plan.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={16} color="var(--success)" />
                    {feat}
                  </div>
                ))}
              </div>
              
              <button 
                className="btn btn-primary" 
                onClick={onFinish}
                style={{ 
                  background: plan.recommended ? 'var(--gradient-primary)' : 'white', 
                  color: plan.recommended ? 'white' : 'var(--primary)',
                  border: plan.recommended ? 'none' : '1px solid var(--primary)',
                  boxShadow: plan.recommended ? 'var(--shadow-brand)' : 'none'
                }}
              >
                {plan.recommended ? 'Start 7-Day Free Trial' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '24px', paddingBottom: '40px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: '1.4' }}>
            By subscribing, you agree to our Terms of Use and Privacy Policy. Subscriptions automatically renew unless cancelled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
