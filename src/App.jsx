import React, { useState } from 'react';
import {
  Home, BookOpen, ClipboardList, TrendingUp, User, AlertTriangle, Sparkles,
} from 'lucide-react';


import './App.css';

/* ONBOARDING SCREENS */
import VehicleSelectScreen from './screens/onboarding/VehicleSelectScreen';
import ExamDateScreen from './screens/onboarding/ExamDateScreen';
import FeatureSlidesScreen from './screens/onboarding/FeatureSlidesScreen';
import SubPlanScreen from './screens/onboarding/SubPlanScreen';
import LoginScreen from './screens/onboarding/LoginScreen';
import NameInputScreen from './screens/onboarding/NameInputScreen';
import WelcomeTransitionScreen from './screens/onboarding/WelcomeTransitionScreen';

/* APP SCREENS */
import SplashScreen from './screens/SplashScreen';
import DashboardScreen from './screens/DashboardScreen';
import PracticeTopicsScreen from './screens/PracticeTopicsScreen';
import QuestionScreen from './screens/QuestionScreen';
import MockTestListScreen from './screens/MockTestListScreen';
import MockTestInstructionScreen from './screens/MockTestInstructionScreen';
import MockTestScreen from './screens/MockTestScreen';
import ResultScreen from './screens/ResultScreen';
import VideoQuestionScreen from './screens/VideoQuestionScreen';
import AIScreen from './screens/AIScreen';
import ProgressScreen from './screens/ProgressScreen';
import AchievementScreen from './screens/AchievementScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

/* HAZARD PERCEPTION SCREENS */
import HazardHomeScreen from './screens/hazard/HazardHomeScreen';
import HazardCategoryScreen from './screens/hazard/HazardCategoryScreen';
import HazardVideoListScreen from './screens/hazard/HazardVideoListScreen';
import HazardPlayerScreen from './screens/hazard/HazardPlayerScreen';
import HazardMockListScreen from './screens/hazard/HazardMockListScreen';
import HazardMockPlayerScreen from './screens/hazard/HazardMockPlayerScreen';
import DriveCoachScreen from './screens/ai/DriveCoachScreen';


