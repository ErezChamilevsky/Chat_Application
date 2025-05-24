const { GoogleGenAI } = require('@google/genai');
const {
    GEMINI_API_KEY,
    PROMPT_INSTRUCTION_FOR_CHAT,
    PROMPT_INSTRUCTION_FOR_GENERATE_TEST,
    PROMPT_CHECK_INSTRUCTION_FOR_USER_ANSWER
} = require('../config/constants.js');


const Session = require('../models/session.js');

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const chatSessions = {};

async function createSession() {
    console.log('geminiService: createSession');
    const session = await Session.create({ userId: 1 });
    return session._id.toString();
}

async function sendMessage(sessionId, message, englishLevel) {
    console.log('geminiService: sendMessage');

    if (!chatSessions[sessionId]) {
        const sessionDoc = await Session.findById(sessionId);
        const history = sessionDoc?.history || [];

        chatSessions[sessionId] = await ai.chats.create({
            model: 'gemini-2.0-flash',
            config: {
                systemInstruction: PROMPT_INSTRUCTION_FOR_CHAT + englishLevel,
            },
            history: history.length > 0 ? history : [
                { role: "user", parts: [{ text: "Hello" }] },
                { role: "model", parts: [{ text: "Hi! How can I help you today?" }] }
            ]
        });

        chatSessions[sessionId]._history = [...(history || [])];
    }

    const response = await chatSessions[sessionId].sendMessage({ message });

    chatSessions[sessionId]._history.push(
        { role: "user", parts: [{ text: message }] },
        { role: "model", parts: [{ text: response.text }] }
    );

    return response.text;
}

async function saveSession(sessionId) {
    console.log('geminiService: saveSession');

    const session = chatSessions[sessionId];
    if (!session || !session._history) {
        throw new Error("No session found or nothing to save.");
    }

    await Session.findByIdAndUpdate(sessionId, {
        $set: { history: session._history }
    });
}

async function generateQuestion(testType) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Give me English questions",
        config: {
            systemInstruction: PROMPT_INSTRUCTION_FOR_GENERATE_TEST + testType,
        },
    });
    return response.text;
}

async function checkAnswer(type, questions, answers) {
    if (!Array.isArray(questions) || !Array.isArray(answers) || questions.length !== answers.length) {
        throw new Error("Questions and answers must be arrays of equal length.");
    }

    const formattedInput = questions.map((question, i) =>
        `Q${i + 1}: ${question}\nA${i + 1}: ${answers[i]}`
    ).join('\n');

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: formattedInput,
        config: {
            systemInstruction: PROMPT_CHECK_INSTRUCTION_FOR_USER_ANSWER,
        },
    });

    return response.text;
}


module.exports = {
    createSession,
    sendMessage,
    saveSession,
    generateQuestion,
    checkAnswer
};
