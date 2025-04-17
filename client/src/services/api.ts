import axios from 'axios';
import { Campaign, LinkedInProfile, MessageResponse } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const campaignAPI = {
  getAll: () => api.get<Campaign[]>('/campaigns'),
  getById: (id: string) => api.get<Campaign>(`/campaigns/${id}`),
  create: (data: Omit<Campaign, '_id'>) => api.post<Campaign>('/campaigns', data),
  update: (id: string, data: Partial<Campaign>) => api.put<Campaign>(`/campaigns/${id}`, data),
  delete: (id: string) => api.delete(`/campaigns/${id}`),
};

export const messageAPI = {
  generate: (data: LinkedInProfile) => api.post<MessageResponse>('/messages/generate', data),
}; 