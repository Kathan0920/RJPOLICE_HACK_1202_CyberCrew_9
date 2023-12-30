// ChatBot.js

import React, { useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatBot = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/data");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const result = await response.json();
  //     setData(result);
  //     return result;
  //   } catch (error) {
  //     setError(error);
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const postData = async (bodyy) => {
    try {
      const response = await fetch('http://localhost:3000/api/postData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
          }
        ,
        body: JSON.stringify({query:bodyy}),
    });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
      return result
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };


  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [botResponse, setbotResponse] = useState({
    text: loading ? "Loding" : JSON.stringify(data),
    sender: "bot",
  });
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    const newMessages = [...messages, { text: inputValue, sender: "user" }];
    setMessages(newMessages);
    setInputValue("");
    // Simulate bot response (you may replace this with an actual API call)
    const formatOutput = async()=>{
        let temp = (await postData(inputValue)).message
        let output = temp;
        return output
    }
    const botResponse = {
      text: await formatOutput(),
      sender: "bot",
    };
    setMessages([...newMessages, botResponse]);
  };

  return (
    <div className="chat-bot-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            text={message.text}
            sender={message.sender}
          />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
