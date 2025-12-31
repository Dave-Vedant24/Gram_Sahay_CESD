
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { ProfileForm } from './components/ProfileForm';
import { SchemeResults } from './components/SchemeResults';
import { UserProfile, SchemeRecommendationResponse, FormStep, Language } from './types';
import { getRecommendedSchemes } from './services/geminiService';
import { TRANSLATIONS } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('gu');
  const [step, setStep] = useState<FormStep>(FormStep.LOGIN);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<SchemeRecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const t = TRANSLATIONS[language];

  const handleLogin = () => {
    setStep(FormStep.WELCOME);
  };

  const handleStart = () => {
    setStep(FormStep.PROFILE);
  };

  const handleProfileSubmit = async (userData: UserProfile) => {
    setProfile(userData);
    setLoading(true);
    setError(null);
    try {
      const data = await getRecommendedSchemes(userData, language);
      setRecommendations(data);
      setStep(FormStep.RESULTS);
    } catch (err) {
      console.error(err);
      setError(t.errorTitle);
    } finally {
      setLoading(false);
    }
  };

  const resetToProfile = () => {
    setStep(FormStep.PROFILE);
    setRecommendations(null);
  };

  const goBackToWelcome = () => {
    setStep(FormStep.WELCOME);
    setProfile(null);
  };

  return (
    <Layout 
      language={language} 
      onLanguageChange={setLanguage}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#003366]/20 dark:border-amber-500/20 border-t-[#003366] dark:border-t-amber-500 rounded-full animate-spin mb-10"></div>
          </div>
          <h2 className="text-2xl font-bold text-[#003366] dark:text-amber-500 mb-4">{t.loadingTitle}</h2>
          <p className="text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
            {t.loadingDesc}
          </p>
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-slate-800 border border-red-500 p-10 rounded-lg text-center shadow-lg">
          <div className="text-red-500 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 uppercase">{t.errorTitle}</h3>
          <p className="text-gray-600 dark:text-slate-400 mb-10">{error}</p>
          <button 
            onClick={resetToProfile}
            className="bg-[#003366] text-white font-bold py-3 px-10 rounded hover:bg-slate-800 transition shadow-md"
          >
            {t.tryAgain}
          </button>
        </div>
      ) : (
        <>
          {step === FormStep.LOGIN && <Login language={language} onLogin={handleLogin} />}
          {step === FormStep.WELCOME && <Welcome language={language} onStart={handleStart} />}
          {step === FormStep.PROFILE && <ProfileForm language={language} onSubmit={handleProfileSubmit} onBack={goBackToWelcome} />}
          {step === FormStep.RESULTS && recommendations && (
            <SchemeResults language={language} data={recommendations} onReset={resetToProfile} />
          )}
        </>
      )}
    </Layout>
  );
};

export default App;
