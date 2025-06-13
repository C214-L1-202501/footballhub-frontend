import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MobileMenu from './components/layout/MobileMenu';
import HomePage from './pages/HomePage';
import CountriesPage from './pages/CountriesPage';
import CountryDetailPage from './pages/CountryDetailPage';
import TeamsPage from './pages/TeamsPage';
import TeamDetailPage from './pages/TeamDetailPage';

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <div className="h-screen flex overflow-hidden bg-gray-100">
          <Sidebar />
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            onClose={() => setMobileMenuOpen(false)} 
          />
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <Header onMobileMenuClick={() => setMobileMenuOpen(true)} />
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/countries" element={<CountriesPage />} />
                    <Route path="/countries/:id" element={<CountryDetailPage />} />
                    <Route path="/teams" element={<TeamsPage />} />
                    <Route path="/teams/:id" element={<TeamDetailPage />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Router>
      </Provider>
  );
};

export default App;