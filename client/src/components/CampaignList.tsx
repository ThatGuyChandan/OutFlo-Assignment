import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  Typography,
  Button,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Campaign } from '../types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { campaignAPI } from '../services/api';

export const CampaignList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await campaignAPI.getAll();
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'ACTIVE' | 'INACTIVE' }) =>
      campaignAPI.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => campaignAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });

  if (isLoading) {
    return <Typography>Loading campaigns...</Typography>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Typography variant="h5">Campaigns</Typography>
        <Button variant="contained" color="primary" href="/campaigns/new">
          New Campaign
        </Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Leads</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns?.map((campaign: Campaign) => (
              <TableRow key={campaign._id}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.description}</TableCell>
                <TableCell>
                  <Switch
                    checked={campaign.status === 'ACTIVE'}
                    onChange={() => {
                      if (campaign._id) {
                        updateMutation.mutate({
                          id: campaign._id,
                          status: campaign.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                        });
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{campaign.leads.length}</TableCell>
                <TableCell>
                  <IconButton href={`/campaigns/edit/${campaign._id}`}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      if (campaign._id) {
                        deleteMutation.mutate(campaign._id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}; 