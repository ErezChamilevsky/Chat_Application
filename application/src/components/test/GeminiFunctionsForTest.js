// import { GoogleGenAI } from "@google/genai";
// import { THE_QUESTION_LEVEL, GEMINI_API_KEY, PROMPT_CHECK_USER_ANSWER_INSTRUCTION, PROMPT_INSTRUCTION_FOR_GENERATE_TEST } from "./TestConstStrings";

// export const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// export async function askGeminiToCheck({ question, answer }) {
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "Question: " + question + " Answer: " + answer,
//         config: {
//             systemInstruction: PROMPT_CHECK_USER_ANSWER_INSTRUCTION,
//         },
//     });
//     return response.text;
// }

// export async function generateGeminiQuestion({typeOfTest, EnglishLevel}){
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: "Give me English question",
//         config: {
//             systemInstruction: PROMPT_INSTRUCTION_FOR_GENERATE_TEST + typeOfTest + THE_QUESTION_LEVEL + EnglishLevel,
//         },
//     });
//     return response.text;
// }

export async function sendChatMessage(message, sessionId, englishLevel) {
    const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId, englishLevel })
    });
    return res.json();
}

export async function fetchTestQuestion(typeOfTest, EnglishLevel) {
    const res = await fetch('/api/gemini/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeOfTest, EnglishLevel })
    });
    return res.json();
}

export async function checkUserAnswer(question, answer) {
    const res = await fetch('/api/gemini/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer })
    });
    return res.json();
  }
