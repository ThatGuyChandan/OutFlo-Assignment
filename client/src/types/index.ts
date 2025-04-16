export interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  leads: string[];
  accountIDs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LinkedInProfile {
  name: string;
  position: string;
  company: string;
  industry: string;
  interests: string;
  recentActivity: string;
}

export interface MessageResponse {
  message: string;
} 