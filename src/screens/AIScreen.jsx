import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, Sparkles, MessageSquare, Info, Lightbulb } from 'lucide-react';
import './screens.css';

const SUGGESTIONS = [
  "What are blue road signs?",
  "How to stop in emergency?",
  "Explain motorway rules",
  "Hazard perception tips"
];

const AIScreen = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "Hello! I'm your AI Theory Assistant. How can I help you prepare for your test today?" }
  ]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text = input) => {
    const msgText = text.trim();
    if (!msgText) return;

    const userMsg = { id: Date.now(), type: 'user', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Auto AI reply
    setTimeout(() => {
      setIsTyping(false);
      let reply = "That's a great question! Generally, in the UK theory test, you should remember that circular signs give orders, triangular signs give warnings, and rectangular signs provide information.";
      if (msgText.toLowerCase().includes('blue')) {
        reply = "Blue circular signs usually indicate a mandatory requirement, like 'turn left ahead' or a minimum speed limit.";
      } else if (msgText.toLowerCase().includes('hazard')) {
        reply = "For hazard perception, look for 'developing hazards'—something that would cause you to change speed or direction. This includes pedestrians near the curb, or a car waiting to pull out.";
      }
      
      const aiMsg = { id: Date.now() + 1, type: 'ai', text: reply };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <div className="screen ai-container animate-fade-in" style={{ padding: '0', background: 'white', display: 'flex', flexDirection: 'column' }}>
      <header className="ai-header">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <div className="ai-header-main">
          <div className="ai-bot-avatar">
            <Sparkles size={18} color="white" fill="white" />
          </div>
          <div>
            <h2 className="ai-title">Theory Assistant</h2>
            <span className="ai-online-status">Online now</span>
          </div>
        </div>
        <button className="back-btn" style={{ background: 'none' }}><Info size={20} color="#8E8E93" /></button>
      </header>
      
      <div className="chat-messages scroll-content" style={{ flex: 1, padding: '20px' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble-wrap ${msg.type}`}>
            <div className={`chat-bubble ${msg.type}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble-wrap ai">
            <div className="chat-bubble ai typing">
              <span>●</span><span>●</span><span>●</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-footer">
        {messages.length === 1 && (
          <div className="chat-suggestions">
             {SUGGESTIONS.map((s, i) => (
               <button key={i} className="suggestion-chip" onClick={() => handleSend(s)}>
                 <Lightbulb size={12} /> {s}
               </button>
             ))}
          </div>
        )}
        
        <div className="chat-input-bar">
          <input 
            type="text" 
            placeholder="Ask me anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className={`send-btn ${input.trim() ? 'active' : ''}`} onClick={() => handleSend()}>
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIScreen;

