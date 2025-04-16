import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { CampaignList } from './components/CampaignList';
import { CampaignForm } from './components/CampaignForm';
import { LinkedInMessageGenerator } from './components/LinkedInMessageGenerator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  OutFlo
                </Typography>
                <Button color="inherit" component={Link} to="/campaigns">
                  Campaigns
                </Button>
                <Button color="inherit" component={Link} to="/message-generator">
                  Message Generator
                </Button>
              </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
              <Routes>
                <Route path="/" element={<CampaignList />} />
                <Route path="/campaigns" element={<CampaignList />} />
                <Route path="/campaigns/new" element={<CampaignForm />} />
                <Route path="/campaigns/edit/:id" element={<CampaignForm />} />
                <Route path="/message-generator" element={<LinkedInMessageGenerator />} />
              </Routes>
            </Container>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
