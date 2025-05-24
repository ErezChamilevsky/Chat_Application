const express = require('express');
const geminiController =  require('../controllers/geminiController.js');

const router = express.Router();


router.get('/session', geminiController.getSession);
router.post('/send', geminiController.sendChatMessage);
router.post('/save', geminiController.saveChatSession); 

router.post('/generate-question', geminiController.generateQuestion);
router.post('/check-answers', geminiController.checkAnswer);

module.exports = router;