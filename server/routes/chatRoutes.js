const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

router.get("/hi", chatController.getWelcomeMessage);
router.get('/getAllUserMessage/:userId', chatController.getUserMessages);
router.post('/sendMessage', chatController.postPrompt);



module.exports = router;
