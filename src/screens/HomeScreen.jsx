import React from 'react';
import './HomeScreen.css';
import { Bell, ArrowUpRight, ArrowDownLeft, Plus, MoreHorizontal } from 'lucide-react';

const TRANSACTIONS = [
  { id: 1, name: 'Apple Store', date: 'Today, 10:24 AM', amount: -99.00, type: 'expense', icon: '🍎' },
  { id: 2, name: 'Salary', date: 'Yesterday', amount: 4500.00, type: 'income', icon: '💰' },
  { id: 3, name: 'Uber', date: 'Yesterday', amount: -24.50, type: 'expense', icon: '🚗' },
  { id: 4, name: 'Netflix', date: 'Oct 14', amount: -15.99, type: 'expense', icon: '🎬' },
];

export default function HomeScreen() {
  return (
    <div className="screen-container home-screen">
      {/* Header section */}
      <header className="home-header">
        <div className="user-profile">
          <div className="avatar">
            <img src="https://i.pravatar.cc/150?img=32" alt="Profile" />
          </div>
          <div className="greeting">
            <p className="greeting-text">Good morning,</p>
            <h2 className="user-name">Alex Reed</h2>
          </div>
        </div>
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
      </header>

      {/* Balance Card Section */}
      <section className="balance-section">
        <div className="balance-card">
          <div className="balance-header">
            <p className="balance-label">Total Balance</p>
            <button className="currency-btn">USD <MoreHorizontal size={16} /></button>
          </div>
          <h1 className="balance-amount">$12,450.00</h1>
          
          <div className="card-actions">
            <button className="action-btn">
              <div className="action-icon bg-primary">
                <ArrowUpRight size={20} />
              </div>
              <span>Send</span>
            </button>
            <button className="action-btn">
              <div className="action-icon bg-secondary">
                <ArrowDownLeft size={20} />
              </div>
              <span>Request</span>
            </button>
            <button className="action-btn">
              <div className="action-icon bg-gray">
                <Plus size={20} />
              </div>
              <span>Top Up</span>
            </button>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="transactions-section">
        <div className="section-header">
          <h3 className="section-title">Recent Transactions</h3>
          <button className="see-all-btn">See All</button>
        </div>
        
        <div className="transactions-list">
          {TRANSACTIONS.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div className="tx-icon">{tx.icon}</div>
              <div className="tx-details">
                <h4 className="tx-name">{tx.name}</h4>
                <p className="tx-date">{tx.date}</p>
              </div>
              <div className={`tx-amount ${tx.type}`}>
                {tx.type === 'income' ? '+' : ''}{tx.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