function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Onboarding state
  const [userData, setUserData] = useState({
    vehicle: null,
    examDate: null,
    plan: null,
    authMethod: null,
    name: 'Alex',
  });

  // Screen params (for passing data between screens)
  const [screenParams, setScreenParams] = useState({});

  const navigate = (screen, params = {}) => {
    setCurrentScreen(screen);
    setScreenParams(params);
    if (['home', 'stats', 'profile', 'hazard', 'drive-coach'].includes(screen)) {
      setActiveTab(screen);
    }


  };

  const renderScreen = () => {
    switch (currentScreen) {
      /* Splash */
      case 'splash':
        return <SplashScreen onFinish={() => navigate('ob-vehicle')} />;

      /* ONBOARDING FLOW */
      case 'ob-vehicle':
        return (
          <VehicleSelectScreen
            onNext={(vehicle) => {
              setUserData(d => ({ ...d, vehicle }));
              navigate('ob-date');
            }}
            onSkip={() => {
              setUserData(d => ({ ...d, vehicle: 'car', name: 'User' }));
              navigate('home');
            }}
          />

        );
      case 'ob-date':
        return (
          <ExamDateScreen
            onBack={() => navigate('ob-vehicle')}
            onNext={(examDate) => {
              setUserData(d => ({ ...d, examDate }));
              navigate('ob-features');
            }}
          />
        );
      case 'ob-features':
        return (
          <FeatureSlidesScreen
            onBack={() => navigate('ob-date')}
            onNext={() => navigate('ob-sub')}
          />
        );
      case 'ob-sub':
        return (
          <SubPlanScreen
            onBack={() => navigate('ob-features')}
            onNext={() => navigate('ob-login')}
          />
        );
      case 'ob-login':
        return (
          <LoginScreen
            onBack={() => navigate('ob-sub')}
            onNext={(authMethod) => {
              setUserData(d => ({ ...d, authMethod }));
              if (authMethod) {
                setUserData(d => ({ ...d, name: 'Alex' }));
                navigate('ob-welcome');
              } else {
                navigate('ob-name');
              }
            }}
          />
        );
      case 'ob-name':
        return (
          <NameInputScreen
            onBack={() => navigate('ob-login')}
            onNext={(name) => {
              setUserData(d => ({ ...d, name }));
              navigate('ob-welcome');
            }}
          />
        );
      case 'ob-welcome':
        return (
          <WelcomeTransitionScreen
            name={userData.name}
            onFinish={() => navigate('home')}
          />
        );

      /* APP SCREENS */
      case 'home':
        return (
          <DashboardScreen 
            navigate={navigate} 
            userName={userData.name} 
            vehicleType={userData.vehicle} 
            onUpdateVehicle={(v) => setUserData(d => ({ ...d, vehicle: v }))}
          />
        );

      /* Practice */
      case 'practice':
        return <PracticeTopicsScreen navigate={navigate} onBack={() => navigate('home')} />;
      case 'question':
        return <QuestionScreen onFinish={() => navigate('home')} onBack={() => navigate('practice')} topicId={screenParams.topicId} />;

      /* Mock Tests */
      case 'mock-list':
        return <MockTestListScreen navigate={navigate} onBack={() => navigate('home')} />;
      case 'mock-instruction':
        return (
          <MockTestInstructionScreen
            testId={screenParams.testId || 1}
            vehicleType={userData.vehicle}
            onBack={() => navigate('mock-list')}
            onStart={() => navigate('mocktest', { testId: screenParams.testId || 1 })}
          />
        );
      case 'mocktest':
        return <MockTestScreen testId={screenParams.testId || 1} onFinish={() => navigate('home')} onBack={() => navigate('home')} />;
      case 'result':
        return <ResultScreen navigate={navigate} onBack={() => navigate('home')} />;

      /* Video-based Q&A */
      case 'video-question':
        return <VideoQuestionScreen videoId={screenParams.videoId || 1} onBack={() => navigate('home')} />;

      /* ═══ HAZARD PERCEPTION MODULE ═══ */
      case 'hazard':
        return <HazardHomeScreen navigate={navigate} onBack={() => navigate('home')} />;
      case 'hazard-categories':
        return <HazardCategoryScreen navigate={navigate} onBack={() => navigate('hazard')} />;
      case 'hazard-video-list':
        return <HazardVideoListScreen navigate={navigate} onBack={() => navigate('hazard-categories')} categoryId={screenParams.categoryId} />;
      case 'hazard-player':
        return <HazardPlayerScreen onBack={() => navigate('hazard-video-list', { categoryId: screenParams.categoryId })} videoId={screenParams.videoId} />;
      case 'hazard-mock-list':
        return <HazardMockListScreen navigate={navigate} onBack={() => navigate('hazard')} />;
      case 'hazard-mock-player':
        return <HazardMockPlayerScreen onBack={() => navigate('hazard-mock-list')} testId={screenParams.testId} />;

      /* Other */
      /* Drive Coach AI (USP) */
      case 'drive-coach':
        return <DriveCoachScreen onBack={() => navigate('home')} vehicleType={userData.vehicle} />;
      case 'ai':
        return <AIScreen onBack={() => navigate('home')} />;

      case 'stats':
        return <ProgressScreen navigate={navigate} onBack={() => navigate('home')} />;
      case 'achievements':
        return <AchievementScreen onBack={() => navigate('home')} />;
      case 'subscribe':
        return <SubscriptionScreen onBack={() => navigate('home')} onFinish={() => navigate('home')} />;
      case 'profile':
        return (
          <ProfileScreen 
            navigate={navigate} 
            onBack={() => navigate('home')} 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            vehicleType={userData.vehicle}
            onChangeVehicle={(v) => setUserData(d => ({ ...d, vehicle: v }))}
          />
        );

      default:
        return <DashboardScreen navigate={navigate} userName={userData.name} vehicleType={userData.vehicle} />;
    }
  };

  const showNav = !['splash', 'ob-vehicle', 'ob-date', 'ob-features', 'ob-sub', 'ob-login', 'ob-name', 'ob-welcome', 'question', 'mocktest', 'mock-instruction', 'result', 'ai', 'video-question', 'hazard-player', 'hazard-mock-player', 'drive-coach'].includes(currentScreen);


  return (
    <div className={`device-frame ${darkMode ? 'dark-mode' : ''}`}>
      <div className="notch"></div>

      <div className="status-bar-fake">
        <div className="time">9:41</div>
        <div className="icons">
          <div className="network-signals"></div>
          <div className="wifi"></div>
          <div className="battery"></div>
        </div>
      </div>

      <div className="device-content">
        {renderScreen()}
      </div>

      {showNav && (
        <nav className="tab-bar">
          <button className={`tab-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>
            <Home size={22} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span>Home</span>
          </button>
          <button className={`tab-item ${activeTab === 'hazard' ? 'active' : ''}`} onClick={() => navigate('hazard')}>
            <AlertTriangle size={22} strokeWidth={activeTab === 'hazard' ? 2.5 : 2} />
            <span>Hazard</span>
          </button>

          <button className="tab-item-center" onClick={() => navigate('drive-coach')}>
            <div className="center-btn">
              <Sparkles color="white" size={24} fill="white" />
            </div>
          </button>

          <button className={`tab-item ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => navigate('stats')}>
            <TrendingUp size={22} strokeWidth={activeTab === 'stats' ? 2.5 : 2} />
            <span>Progress</span>
          </button>
          <button className={`tab-item ${activeTab === 'profile' || activeTab === 'settings' ? 'active' : ''}`} onClick={() => navigate('profile')}>
            <User size={22} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span>Account</span>
          </button>

        </nav>
      )}
    </div>
  );
}

export default App;
