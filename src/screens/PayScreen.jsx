import React, { useState } from 'react';
import './PayScreen.css';
import { Search, ChevronRight } from 'lucide-react';

const CONTACTS = [
  { id: 1, name: 'Sarah', image: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Mike', image: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Emma', image: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'John', image: 'https://i.pravatar.cc/150?img=8' },
  { id: 5, name: 'Lisa', image: 'https://i.pravatar.cc/150?img=9' },
];

export default function PayScreen() {
  const [amount, setAmount] = useState('0');

  const handleKeypad = (num) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    if (amount.length > 1) {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount('0');
    }
  };

  return (
    <div className="screen-container pay-screen">
      <header className="page-header">
        <h2 className="page-title">Transfer</h2>
      </header>

      {/* Amount Input */}
      <div className="amount-section">
        <p className="amount-label">Enter Amount</p>
        <div className="amount-display">
          <span className="currency-symbol">$</span>
          <span className="amount-value">{amount}</span>
        </div>
        <div className="available-balance">
          Available: <span>$12,450.00</span>
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="contacts-section">
        <div className="search-bar">
          <Search size={20} color="var(--text-tertiary)" />
          <input type="text" placeholder="Search name or phone..." />
        </div>

        <h3 className="section-title">Recent</h3>
        <div className="contacts-scroll">
          <div className="contact-item add-new">
            <div className="contact-avatar">
              <span>+</span>
            </div>
            <p>New</p>
          </div>
          {CONTACTS.map(contact => (
            <div key={contact.id} className="contact-item">
              <div className="contact-avatar">
                <img src={contact.image} alt={contact.name} />
              </div>
              <p>{contact.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="action-bottom">
        <button className="swipe-btn">
          <span>Continue</span>
          <div className="swipe-icon">
            <ChevronRight size={20} />
          </div>
        </button>
      </div>
    </div>
  );
}
