import React from 'react'
import Typography from './components/typography/Typography'
import ChatBot from './components/chatbot/ChatBot'

const App = () => {
  return (
    <div>
      <Typography variant="h1" color="primary">
        Chat Bot
      </Typography>
      <ChatBot />
    </div>
  )
}

export default App