# OutFlo - LinkedIn Outreach Automation

OutFlo is a web application that helps automate LinkedIn outreach campaigns by generating personalized messages based on LinkedIn profiles.

## Repository Setup

### Initial Setup (First Time Only)

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit"

# Add remote repository (replace with your repository URL)
git remote add origin <your-repository-url>

# Push to main branch
git push -u origin main
```

### Cloning the Repository (For New Developers)

```bash
# Clone the repository
git clone <repository-url>
cd OutFlo-Assignment

# Install dependencies
cd server && npm install
cd ../client && npm install
```

## Features

- Campaign Management
  - Create and manage outreach campaigns
  - Track campaign status and leads
  - Organize LinkedIn profiles and account IDs

- Message Generation
  - Generate personalized messages based on LinkedIn profiles
  - Customize message templates
  - Analyze profile data for better personalization

## Tech Stack

- **Frontend**
  - React.js with TypeScript
  - Material-UI for components
  - React Query for data fetching
  - React Router for navigation

- **Backend**
  - Node.js with Express
  - TypeScript
  - MongoDB for database
  - Mongoose for ODM

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd OutFlo-Assignment
```

### 2. Environment Setup

Create `.env` files in both client and server directories:

#### Server (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/outflo
NODE_ENV=development
```

#### Client (.env)
```env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_ENV=development
```

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Start Development Servers

#### Start Backend Server
```bash
cd server
npm run dev
```

#### Start Frontend Development Server
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

## Development Guide

### Project Structure

```
OutFlo-Assignment/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── ...
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── models/        # MongoDB models
│   │   └── ...
│   └── package.json
│
└── README.md
```

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Create feature branches for new developments

### API Documentation

The backend API endpoints are:

#### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get campaign by ID
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign

#### Messages
- `POST /api/messages/generate` - Generate personalized message

## Deployment

### Backend Deployment

1. Build the TypeScript code:
```bash
cd server
npm run build
```

2. Start the production server:
```bash
npm start
```

### Frontend Deployment

1. Build the React application:
```bash
cd client
npm run build
```

2. Deploy the `build` directory to your hosting service.

### Environment Variables

For production deployment, update the environment variables:

#### Server (.env)
```env
PORT=3000
MONGODB_URI=<your-mongodb-uri>
NODE_ENV=production
```

#### Client (.env)
```env
REACT_APP_API_URL=<your-api-url>
REACT_APP_ENV=production
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
