import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateTimeInsight = async (durationText: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Please provide an API Key to unlock AI insights.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `I have a duration of time: "${durationText}". 
      Give me 3 fascinating, unique, or historical facts about what can be achieved, 
      what naturally occurs, or what has happened in history during a timespan of exactly this length. 
      Keep it brief, engaging, and format it as a markdown list.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });
    return response.text || "No insight generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not generate insight at this moment.";
  }
};