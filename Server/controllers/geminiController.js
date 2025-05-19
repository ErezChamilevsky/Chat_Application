const geminiService = require('../services/geminiService.js');
const Session = require("../models/session.js");
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
const {
    GEMINI_API_KEY,
    PROMPT_INSTRUCTION_FOR_CHAT,
    PROMPT_CHECK_USER_ANSWER_INSTRUCTION,
    PROMPT_INSTRUCTION_FOR_GENERATE_TEST,
    THE_QUESTION_LEVEL
} = require("../config/constants.js");
dotenv.config();

const getSession = async (req, res) => {
    console.log("getSession");
    try {
        const sessionId = await geminiService.createSession();
        res.json({ msg: sessionId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const sendChatMessage = async (req, res) => {
    console.log("send message");
    const { message, sessionId, englishLevel } = req.body;

    try {
        const responseText = await geminiService.sendMessage(sessionId, message, englishLevel);
        res.json({ text: responseText });
    } catch (err) {
        console.error("sendChatMessage error:", err);
        res.status(500).json({ error: err.message });
    }
};

const saveChatSession = async (req, res) => {
    console.log("saveChatSession");
    const { sessionId } = req.body;

    try {
        await geminiService.saveSession(sessionId);
        res.json({ message: "Session saved." });
    } catch (err) {
        console.error("saveChatSession error:", err);
        res.status(500).json({ error: err.message });
    }
};


const generateTestQuestion = async (req, res) => {
    const { typeOfTest, EnglishLevel } = req.body;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: "Give me English question",
            config: {
                systemInstruction: PROMPT_INSTRUCTION_FOR_GENERATE_TEST + typeOfTest + THE_QUESTION_LEVEL + EnglishLevel,
            },
        });
        return res.json({ question: response.text });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const checkAnswer = async (req, res) => {
    const { question, answer } = req.body;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Question: ${question} Answer: ${answer}`,
            config: {
                systemInstruction: PROMPT_CHECK_USER_ANSWER_INSTRUCTION,
            },
        });
        return res.json({ feedback: response.text });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const simpleTest = async (req, res) => {
    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: "type me 'hey bro you made it'" }],
                },
            ],
        });
        
        return res.json({ output: result.text });

    } catch (err) {
        console.error("Gemini error:", err);
        res.status(500).json({ error: err.message });
    }
};


module.exports = {
    sendChatMessage,
    generateTestQuestion,
    checkAnswer,
    simpleTest,
    getSession,
    saveChatSession
}
