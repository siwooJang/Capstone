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
import ProtectedRoute from './ProtectedRoute';
import { getChatGPTResponse } from '../api/openai';  // 실제 OpenAI API 함수 임포트
import { saveJournal } from '../api/journal';  // 실제 일기 저장 함수 임포트

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { content: input, role: 'user' };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');

      try {
        const botResponse = await getChatGPTResponse(updatedMessages);
        const botMessage = { content: botResponse, role: 'assistant' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
      }
    }
  };

  const handleEndChat = async () => {
    try {
      const userMessage = {role:'user',content:'좋아, 이제 지금까지 했던 대화 내용을 내가 쓴 일기 형식으로 요약해줘.'};
      const updatedMessages = [...messages, userMessage];
      const summary = await getChatGPTResponse(updatedMessages)
      
      const journal = {
        title: 'Test',
        content: summary,
        date: new Date().toISOString(),
        // 추가적인 사용자 정보 등을 포함할 수 있습니다.
      };
      
      await saveJournal(journal);
      console.log('Journal saved successfully');
      
      setMessages([{ content: '채팅이 끝났습니다. 이전 기록은 저장됩니다', role: 'system' }]);
    } catch (error) {
      console.error('Error summarizing conversation or saving journal:', error);
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
      <ProtectedRoute>
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
                <Button color="inherit" onClick={() => handleEndChat()} startIcon={<ChatIcon />}>
                  End Chat
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
                <ListItem key={index} sx={{ textAlign: message.role === 'user' ? 'right' : 'left' }}>
                  <ListItemText
                    primary={message.content}
                    secondary={message.role === 'user' ? 'You' : message.role === 'assistant' ? 'AI' : 'System'}
                    sx={{
                      backgroundColor: message.role === 'user' ? '#BBDEFB' : message.role === 'assistant' ? '#C8E6C9' : '#FFD54F',
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
      </ProtectedRoute>
    </>
  );
};

export default Chatbot;
