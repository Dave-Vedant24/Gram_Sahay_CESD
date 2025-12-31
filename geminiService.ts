
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { UserProfile, SchemeRecommendationResponse, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const languageMap: Record<Language, string> = {
  gu: "Gujarati",
  hi: "Hindi",
  en: "English"
};

export async function getRecommendedSchemes(profile: UserProfile, lang: Language): Promise<SchemeRecommendationResponse> {
  const langName = languageMap[lang];
  const prompt = `
    Find and recommend the top 5 relevant Indian Government Welfare Schemes for the following villager profile:
    Age: ${profile.age}
    Gender: ${profile.gender}
    Annual Family Income: ₹${profile.annualIncome}
    State: ${profile.state}
    Occupation: ${profile.occupation}
    Social Category: ${profile.socialCategory}

    CRITICAL RULES:
    1. THE ENTIRE RESPONSE CONTENT (names, descriptions, benefits, process, summary) MUST BE IN ${langName.toUpperCase()} LANGUAGE.
    2. Focus on schemes like PM-Kisan, Ayushman Bharat, MGNREGA, PM Awas Yojana, Ujjwala Yojana, etc.
    3. Use simple, local terms that a villager can easily understand.
    4. Ensure strict eligibility matching based on income and age.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          schemes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                department: { type: Type.STRING },
                description: { type: Type.STRING },
                eligibilityCriteria: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                benefits: { type: Type.STRING },
                applicationProcess: { type: Type.STRING },
                link: { type: Type.STRING }
              },
              required: ["id", "name", "description", "benefits", "applicationProcess"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["schemes", "summary"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generateSpeech(text: string, lang: Language): Promise<string> {
  const langName = languageMap[lang];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read this information for a villager in ${langName} clearly: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("Audio generation failed");
  return base64Audio;
}

export async function decodeAudio(base64: string, ctx: AudioContext): Promise<AudioBuffer> {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const dataInt16 = new Int16Array(bytes.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}
