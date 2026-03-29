import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, User, Info, Lightbulb, Mic, 
  ChevronRight, Car, Bike, Truck, Bus, Calendar, 
  AlertTriangle, BookOpen, Clock, Heart, ArrowLeft
} from 'lucide-react';
import '../ai.css';



const DriveCoachScreen = ({ onBack, vehicleType: initialVehicle }) => {
  const [step, setStep] = useState('intro'); // 'intro', 'vehicle', 'date', 'difficulty', 'chat'
  const [onboardingData, setOnboardingData] = useState({
    vehicle: initialVehicle || 'car',
    testDate: '',
    difficulty: ''
  });
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (step === 'chat') {
       scrollToBottom();
    }
  }, [messages, isTyping, step]);

  const handleOnboardingNext = (data) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
    if (step === 'intro') setStep('vehicle');
    else if (step === 'vehicle') setStep('date');
    else if (step === 'date') setStep('difficulty');
    else if (step === 'difficulty') {
      setStep('chat');
      setMessages([
        { id: 1, type: 'ai', text: `Hi ${onboardingData.name || 'there'}! I'm Alex. I see you're preparing for your ${onboardingData.vehicle} test. Great question! How can I help you today?` }
      ]);
    }
  };

  const handleSend = (text = input) => {
    const msgText = text.trim();
    if (!msgText) return;

    const userMsg = { id: Date.now(), type: 'user', text: msgText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    
    // Simulating Alex's personality
    setTimeout(() => {
      setIsTyping(false);
      let response = { id: Date.now() + 1, type: 'ai', text: "" };
      
      const lowerText = msgText.toLowerCase();
      if (lowerText.includes('road signs')) {
        response.text = "Road signs are essential! Remember, red circles give orders, triangles warn you, and blue circles tell you what you must do. Here is a quick tip:";
        response.card = {
          title: "Pro Tip: Order Signs",
          icon: <Info size={16} color="var(--primary)" />,
          text: "Red circles are prohibitive. If you see a red circle with '50' inside, that is your maximum speed limit, not a suggestion!"
        };
      } else if (lowerText.includes('hazard')) {
        response.text = "Hazard perception is all about anticipation. You're looking for 'developing hazards'—things that make you change speed or direction. You're doing great, keep focusing!";
      } else if (lowerText.includes('test day')) {
        response.text = "Test day is exciting! My top tip: Get a good night's sleep and arrive 15 mins early. You've got this! 🚗";
      } else {
        response.text = "That's a brilliant question. As your coach, I recommend focusing on the 'Safety Code' for that. Want me to explain it in detail?";
      }

      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  /* ───── 1. ONBOARDING: INTRO ───── */
  if (step === 'intro') {
    return (
      <div className="dc-container screen animate-fade-in">
        <div className="dc-onboarding">
           <div className="dc-avatar-container">
              <img src="/alex_coach_avatar_1774771548311.png" alt="Alex Coach" className="dc-avatar-img" />
              <div className="dc-avatar-pulse" />
           </div>
           <h1 className="dc-intro-title">Meet Alex</h1>
           <p className="dc-intro-sub">“Hi, I'm Alex 👋 I'll help you pass your DVSA test faster. Think of me as your personal driving instructor, always in your pocket.”</p>
           
           <div className="dc-ob-card">
              <p style={{ fontSize: '15px', fontWeight: '500', color: '#48484A', marginBottom: '20px', lineHeight: '1.6' }}>
                I'll guide you through every lesson, track your progress, and help you master the rules of the road.
              </p>
              <button className="btn btn-primary" style={{ borderRadius: 20, padding: '18px 32px' }} onClick={() => setStep('vehicle')}>
                 Let's Start <ChevronRight size={18} />
              </button>
           </div>
        </div>
      </div>
    );
  }


  /* ───── 2. ONBOARDING: VEHICLE ───── */
  if (step === 'vehicle') {
    return (
      <div className="dc-container screen animate-fade-in">
        <div className="dc-onboarding">
          <div className="dc-ob-card">
            <h4>Which vehicle are you preparing for?</h4>
            <div className="dc-ob-options">
              {[
                { id: 'car', label: 'Car', icon: <Car size={20} /> },
                { id: 'motorcycle', label: 'Motorcycle', icon: <Bike size={20} /> },
                { id: 'lgv', label: 'LGV (Truck)', icon: <Truck size={20} /> },
                { id: 'pcv', label: 'PCV (Bus)', icon: <Bus size={20} /> },
              ].map(v => (
                <button key={v.id} className={`dc-ob-btn ${onboardingData.vehicle === v.id ? 'selected' : ''}`} onClick={() => handleOnboardingNext({ vehicle: v.id })}>
                  {v.icon} <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── 3. ONBOARDING: DATE ───── */
  if (step === 'date') {
    return (
      <div className="dc-container screen animate-fade-in">
        <div className="dc-onboarding">
          <div className="dc-ob-card">
             <h4>When is your test date?</h4>
             <p style={{ fontSize: 13, color: '#8E8E93', marginBottom: 20 }}>I'll create a study plan leading up to this day.</p>
             <div className="dc-ob-options">
               <button className="dc-ob-btn" onClick={() => handleOnboardingNext({ testDate: 'Within 1 month' })}>
                 <Clock size={20} /> <span>Within 1 Month</span>
               </button>
               <button className="dc-ob-btn" onClick={() => handleOnboardingNext({ testDate: '1-3 months' })}>
                 <Calendar size={20} /> <span>1-3 Months</span>
               </button>
               <button className="dc-ob-btn" onClick={() => handleOnboardingNext({ testDate: 'Not booked yet' })}>
                 <Heart size={20} /> <span>Not booked yet</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── 4. ONBOARDING: DIFFICULTY ───── */
  if (step === 'difficulty') {
    return (
      <div className="dc-container screen animate-fade-in">
        <div className="dc-onboarding">
          <div className="dc-ob-card">
             <h4>What do you find difficult?</h4>
             <div className="dc-ob-options">
               <button className="dc-ob-btn" onClick={() => handleOnboardingNext({ difficulty: 'signs' })}>
                 <AlertTriangle size={20} /> <span>Road Signs</span>
               </button>
               <button className="dc-ob-btn" onClick={() => handleOnboardingNext({ difficulty: 'hazard' })}>
                 <Sparkles size={20} /> <span>Hazard Perception</span>
               </button>
               <button className="dc-ob-btn" onClick={() => handleOnboardingNext({ difficulty: 'rules' })}>
                 <BookOpen size={20} /> <span>Rules of the Road</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  /* ───── 5. MAIN CHAT INTERFACE ───── */
  return (
    <div className="dc-container animate-fade-in">
      {/* Header */}
      <header className="dc-header">
        <button className="back-btn" style={{ background: 'none' }} onClick={onBack}>
          <ArrowLeft size={20} color="#1C1C1E" />
        </button>
        <div className="dc-header-avatar">
          <img src="/alex_coach_avatar_1774771548311.png" alt="Alex" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        </div>

        <div className="dc-header-info" style={{ flex: 1 }}>
          <h3>Alex – Driving Coach</h3>
          <div className="dc-header-status">
            <span /> Online
          </div>
        </div>
        <button className="back-btn" style={{ background: 'none' }}>
          <Info size={20} color="#8E8E93" />
        </button>
      </header>

      {/* Messages */}
      <div className="dc-chat-area">
        {messages.length === 0 && (
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', pading: 40 }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🚗</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Start your journey with Alex</h2>
              <p style={{ fontSize: 14, color: '#8E8E93', maxWidth: 240, lineHeight: 1.5 }}>
                 Ask anything about your driving test, road rules, or hazards. I'm here to help!
              </p>
           </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`dc-bubble ${m.type}`}>
            {m.text}
            {m.card && (
              <div className="dc-card">
                <div className="dc-card-title">
                  {m.card.icon} {m.card.title}
                </div>
                <p className="dc-card-content">{m.card.text}</p>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="dc-bubble ai">
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Footer */}
      <footer className="dc-footer">
        <div className="dc-suggestions">
           {[
             "Explain road signs",
             "Mock test tips",
             "Hazard perception help",
             "Test day tips"
           ].map((s, i) => (
             <button key={i} className="dc-chip" onClick={() => handleSend(s)}>
               <Lightbulb size={12} fill="rgba(79,140,255,0.1)" /> {s}
             </button>
           ))}
        </div>
        
        <div className="dc-input-wrap">
          <Mic size={20} color="#8E8E93" />
          <input 
            type="text" 
            placeholder="Ask anything about your test..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="dc-send-btn" onClick={() => handleSend()}>
            <Send size={18} color="white" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DriveCoachScreen;
