const express = require('express');
const router = express.Router();
const { generateGeminiResponse } = require('../services/geminiService');

router.post('/ask', async (req, res) => {
    const { prompt } = req.body;

    try {
        const reply = await generateGeminiResponse(prompt);
        res.json({ reply });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
});

module.exports = router;
