const geminiService = require('../services/geminiService.js');
const dotenv = require("dotenv");
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


const generateQuestion = async (req, res) => {
    const { typeOfTest } = req.body;

    try {
        const responseText = await geminiService.generateQuestion(typeOfTest);
        res.json({ text: responseText });
    } catch (err) {
        console.error("generateTestQuestion controller error:", err);
        res.status(500).json({ error: err.message });
    }
};

const checkAnswer = async (req, res) => {
    const { type, questions, answers } = req.body;

    try {
        const grade = await geminiService.checkAnswer(type, questions, answers);
        res.json({ text: grade });
    } catch (err) {
        console.error("checkAnswer controller error:", err);
        res.status(500).json({ error: err.message });
    }
};




module.exports = {
    sendChatMessage,
    generateQuestion,
    checkAnswer,
    getSession,
    saveChatSession
}
