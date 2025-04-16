import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { LinkedInProfile } from '../types';
import { messageAPI } from '../services/api';

export const LinkedInMessageGenerator: React.FC = () => {
  const [profile, setProfile] = useState<LinkedInProfile>({
    name: '',
    position: '',
    company: '',
    industry: '',
    interests: '',
    recentActivity: '',
  });

  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: LinkedInProfile) => messageAPI.generate(data),
    onSuccess: (response) => {
      if (response.data && response.data.message) {
        setGeneratedMessage(response.data.message);
        setError(null);
      }
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'An error occurred while generating the message');
      setGeneratedMessage('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!profile.name.trim()) {
      setError('Name is required');
      return;
    }
    
    if (!profile.position.trim()) {
      setError('Position is required');
      return;
    }

    mutation.mutate(profile);
  };

  const handleInputChange = (field: keyof LinkedInProfile) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        LinkedIn Message Generator
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          value={profile.name}
          onChange={handleInputChange('name')}
          fullWidth
          margin="normal"
          required
          error={!!error && !profile.name.trim()}
        />
        <TextField
          label="Position"
          value={profile.position}
          onChange={handleInputChange('position')}
          fullWidth
          margin="normal"
          required
          error={!!error && !profile.position.trim()}
        />
        <TextField
          label="Company"
          value={profile.company}
          onChange={handleInputChange('company')}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Industry"
          value={profile.industry}
          onChange={handleInputChange('industry')}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Interests"
          value={profile.interests}
          onChange={handleInputChange('interests')}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Recent Activity"
          value={profile.recentActivity}
          onChange={handleInputChange('recentActivity')}
          fullWidth
          margin="normal"
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={mutation.isPending}
          sx={{ mt: 2 }}
        >
          {mutation.isPending ? <CircularProgress size={24} /> : 'Generate Message'}
        </Button>
      </Box>

      {generatedMessage && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Message:
          </Typography>
          <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
            <Typography>{generatedMessage}</Typography>
          </Paper>
        </Box>
      )}
    </Paper>
  );
}; 