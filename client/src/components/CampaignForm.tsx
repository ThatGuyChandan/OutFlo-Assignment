import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Campaign } from '../types';
import { campaignAPI } from '../services/api';

export const CampaignForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<Omit<Campaign, '_id'>>({
    name: '',
    description: '',
    status: 'INACTIVE',
    leads: [],
    accountIDs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [error, setError] = useState<string | null>(null);

  const { data: campaign } = useQuery({
    queryKey: ['campaign', id],
    queryFn: async () => {
      if (id) {
        const response = await campaignAPI.getById(id);
        return response.data;
      }
    },
    enabled: isEditMode,
  });

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
    }
  }, [campaign]);

  const mutation = useMutation({
    mutationFn: (data: Omit<Campaign, '_id'>) => {
      if (isEditMode && id) {
        return campaignAPI.update(id, data);
      }
      return campaignAPI.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
      navigate('/campaigns');
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || 'An error occurred while saving the campaign');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Campaign name is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Campaign description is required');
      return;
    }

    mutation.mutate(formData);
  };

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const leads = e.target.value.split('\n').filter(lead => lead.trim());
    setFormData(prev => ({ ...prev, leads }));
  };

  const handleAccountIDsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const accountIDs = e.target.value.split('\n').filter(id => id.trim());
    setFormData(prev => ({ ...prev, accountIDs }));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEditMode ? 'Edit Campaign' : 'Create Campaign'}
      </Typography>
      
      {(error || mutation.isError) && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Error creating campaign. Please try again.'}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            fullWidth
            error={!!error && !formData.name.trim()}
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            fullWidth
            multiline
            rows={3}
            error={!!error && !formData.description.trim()}
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Campaign['status'] }))}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="LinkedIn Profile URLs (one per line)"
            value={formData.leads.join('\n')}
            onChange={handleLeadChange}
            multiline
            rows={4}
            fullWidth
            helperText="Enter one LinkedIn profile URL per line"
          />

          <TextField
            label="Account IDs (one per line)"
            value={formData.accountIDs.join('\n')}
            onChange={handleAccountIDsChange}
            multiline
            rows={4}
            fullWidth
            helperText="Enter one account ID per line"
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button type="button" onClick={() => navigate('/campaigns')}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : (isEditMode ? 'Update' : 'Create')} Campaign
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}; 