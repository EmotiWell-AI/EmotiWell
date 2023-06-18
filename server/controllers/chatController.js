const chatService = require('../services/chatService');
const axios = require('axios');
const getWelcomeMessage = (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
};

const getUserMessages = async (req, res) => {
  console.log(req.params.userId)
  try {
    const userId = req.params.userId;
    const messages = await chatService.getUserMessages(userId);
    res.json(messages);
  } catch (err) {
    console.error(err.message)
  }
}

const postPrompt = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const session_id = req.body.session_id;
    console.log(prompt)
    const response = await chatService.generateResponse(prompt);

    // Extract the bot's response
    console.log(response.data.choices[0])
    const botResponse = response.data.choices[0].text.trim();


    // Save the user's message and bot's response in your database
    await chatService.saveMessage(session_id, prompt, botResponse);

    // Send the bot's response back to the user
    res.status(200).send({ bot: botResponse });

  } catch (error) {
    console.error(error);
    res.status(500).send(error.message || "Something went wrong");
  }
};



module.exports = { getWelcomeMessage, getUserMessages, postPrompt };
