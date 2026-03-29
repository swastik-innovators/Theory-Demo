import React from 'react';
import './StatsScreen.css';
import { ShoppingBag, Coffee, Car, Home as HomeIcon } from 'lucide-react';

const CATEGORIES = [
  { id: 1, name: 'Shopping', amount: 850.50, color: 'var(--primary)', icon: <ShoppingBag size={20}/>, progress: 75 },
  { id: 2, name: 'Food & Dining', amount: 450.20, color: 'var(--error)', icon: <Coffee size={20}/>, progress: 45 },
  { id: 3, name: 'Transport', amount: 320.00, color: 'var(--secondary)', icon: <Car size={20}/>, progress: 35 },
  { id: 4, name: 'Housing', amount: 1500.00, color: 'var(--success)', icon: <HomeIcon size={20}/>, progress: 90 },
];

export default function StatsScreen() {
  return (
    <div className="screen-container stats-screen">
      <header className="page-header">
        <h2 className="page-title">Statistics</h2>
      </header>

      {/* Overview Card */}
      <div className="stats-overview">
        <div className="period-selector">
          <button className="period-btn active">Week</button>
          <button className="period-btn">Month</button>
          <button className="period-btn">Year</button>
        </div>

        <div className="chart-container">
          {/* Simple CSS-based circular progress / doughnut chart substitute */}
          <div className="doughnut-chart">
            <div className="chart-center">
              <span className="chart-label">Total Spent</span>
              <span className="chart-value">$3,120.70</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spending Categories */}
      <div className="categories-section">
        <div className="section-header">
          <h3 className="section-title">Top Categories</h3>
        </div>
        
        <div className="categories-list">
          {CATEGORIES.map(cat => (
            <div key={cat.id} className="category-card">
              <div className="cat-icon" style={{ color: cat.color, backgroundColor: `${cat.color}20` }}>
                {cat.icon}
              </div>
              <div className="cat-details">
                <div className="cat-header">
                  <h4 className="cat-name">{cat.name}</h4>
                  <span className="cat-amount">${cat.amount.toFixed(2)}</span>
                </div>
                <div className="progress-bg">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${cat.progress}%`, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
