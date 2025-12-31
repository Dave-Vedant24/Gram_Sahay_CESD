
import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { STATES, CATEGORIES, OCCUPATIONS, TRANSLATIONS } from '../constants';

interface ProfileFormProps {
  language: Language;
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ language, onSubmit, onBack }) => {
  const t = TRANSLATIONS[language];
  const [profile, setProfile] = useState<UserProfile>({
    age: '',
    gender: '',
    annualIncome: '',
    state: '',
    occupation: '',
    socialCategory: ''
  });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(profile).every(val => val !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(profile);
    }
  };

  return (
    <div className="gov-card">
      <div className="bg-[#003366] text-white px-8 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold uppercase tracking-wider">અરજદારની વિગતો (Applicant Details)</h3>
        <span className="text-[10px] bg-white/10 px-2 py-1 uppercase font-bold">બધી વિગતો ફરજિયાત છે</span>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
          {/* Section 1 */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2 text-xs uppercase tracking-widest">
                {t.ageLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={profile.age}
                onChange={(e) => handleChange('age', e.target.value)}
                placeholder="45"
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2 text-xs uppercase tracking-widest">
                {t.genderLabel} <span className="text-red-500">*</span>
              </label>
              <select 
                value={profile.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="form-input"
                required
              >
                <option value="">-- પસંદ કરો --</option>
                <option value="Male">{t.male}</option>
                <option value="Female">{t.female}</option>
                <option value="Other">{t.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2 text-xs uppercase tracking-widest">
                {t.catLabel} <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES[language].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleChange('socialCategory', cat)}
                    className={`text-left px-3 py-2 border text-xs font-bold transition ${profile.socialCategory === cat ? 'bg-[#003366] text-white border-[#003366]' : 'bg-gray-50 dark:bg-slate-900 border-gray-300 dark:border-slate-700 hover:bg-gray-100'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2 text-xs uppercase tracking-widest">
                {t.incomeLabel} <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={profile.annualIncome}
                onChange={(e) => handleChange('annualIncome', e.target.value)}
                placeholder="50000"
                className="form-input"
                required
              />
              <p className="mt-1 text-[10px] text-gray-400 font-bold uppercase">{t.incomeDesc}</p>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2 text-xs uppercase tracking-widest">
                {t.occLabel} <span className="text-red-500">*</span>
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => handleChange('occupation', e.target.value)}
                className="form-input"
                required
              >
                <option value="">-- પસંદ કરો --</option>
                {OCCUPATIONS[language].map(occ => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-slate-300 font-bold mb-2 text-xs uppercase tracking-widest">
                {t.stateLabel} <span className="text-red-500">*</span>
              </label>
              <select
                value={profile.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="form-input"
                required
              >
                <option value="">-- પસંદ કરો --</option>
                {STATES[language].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-200 dark:border-slate-700 pt-8">
          <button
            type="button"
            onClick={onBack}
            className="gov-btn-secondary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t.back}
          </button>
          
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`gov-btn-primary ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {t.showSchemes}
          </button>
        </div>
      </form>
    </div>
  );
};
