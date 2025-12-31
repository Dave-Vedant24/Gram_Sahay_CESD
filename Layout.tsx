
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, language, onLanguageChange, isDarkMode, toggleDarkMode }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Accessibility Bar */}
      <div className="bg-[#111] text-white text-[11px] py-1.5 px-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center font-medium">
          <div className="flex space-x-4 items-center">
            <span className="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" className="h-3 mr-1.5 invert" alt="India Emblem" />
              ভারত সরকার | GOVERNMENT OF INDIA
            </span>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="flex space-x-2 border-r border-white/20 pr-4">
              <button className="hover:underline">Screen Reader Access</button>
              <button className="hover:underline px-1 border border-white/20">A-</button>
              <button className="hover:underline px-1 border border-white/20">A</button>
              <button className="hover:underline px-1 border border-white/20">A+</button>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="flex items-center space-x-1 hover:text-amber-400"
            >
              {isDarkMode ? (
                <><span className="w-3 h-3 bg-white rounded-full inline-block mr-1"></span> Light Mode</>
              ) : (
                <><span className="w-3 h-3 bg-black rounded-full inline-block mr-1 border border-white/20"></span> Dark Mode</>
              )}
            </button>
          </div>
        </div>
      </div>

      <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 border-b-[4px] border-[#003366]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem" className="h-14 dark:invert" />
            <div className="border-l border-gray-300 dark:border-slate-700 pl-4">
              <h1 className="text-2xl font-bold text-[#003366] dark:text-white tracking-tight leading-tight">
                {t.appName}
              </h1>
              <p className="text-[12px] text-gray-600 dark:text-slate-400 font-semibold uppercase">
                {t.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm">
              {(['en', 'hi', 'gu'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-4 py-1.5 text-xs font-bold transition-colors ${language === lang ? 'bg-[#003366] text-white' : 'text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
                >
                  {lang === 'en' ? 'ENGLISH' : lang === 'hi' ? 'हिन्दी' : 'ગુજરાતી'}
                </button>
              ))}
            </div>
            <img src="https://www.mygov.in/sites/all/themes/mygov/images/mygov-logo.png" className="h-10 dark:invert opacity-80 hidden sm:block" alt="MyGov" />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 max-w-6xl">
        {children}
      </main>

      <footer className="bg-[#222] text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
            <div className="col-span-1 md:col-span-1">
              <h4 className="font-bold text-white mb-6 uppercase border-b border-gray-700 pb-2">Links</h4>
              <ul className="space-y-3 opacity-80">
                <li><a href="#" className="hover:text-white hover:underline transition">National Portal of India</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Digital India</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">MyGov</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Ministry of Rural Development</a></li>
              </ul>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-bold text-white mb-6 uppercase border-b border-gray-700 pb-2">About {t.appName}</h4>
              <p className="leading-relaxed opacity-70 mb-4">
                This portal is designed to provide comprehensive information about various welfare schemes run by the Central and State Governments. 
                Our aim is to ensure that no citizen is left behind due to lack of information.
              </p>
              <p className="opacity-50 text-xs italic">
                Portal content is owned and maintained by the respective Ministry/Department.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6 uppercase border-b border-gray-700 pb-2">Contact</h4>
              <p className="opacity-80">Digital Seva Kendra</p>
              <p className="opacity-80 mt-1">Toll Free: 1800-11-2233</p>
              <p className="opacity-80 mt-1">Email: support-gram@gov.in</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[11px] opacity-60">
            <p>&copy; 2024 National Informatics Centre. {t.footerDisclaimer}</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:underline">Terms of Use</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Site Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
