import { useState } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { UserProfile } from './components/UserProfile';
import { SkillFeed } from './components/SkillFeed';
import { RequestManagement } from './components/RequestManagement';

type Screen = 'login' | 'dashboard' | 'profile' | 'feed' | 'requests';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const navigateTo = (screen: Screen) => {
    if (screen === 'login') {
      handleLogout();
    } else {
      setCurrentScreen(screen);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SkillSwap
                </span>
              </div>
              <div className="hidden md:flex space-x-1">
                <NavButton
                  active={currentScreen === 'dashboard'}
                  onClick={() => navigateTo('dashboard')}
                >
                  Dashboard
                </NavButton>
                <NavButton
                  active={currentScreen === 'feed'}
                  onClick={() => navigateTo('feed')}
                >
                  Skill Feed
                </NavButton>
                <NavButton
                  active={currentScreen === 'requests'}
                  onClick={() => navigateTo('requests')}
                >
                  Requests
                </NavButton>
                <NavButton
                  active={currentScreen === 'profile'}
                  onClick={() => navigateTo('profile')}
                >
                  Profile
                </NavButton>
              </div>
            </div>
            <button
              onClick={() => navigateTo('login')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentScreen === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
        {currentScreen === 'profile' && <UserProfile />}
        {currentScreen === 'feed' && <SkillFeed />}
        {currentScreen === 'requests' && <RequestManagement />}
      </main>
    </div>
  );
}

function NavButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-blue-100 text-blue-700'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      {children}
    </button>
  );
}
