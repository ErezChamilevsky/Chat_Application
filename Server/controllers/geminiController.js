// controllers/geminiController.js
const { GoogleGenAI } = require("@google/genai");
const {
    GEMINI_API_KEY,
    PROMPT_INSTRUCTION_FOR_CHAT,
    PROMPT_CHECK_USER_ANSWER_INSTRUCTION,
    PROMPT_INSTRUCTION_FOR_GENERATE_TEST,
    THE_QUESTION_LEVEL
} = require("../config/constants.js");

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

let chatSessions = {}; // Optional: Store chat sessions by user or session ID

const sendChatMessage = async (req, res) => {
    console.log("we did it");
    const { message, sessionId, englishLevel } = req.body;

    try {
        if (!chatSessions[sessionId]) {
            chatSessions[sessionId] = await ai.chats.create({
                model: "gemini-2.0-flash",
                config: {
                    systemInstruction: PROMPT_INSTRUCTION_FOR_CHAT + englishLevel,
                },
                history: [
                    { role: "user", parts: [{ text: "Hello" }] },
                    { role: "model", parts: [{ text: "Hi! How can I help you today?" }] },
                ]
            });
        }

        const response = await chatSessions[sessionId].sendMessage({ message });
        return res.json({ text: response.text });

    } catch (err) {
        return res.status(500).json({ error: err.message });
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


module.exports = {
    sendChatMessage,
    generateTestQuestion,
    checkAnswer
}
