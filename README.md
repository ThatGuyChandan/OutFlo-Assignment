# OutFlo - LinkedIn Outreach Automation Platform

OutFlo is a powerful LinkedIn outreach automation platform that helps you manage campaigns and generate personalized messages for your LinkedIn connections. It streamlines your outreach process by allowing you to create campaigns, manage leads, and generate tailored messages efficiently.

## 🌟 Features

- **Campaign Management**
  - Create and manage multiple outreach campaigns
  - Track campaign status (Active/Inactive)
  - Organize leads and account IDs
  - Monitor campaign performance

- **Message Generation**
  - Generate personalized LinkedIn messages
  - Customize messages based on recipient's profile
  - Include relevant details like position, company, and interests
  - Save time with automated message creation

- **User-Friendly Interface**
  - Clean and intuitive dashboard
  - Easy campaign creation and management
  - Simple message generation process
  - Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/outflo.git
   cd outflo
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the development servers**
   ```bash
   # Start the server (from server directory)
   npm run dev

   # Start the client (from client directory)
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

## 📋 Usage

### Creating a Campaign

1. Navigate to the Campaigns page
2. Click "New Campaign"
3. Fill in the required details:
   - Campaign name
   - Description
   - Status (Active/Inactive)
   - LinkedIn profile URLs (one per line)
   - Account IDs (one per line)
4. Click "Create Campaign"

### Generating Messages

1. Go to the Message Generator page
2. Enter the recipient's details:
   - Name (required)
   - Position (required)
   - Company (optional)
   - Industry (optional)
   - Interests (optional)
   - Recent Activity (optional)
3. Click "Generate Message"
4. Review and customize the generated message

## 🛠️ Tech Stack

- **Frontend**
  - React.js
  - Material-UI
  - React Query
  - TypeScript

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## 🚀 Deployment

### Client Deployment

1. Build the React application:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `build` directory to your hosting service.

### Server Deployment

1. Set up your production environment variables:
   ```
   MONGODB_URI=your_production_mongodb_uri
   PORT=3000
   NODE_ENV=production
   ```

2. Start the production server:
   ```bash
   cd server
   npm start
   ```

### Deployment Platforms

The application can be deployed on various platforms:

- **Render.com**
  - Set up two services: one for the client and one for the server
  - Configure environment variables
  - Set the build command to `npm run build`
  - Set the start command to `npm start`

- **Heroku**
  - Create two apps: one for the client and one for the server
  - Configure environment variables
  - Deploy using Git or Heroku CLI

- **Vercel**
  - Deploy the client using Vercel's platform
  - Deploy the server separately

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@outflo.com or join our Slack channel.

---

Made with ❤️ by the OutFlo Team
