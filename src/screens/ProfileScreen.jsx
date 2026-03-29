import React, { useState } from 'react';
import { 
  ChevronLeft, User, Bell, Shield, BookOpen, 
  HelpCircle, CreditCard, LogOut, ChevronRight, Award, TrendingUp,
  Moon, Sun, Car, Bike, Truck, Bus, ChevronDown
} from 'lucide-react';

const ProfileScreen = ({ navigate, onBack, darkMode, setDarkMode, vehicleType, onChangeVehicle }) => {
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);

  const vehicles = [
    { id: 'car', label: 'Car (Category B)', icon: <Car size={18} /> },
    { id: 'motorcycle', label: 'Motorcycle (Category A)', icon: <Bike size={18} /> },
    { id: 'lgv', label: 'LGV (Category C)', icon: <Truck size={18} /> },
    { id: 'pcv', label: 'PCV (Category D)', icon: <Bus size={18} /> },
  ];

  const currentVehicle = vehicles.find(v => v.id === vehicleType) || vehicles[0];

  return (
    <div className="screen profile-container animate-fade-in" style={{ padding: '0', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column' }}>
      <header className="screen-header" style={{ padding: '24px', marginBottom: '0' }}>
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title">Account</h2>
        <div style={{ width: '40px' }} />
      </header>
      
      <div className="scroll-content" style={{ padding: '0 24px 120px' }}>
        {/* User Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px', marginBottom: '24px', marginTop: '10px' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '48px', position: 'relative', marginBottom: '16px' }}>
            <img src="https://i.pravatar.cc/150?img=33" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
               <span style={{ fontSize: '12px', fontWeight: '800' }}>8</span>
            </div>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>Alex Reed</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>Member since March 2026</p>
          <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--bg-main)', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: '800' }}>1.2k</h4>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>XP EARNED</span>
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: '12px', background: 'var(--bg-main)', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: '800' }}>36</h4>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>TESTS DONE</span>
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div className="card" onClick={() => navigate('achievements')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', cursor: 'pointer' }}>
             <Award color="var(--warning)" size={20} />
             <span style={{ fontWeight: '800', fontSize: '14px' }}>Awards</span>
          </div>
          <div className="card" onClick={() => navigate('stats')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', cursor: 'pointer' }}>
             <TrendingUp color="var(--primary)" size={20} />
             <span style={{ fontWeight: '800', fontSize: '14px' }}>Full Stats</span>
          </div>
        </div>
        
        {/* merged Settings Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* VEHICLE DROPDOWN (NEW) */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-tertiary)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '12px', letterSpacing: '0.5px' }}>Learning Category</h4>
            <div className="card" style={{ padding: '0', overflow: 'visible', position: 'relative' }}>
               <div 
                 onClick={() => setIsVehicleOpen(!isVehicleOpen)}
                 style={{ display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer' }}
               >
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary-15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                    {React.cloneElement(currentVehicle.icon, { color: 'var(--primary)' })}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '800', fontSize: '15px' }}>{currentVehicle.label}</p>
                    <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Tap to change vehicle</span>
                  </div>
                  <ChevronDown size={18} color="#C7C7CC" style={{ transform: isVehicleOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
               </div>
               
               {isVehicleOpen && (
                 <div className="animate-slide-up" style={{ 
                   position: 'absolute', top: '100%', left: '0', width: '100%', 
                   background: 'var(--bg-card)', borderRadius: '20px', 
                   marginTop: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                   zIndex: 100, border: '1px solid rgba(0,0,0,0.05)',
                   overflow: 'hidden'
                 }}>
                    {vehicles.map((v) => (
                      <div 
                        key={v.id} 
                        onClick={() => { onChangeVehicle(v.id); setIsVehicleOpen(false); }}
                        style={{ 
                          display: 'flex', alignItems: 'center', padding: '16px', 
                          background: vehicleType === v.id ? 'var(--primary-15)' : 'transparent',
                          borderBottom: '1px solid rgba(0,0,0,0.02)',
                          cursor: 'pointer'
                        }}
                      >
                         <div style={{ color: vehicleType === v.id ? 'var(--primary)' : '#8E8E93', marginRight: '12px' }}>{v.icon}</div>
                         <span style={{ fontWeight: '700', fontSize: '14px', flex: 1 }}>{v.label}</span>
                         {vehicleType === v.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />}
                      </div>
                    ))}
                 </div>
               )}
            </div>
          </div>

          {/* APPEARANCE */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-tertiary)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '12px', letterSpacing: '0.5px' }}>Appearance</h4>
            <div className="card" style={{ padding: '0' }}>
               <div className="settings-item" onClick={() => setDarkMode(!darkMode)} style={{ border: 'none' }}>
                  <div className="settings-item-left">
                    <div className="settings-icon-wrap" style={{ background: '#7B61FF15' }}>
                      {darkMode ? <Moon size={18} color="#7B61FF" /> : <Sun size={18} color="#7B61FF" />}
                    </div>
                    <span style={{ fontSize: '15px' }}>Dark Mode</span>
                  </div>
                  <div className={`settings-toggle ${darkMode ? 'active' : ''}`}>
                    <div className="toggle-handle" />
                  </div>
               </div>
            </div>
          </div>

          {/* SUBSCRIPTION */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-tertiary)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '12px', letterSpacing: '0.5px' }}>Subscription</h4>
            <div className="card" style={{ padding: '0' }}>
               <div onClick={() => navigate('subscribe')} style={{ display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(79, 140, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                       <CreditCard size={20} color="var(--primary)" />
                   </div>
                   <div style={{ flex: 1 }}>
                       <p style={{ fontWeight: '800', fontSize: '15px' }}>DVSA Theory Pro</p>
                       <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Upgrade for 1,000+ questions</span>
                   </div>
                   <ChevronRight size={18} color="#C7C7CC" />
               </div>
            </div>
          </div>
          
          {/* PERSONAL & SUPPORT */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-tertiary)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '12px', letterSpacing: '0.5px' }}>Support & Privacy</h4>
            <div className="card" style={{ padding: '0' }}>
               <div style={{ display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer', borderBottom: '1px solid var(--bg-main)' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(52, 199, 89, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                       <Shield size={20} color="var(--success)" />
                   </div>
                   <p style={{ flex: 1, fontWeight: '800', fontSize: '15px' }}>Privacy Policy</p>
                   <ChevronRight size={18} color="#C7C7CC" />
               </div>
               <div style={{ display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255, 149, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                       <HelpCircle size={20} color="var(--warning)" />
                   </div>
                   <p style={{ flex: 1, fontWeight: '800', fontSize: '15px' }}>Help Center</p>
                   <ChevronRight size={18} color="#C7C7CC" />
               </div>
            </div>
          </div>
          
          <button className="settings-logout-btn" style={{ marginTop: '0' }}>
             <LogOut size={20} /> <span>Sign Out</span>
          </button>

          <div className="settings-version" style={{ marginBottom: '40px' }}>Version 1.4.2</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
