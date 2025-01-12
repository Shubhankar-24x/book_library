import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    setMessages([
      {
        text: "Hi! I'm GuideMaster. How can I assist you today?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const handleNewUserMessage = async (newMessage) => {
    const userMessage = {
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, {
        message: newMessage,
      });

      const botMessage = {
        text: response.data.reply,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage = {
        text: "Sorry, I couldn't process your request. Try again!",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const sendMessage = () => {
    if (inputValue.trim()) {
      handleNewUserMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>GuideMaster</h3>
          </div>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <p>{msg.text}</p>
                <span className="chat-timestamp">{msg.timestamp}</span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
