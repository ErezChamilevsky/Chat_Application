const express = require('express');
const geminiController =  require('../controllers/geminiController.js');

const router = express.Router();

router.post('/simple', geminiController.simpleTest);

router.get('/session', geminiController.getSession);
router.post('/send', geminiController.sendChatMessage);
router.post('/save', geminiController.saveChatSession); 
router.post('/chat', geminiController.sendChatMessage);

router.post('/generate-question', geminiController.generateTestQuestion);
router.post('/check-answer', geminiController.checkAnswer);

module.exports = router;