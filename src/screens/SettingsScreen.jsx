import React from 'react';
import { ChevronLeft, Moon, Sun, Bell, Shield, Info, HelpCircle, LogOut, ChevronRight, Car, Bike, Truck, Bus } from 'lucide-react';
import './screens.css';

const SettingsScreen = ({ onBack, darkMode, setDarkMode, vehicleType, onChangeVehicle }) => {
  const vehicles = [
    { id: 'car', label: 'Car (Category B)', icon: <Car size={20} /> },
    { id: 'motorcycle', label: 'Motorcycle (Category A)', icon: <Bike size={20} /> },
    { id: 'lgv', label: 'LGV (Category C)', icon: <Truck size={20} /> },
    { id: 'pcv', label: 'PCV (Category D)', icon: <Bus size={20} /> },
  ];

  return (
    <div className="screen settings-container animate-fade-in" style={{ background: 'var(--bg-main)' }}>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="screen-title">Settings</h2>
        <div style={{ width: '40px' }} />
      </header>

      <div className="scroll-content" style={{ padding: '0 20px 100px' }}>
        
        {/* Appearance */}
        <section className="settings-section">
          <h3 className="settings-label">Appearance</h3>
          <div className="settings-group">
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-wrap" style={{ background: '#7B61FF15' }}>
                  {darkMode ? <Moon size={18} color="#7B61FF" /> : <Sun size={18} color="#7B61FF" />}
                </div>
                <span>Dark Mode</span>
              </div>
              <div className={`settings-toggle ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)}>
                <div className="toggle-handle" />
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Selection (CRITICAL FEATURE) */}
        <section className="settings-section">
          <h3 className="settings-label">Learning Category</h3>
          <div className="settings-group">
            {vehicles.map((v) => (
              <div key={v.id} className="settings-item" onClick={() => onChangeVehicle(v.id)}>
                <div className="settings-item-left">
                  <div className="settings-icon-wrap" style={{ 
                    background: vehicleType === v.id ? 'var(--primary-15)' : '#F2F2F7',
                    color: vehicleType === v.id ? 'var(--primary)' : '#8E8E93'
                  }}>
                    {v.icon}
                  </div>
                  <span style={{ fontWeight: vehicleType === v.id ? '700' : '500' }}>{v.label}</span>
                </div>
                {vehicleType === v.id && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Support & Legal */}
        <section className="settings-section">
          <h3 className="settings-label">App Support</h3>
          <div className="settings-group">
             {[
               { icon: <Bell size={18} />, label: 'Notifications', color: '#FF9500' },
               { icon: <Shield size={18} />, label: 'Privacy Policy', color: '#34C759' },
               { icon: <HelpCircle size={18} />, label: 'Help Center', color: '#00D1FF' },
               { icon: <Info size={18} />, label: 'About App', color: '#8E8E93' },
             ].map((item, i) => (
               <div key={i} className="settings-item">
                 <div className="settings-item-left">
                   <div className="settings-icon-wrap" style={{ background: `${item.color}15` }}>
                     {React.cloneElement(item.icon, { color: item.color })}
                   </div>
                   <span>{item.label}</span>
                 </div>
                 <ChevronRight size={16} color="#C7C7CC" />
               </div>
             ))}
          </div>
        </section>

        <button className="settings-logout-btn">
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

        <div className="settings-version">Version 1.4.2</div>

      </div>
    </div>
  );
};

export default SettingsScreen;
