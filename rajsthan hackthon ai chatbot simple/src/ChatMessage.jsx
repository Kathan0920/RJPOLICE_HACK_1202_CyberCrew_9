// ChatMessage.js

import React from 'react';

const ChatMessage = ({ text, sender }) => {
  let temp = [text]
  if(text.includes('..')){
    temp = text.split('..')
  }
  return (
    <div className={`chat-message ${sender}`}>

      <p>{temp.map((sub,index)=>{
        return <>{sub}<br /></>
      })}</p>
    </div>
  );
};

export default ChatMessage;
