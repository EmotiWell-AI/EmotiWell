const { Configuration, OpenAIApi } = require("openai");
const pool = require("../db.js");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function generateResponse(prompt) {
  return await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    temperature: 0,
    max_tokens: 3000,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
}

const saveMessage = async (sessionId, userMessage, botMessage) => {
  const query = `
    INSERT INTO Messages(session_id, message_text, message_advice)
    VALUES ($1, $2, $3);
  `;

  await pool.query(query, [sessionId, userMessage, botMessage]);
};


const getUserMessages = async (userId) => {
  try {
    const query = `
      SELECT m.message_text, m.message_advice
      FROM Messages m
      JOIN Sessions s ON m.session_id = s.id
      JOIN Users u ON s.user_id = u.id
      WHERE u.id = $1;
    `;

    const { rows } = await pool.query(query, [userId]);
    console.log(rows)

    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {getUserMessages, generateResponse, saveMessage};
