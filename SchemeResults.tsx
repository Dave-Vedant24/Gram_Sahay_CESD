
import React, { useState, useRef } from 'react';
import { Scheme, SchemeRecommendationResponse, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { generateSpeech, decodeAudio } from '../services/geminiService';

interface SchemeResultsProps {
  language: Language;
  data: SchemeRecommendationResponse;
  onReset: () => void;
}

export const SchemeResults: React.FC<SchemeResultsProps> = ({ language, data, onReset }) => {
  const t = TRANSLATIONS[language];
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleSpeak = async (text: string) => {
    if (isSpeaking) {
      currentSourceRef.current?.stop();
      setIsSpeaking(false);
      return;
    }

    try {
      setIsSpeaking(true);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const base64 = await generateSpeech(text, language);
      const buffer = await decodeAudio(base64, audioContextRef.current);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.onended = () => setIsSpeaking(false);
      
      currentSourceRef.current = source;
      source.start();
    } catch (error) {
      console.error("Speech generation error", error);
      setIsSpeaking(false);
    }
  };

  if (selectedScheme) {
    return (
      <div className="gov-card animate-fadeIn">
        <div className="bg-[#003366] p-6 text-white border-b border-white/10">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setSelectedScheme(null)}
              className="text-xs font-bold bg-white/10 px-3 py-1 hover:bg-white/20 transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              પાછા જાઓ
            </button>
            <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{selectedScheme.department}</span>
          </div>
          <h3 className="text-2xl font-bold uppercase tracking-tight leading-tight">{selectedScheme.name}</h3>
        </div>

        <div className="p-8 space-y-10">
          <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-bold text-[#003366] dark:text-amber-500 mb-2 uppercase text-xs tracking-widest">{t.whatIsThis}</h4>
              <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed">{selectedScheme.description}</p>
            </div>
            <button 
              onClick={() => handleSpeak(selectedScheme.description)}
              className={`ml-6 p-3 rounded-sm transition ${isSpeaking ? 'bg-red-600 text-white' : 'bg-[#003366] text-white hover:bg-slate-800'}`}
              title={isSpeaking ? t.stopListen : t.listen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h4 className="font-bold text-gray-800 dark:text-white mb-4 uppercase text-sm border-b border-gray-200 dark:border-slate-700 pb-2">{t.keyBenefits}</h4>
              <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 text-green-800 dark:text-green-400 font-bold text-lg">
                {selectedScheme.benefits}
              </div>
            </section>

            <section>
              <h4 className="font-bold text-gray-800 dark:text-white mb-4 uppercase text-sm border-b border-gray-200 dark:border-slate-700 pb-2">{t.whoCanApply}</h4>
              <ul className="space-y-3">
                {selectedScheme.eligibilityCriteria.map((c, i) => (
                  <li key={i} className="flex items-start text-gray-600 dark:text-slate-400 text-sm">
                    <span className="text-[#003366] mr-2 font-bold">•</span> {c}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="bg-amber-50 dark:bg-amber-900/10 p-6 border border-amber-200 dark:border-amber-900/30">
            <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-2 uppercase text-xs tracking-widest">{t.howToApply}</h4>
            <p className="text-amber-800 dark:text-amber-300 mb-6 text-sm italic font-medium">
              {selectedScheme.applicationProcess}
            </p>
            {selectedScheme.link && (
              <a 
                href={selectedScheme.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#003366] text-white font-bold py-3 px-8 rounded-sm hover:bg-slate-800 transition uppercase tracking-widest text-xs"
              >
                {t.officialPortal} (સત્તાવાર લિંક)
              </a>
            )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-[#003366] dark:text-white uppercase tracking-wider">{t.resultsTitle}</h2>
        <button 
          onClick={onReset} 
          className="text-xs font-bold text-[#003366] dark:text-amber-500 hover:underline uppercase tracking-widest"
        >
          {t.changeDetails}
        </button>
      </div>

      <div className="gov-card p-6 bg-[#f9f9f9] dark:bg-slate-900 border-l-[6px] border-[#003366]">
        <div className="flex items-start">
          <div className="mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#003366] dark:text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#003366] dark:text-white uppercase tracking-widest mb-1">{t.quickSummary}</h3>
            <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{data.summary}</p>
          </div>
        </div>
      </div>

      <div className="gov-card overflow-hidden">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
              <th className="px-6 py-4 font-bold text-[#003366] dark:text-amber-500 uppercase tracking-widest text-xs">યોજનાનું નામ (Scheme Name)</th>
              <th className="px-6 py-4 font-bold text-[#003366] dark:text-amber-500 uppercase tracking-widest text-xs hidden md:table-cell">વિભાગ (Department)</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {data.schemes.map(scheme => (
              <tr key={scheme.id} className="hover:bg-gray-50 dark:hover:bg-slate-800 transition">
                <td className="px-6 py-5">
                  <div className="font-bold text-gray-800 dark:text-white">{scheme.name}</div>
                  <div className="text-[10px] text-gray-400 mt-1 line-clamp-1">{scheme.description}</div>
                </td>
                <td className="px-6 py-5 hidden md:table-cell">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">{scheme.department}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => setSelectedScheme(scheme)}
                    className="text-xs font-bold text-[#003366] dark:text-amber-500 border border-[#003366]/30 dark:border-amber-500/30 px-4 py-2 hover:bg-[#003366] hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-900 transition uppercase tracking-widest"
                  >
                    વિગત જુઓ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center p-4">
        <button onClick={onReset} className="gov-btn-secondary">
          ફરીથી શોધો (Search Again)
        </button>
      </div>
    </div>
  );
};
