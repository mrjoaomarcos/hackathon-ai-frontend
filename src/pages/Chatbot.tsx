import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import TypingIndicator from '../components/TypingIndicator';
import ReactMarkdown from 'react-markdown';

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [typing, setTyping] = useState(false);
  const api = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    // Add the user's message
    setMessages((prev) => [...prev, { user: input, bot: '' }]);
    setInput('');

    setTyping(true);
  
    try {
      const response = await axios.post(`${api}/chat`, {
        message: input,
      });
  
      console.log('Bot Response:', response.data);
  
      const botResponse = response.data?.message || 'Sorry, I cannot help with that.';
  
      // Add the bot's response as a new message
      setMessages((prev) => [...prev, { user: '', bot: botResponse }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, { user: '', bot: 'Error fetching response.' }]);
    }
    finally {
      setTyping(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Marlabs Chatbot
      </Typography>
      <Box
        sx={{
          height: 400,
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: 2,
          p: 2,
          mb: 2,
          bgcolor: '#f9f9f9',
        }}
      >
        {messages.map((msg, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Stack direction="row" justifyContent={msg.user ? 'flex-end' : 'flex-start'}>
              <Box
                sx={{
                  maxWidth: '75%',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: msg.user ? '#1976d2' : '#e0e0e0',
                  color: msg.user ? 'white' : 'black',
                }}
              >
                <Typography variant="body2">
                  {msg.user ? msg.user : <ReactMarkdown>{msg.bot}</ReactMarkdown>}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
        {typing && (
          <TypingIndicator />
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            variant="outlined"
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </Paper>
  );
};

export default Chatbot;
