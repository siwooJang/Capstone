import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter } from 'next/router';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // AI 응답 로직 추가
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'bot' }]);
      }, 500);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) {
      router.push(path);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#2E3B55' }}>
        <Toolbar>
          {isMobile && (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose(null)}>
                <MenuItem onClick={() => handleMenuClose('/landing')}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuClose('/chatexplain')}>How to Use</MenuItem>
                <MenuItem onClick={() => handleMenuClose('/chatbot')}>Chatbot</MenuItem>
              </Menu>
            </>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff' }}>
          Deer AI Diary 심리 분석 챗봇
          </Typography>
          {!isMobile && (
            <>
              <Button color="inherit" onClick={() => router.push('/landing')} startIcon={<HomeIcon />}>
                Home
              </Button>
              <Button color="inherit" onClick={() => router.push('/chatexplain')} startIcon={<InfoIcon />}>
                How to Use
              </Button>
              <Button color="inherit" onClick={() => router.push('/chatbot')} startIcon={<ChatIcon />}>
                Chatbot
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '70vh',
            justifyContent: 'space-between',
            backgroundColor: '#F5F5F5',
            borderRadius: '12px',
            p: 3,
            boxShadow: 3,
          }}
        >
          <List sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                <ListItemText
                  primary={message.text}
                  secondary={message.sender === 'user' ? 'You' : 'AI'}
                  sx={{
                    backgroundColor: message.sender === 'user' ? '#BBDEFB' : '#C8E6C9',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    display: 'inline-block',
                  }}
                />
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              sx={{ mr: 2, backgroundColor: '#ffffff', borderRadius: '8px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ backgroundColor: '#2E3B55' }}>
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Chatbot;
