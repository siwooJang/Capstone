import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  CssBaseline,
  useMediaQuery,
  useTheme,
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter } from 'next/router';

const ChatExplain = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);

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
            How to Use
          </Typography>
          {!isMobile && (
            <>
              <Button color="inherit" onClick={() => router.push('/landing')} startIcon={<HomeIcon />}>
                Home
              </Button>
              <Button color="inherit" onClick={() => router.push('/chatexplain')} startIcon={<InfoIcon />}>
                How to use
              </Button>
              <Button color="inherit" onClick={() => router.push('/chatbot')} startIcon={<ChatIcon />}>
                Chatbot
              </Button>
              
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4 }}>
        <Box sx={{ p: 3, backgroundColor: '#F5F5F5', borderRadius: '12px', boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>
            How to Use the AI Psychological Analysis Chatbot
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="1. Type your message in the input field at the bottom of the chat window." />
            </ListItem>
            <ListItem>
              <ListItemText primary="2. Click the 'Send' button or press Enter to send your message." />
            </ListItem>
            <ListItem>
              <ListItemText primary="3. The chatbot will respond with a psychological analysis based on your input." />
            </ListItem>
            <ListItem>
              <ListItemText primary="4. Continue the conversation to gain more insights and understanding." />
            </ListItem>
            <ListItem>
              <ListItemText primary="5. Use the navigation bar to return to the home page or switch between pages." />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
};

export default ChatExplain;
