const express = require('express');
const geminiController =  require('../controllers/geminiController.js');

const router = express.Router();

router.post('/chat', geminiController.sendChatMessage);

router.post('/generate-question', geminiController.generateTestQuestion);
router.post('/check-answer', geminiController.checkAnswer);

module.exports = router;