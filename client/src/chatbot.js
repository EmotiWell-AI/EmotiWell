import React, { useState } from 'react';
import axios from 'axios';
import './style/Chatbot.css';
// import './style/header.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

    const userMessage = {
      content: userInput,
      sender: 'user',
    };

    setMessages([...messages, userMessage]);
    setUserInput('');

    try {
      // Call your OpenAI API or any other chatbot service to handle the user's message
      const openAIResponse = await axios.post('http://localhost:3000/chat/sendMessage', {
        message: userInput,
      });

      // Extract the chatbot's response from the API response
      const chatbotMessage = {
        content: openAIResponse.data.message,
        sender: 'chatbot',
      };

      // Call your Hume API or any other NLP service for additional processing if needed
      const humeResponse = await axios.post('YOUR_HUME_API_ENDPOINT', {
        message: openAIResponse.data.message,
      });

      // Update the chatbot's response with any additional processed information from Hume API
      chatbotMessage.content = humeResponse.data.processedMessage;

      // Update the messages state with the chatbot's response
      setMessages([...messages, chatbotMessage]);
    } catch (error) {
      console.error('Error occurred while fetching chatbot response:', error);
      // Handle error scenarios if API calls fail
    }
  };

  return (
    <div className="chatbot-container">
         <header className="chatbot-header">
            <nav className='navbar'>
                <div className="logo">EmotiWell</div>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                    </ul>
            </nav>
        </header>
      <div className="chatbot-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'chatbot'}`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleMessageSubmit} className="message-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="How are you feeling today..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
   
    
  );
};

export default Chatbot;
