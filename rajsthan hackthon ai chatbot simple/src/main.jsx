import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Chatbot from './Chatbot.jsx'
import Applicationgenerator from './Applicationgenerator.jsx'
import Sample from './Samplee.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Applicationgenerator /> */}
    <Sample />
    <Chatbot />
  </React.StrictMode>,
)
