
export type Language = 'gu' | 'hi' | 'en';

export interface UserProfile {
  age: string;
  gender: string;
  annualIncome: string;
  state: string;
  occupation: string;
  socialCategory: string;
}

export interface Scheme {
  id: string;
  name: string;
  department: string;
  description: string;
  eligibilityCriteria: string[];
  benefits: string;
  applicationProcess: string;
  link?: string;
}

export interface SchemeRecommendationResponse {
  schemes: Scheme[];
  summary: string;
}

export enum FormStep {
  LOGIN,
  WELCOME,
  PROFILE,
  RESULTS
}
