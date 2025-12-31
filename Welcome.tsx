
import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface WelcomeProps {
  language: Language;
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ language, onStart }) => {
  const t = TRANSLATIONS[language];
  return (
    <div className="space-y-6">
      <div className="gov-card overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-64 md:h-auto">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" alt="Rural India" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition" />
          </div>
          <div className="md:w-2/3 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#003366] dark:text-white mb-4 uppercase tracking-tight">{t.welcomeTitle}</h2>
            <p className="text-gray-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
              {t.welcomeDesc}
            </p>
            <div className="flex">
              <button
                onClick={onStart}
                className="bg-[#003366] hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-sm shadow-md transition flex items-center uppercase tracking-widest text-sm"
              >
                <span>{t.findSchemes}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="gov-card p-6 bg-[#f9f9f9] dark:bg-slate-800">
          <div className="text-[#003366] dark:text-amber-500 font-bold mb-3 uppercase text-xs tracking-widest border-b border-gray-200 dark:border-slate-700 pb-2">{t.easyToUse}</div>
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{t.easyToUseDesc}</p>
        </div>
        <div className="gov-card p-6 bg-[#f9f9f9] dark:bg-slate-800">
          <div className="text-[#003366] dark:text-amber-500 font-bold mb-3 uppercase text-xs tracking-widest border-b border-gray-200 dark:border-slate-700 pb-2">{t.aiPowered}</div>
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{t.aiPoweredDesc}</p>
        </div>
        <div className="gov-card p-6 bg-[#f9f9f9] dark:bg-slate-800">
          <div className="text-[#003366] dark:text-amber-500 font-bold mb-3 uppercase text-xs tracking-widest border-b border-gray-200 dark:border-slate-700 pb-2">{t.trustedInfo}</div>
          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{t.trustedInfoDesc}</p>
        </div>
      </div>
      
      <div className="gov-card p-4 text-center bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/30">
        <p className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-widest">
          નવીનતમ અપડેટ: પીએમ કિસાન યોજનાનો ૧૮મો હપ્તો જાહેર કરવામાં આવ્યો છે.
        </p>
      </div>
    </div>
  );
};
