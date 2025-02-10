import React, { useState } from 'react';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const api = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { user: input, bot: '...' }]);

    try {
      const response = await axios.post(`${api}/chat`, {
        message: input,
      });

      console.log(`${api}/chat`);
      console.log(response);

      const botResponse = response.data.message || 'Sorry, I cannot help with that.';
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: botResponse } : msg
        )
      );
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: 'Error fetching response.' } : msg
        )
      );
    }

    setInput('');
  };

  return (
    <div className="chatbot-container p-4 border rounded-lg max-w-md mx-auto bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Marlabs Chatbot</h2>
      <div className="chat-window mb-4 h-64 overflow-y-scroll bg-white p-2 rounded border">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <div className="font-bold text-blue-600">User: {msg.user}</div>
            <div className="text-gray-800">Bot: {msg.bot}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-grow p-2 border rounded-l"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
