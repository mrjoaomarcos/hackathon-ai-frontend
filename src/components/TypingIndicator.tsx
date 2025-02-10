import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const TypingIndicator = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" alignItems="center">
      <span>{dots}</span>
    </Box>
  );
};

export default TypingIndicator;
