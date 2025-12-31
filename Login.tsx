
import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LoginProps {
  language: Language;
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ language, onLogin }) => {
  const [mobile, setMobile] = useState('');
  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      onLogin();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="gov-card">
        <div className="bg-[#003366] px-8 py-6 text-white">
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-white/20 pb-2">{t.loginTitle}</h2>
          <p className="text-[10px] opacity-70 mt-2 font-bold uppercase tracking-tighter">પોતાના મોબાઇલ નંબર દ્વારા સુરક્ષિત લોગિન કરો</p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div>
            <label className="block text-gray-700 dark:text-slate-400 font-bold mb-3 text-xs uppercase tracking-widest">{t.mobileLabel}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="98XXXXXXXX"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-sm focus:ring-1 focus:ring-[#003366] transition dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={mobile.length !== 10}
            className={`w-full py-4 font-bold rounded-sm shadow-sm transition uppercase tracking-widest text-sm ${mobile.length === 10 ? 'bg-[#003366] text-white hover:bg-slate-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {t.loginBtn}
          </button>
        </form>
        
        <div className="bg-gray-50 dark:bg-slate-900/50 p-6 border-t border-gray-100 dark:border-slate-700">
          <p className="text-[10px] text-gray-500 dark:text-slate-500 uppercase font-bold text-center leading-relaxed">
            આ માહિતી ગુપ્ત રાખવામાં આવશે. આ પોર્ટલ રાષ્ટ્રીય માહિતી વિજ્ઞાન કેન્દ્ર (NIC) દ્વારા સંચાલિત છે.
          </p>
        </div>
      </div>
    </div>
  );
};
