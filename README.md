# 🚀 AI Operations Dashboard

A comprehensive, full-stack solution for monitoring system operations, visualizing real-time metrics, and automating complex tasks with AI-powered intelligence.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.0-61dafb.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Automation Commands](#automation-commands)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Overview

The AI Operations Dashboard is a modern, full-stack web application designed to help you monitor, analyze, and optimize your infrastructure. It provides real-time data visualization, predictive analytics, anomaly detection, and intelligent automation capabilities.

### Key Highlights

- 📊 **Real-time Metrics**: Live monitoring of key performance indicators
- ⚡ **Automation Engine**: Execute complex tasks with predefined or custom commands
- 📈 **Advanced Analytics**: Anomaly detection and predictive insights
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🔒 **Secure**: Built with security best practices
- 🚀 **Fast**: Optimized for performance with React Query and efficient data handling

## ✨ Features

### Dashboard
- Real-time metrics visualization with trend indicators
- Interactive charts (Line, Area, Bar)
- Activity feed with recent events
- System status overview
- AI-powered insights and recommendations

### Automation
- Quick action buttons for common tasks
- Custom task execution
- Real-time execution status
- Task history and logs
- Predefined automation commands

### Analytics
- Anomaly detection
- Performance trends analysis
- Resource usage monitoring
- Predictive alerts

### Settings
- API configuration
- User profile management
- System preferences
- Theme customization

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4.x
- **Animations**: Framer Motion
- **State Management**: Zustand + React Query
- **Charts**: Recharts
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Middleware**: CORS, Body Parser

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "AI dashboard"
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```
Server will run on `http://localhost:8000`

**Terminal 2 - Frontend Dev Server:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

#### Option 2: Using npm scripts (from root directory)

You can also create a root `package.json` to run both concurrently.

### Accessing the Application

Open your browser and navigate to:
```
http://localhost:5173
```

The dashboard should be fully functional with the backend API running on port 8000.

## 📁 Project Structure

```
AI dashboard/
├── backend/                    # Backend server
│   ├── src/
│   │   └── server.ts          # Main server file with API endpoints
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   └── README.md              # Backend documentation
│
├── frontend/                   # Frontend application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── dashboard/    # Dashboard-specific components
│   │   │   ├── automation/   # Automation components
│   │   │   ├── analytics/    # Analytics components
│   │   │   ├── settings/     # Settings components
│   │   │   └── ui/           # Reusable UI components
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Automation.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── About.tsx
│   │   │   └── Settings.tsx
│   │   ├── services/         # API services
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # State management
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   ├── package.json          # Frontend dependencies
│   └── README.md             # Frontend documentation
│
└── README.md                  # This file
```

## ⚡ Automation Commands

The dashboard includes predefined automation commands that can be executed from the Automation page:

### Quick Actions

| Command | Description | Effect |
|---------|-------------|--------|
| **Clear Logs** | Remove all activity feed entries | Clears the activity history |
| **Reset Metrics** | Set all metrics to zero | Resets dashboard metrics |
| **Simulate Traffic** | Generate random traffic data | Updates metrics with random values |
| **Restore Defaults** | Restore original metric values | Resets to default baseline |

### Using Custom Commands

You can also create custom automation tasks by:
1. Navigate to the Automation page
2. Scroll to "Custom Automation Task"
3. Enter your task name and description
4. Click "Execute Task"

## 🔌 API Endpoints

### Dashboard
- `GET /health` - Health check endpoint
- `GET /dashboard/metrics` - Get current metrics
- `GET /dashboard/summary` - Get dashboard summary

### Activity
- `GET /activity/feed?limit=50` - Get activity feed
- `POST /activity/add` - Add new activity

### Operations
- `GET /operations/status` - Get all operations status
- `GET /operations/:id` - Get specific operation
- `PATCH /operations/:id` - Update operation status

### Actions
- `POST /actions/execute` - Execute automation task

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Create a `.env` file in the backend directory (optional):

```env
PORT=8000
NODE_ENV=development
```

## 🔧 Development

### Backend Development

```bash
cd backend

# Development with auto-reload
npm run dev

# Build
npm run build

# Production
npm start
```

### Frontend Development

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Quality

The project includes:
- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting

## 📦 Deployment

### Building for Production

**Backend:**
```bash
cd backend
npm run build
# Built files will be in dist/
```

**Frontend:**
```bash
cd frontend
npm run build
# Built files will be in dist/
```

### Deployment Options

- **Frontend**: Can be deployed to Vercel, Netlify, or any static hosting
- **Backend**: Can be deployed to Heroku, Railway, DigitalOcean, or AWS

### Production Environment Variables

Make sure to set:
- `VITE_API_BASE_URL` to your production API URL
- Backend `PORT` and `NODE_ENV=production`

## 📖 Additional Documentation

- **[Frontend README](./frontend/README.md)**: Detailed frontend documentation
- **[Backend README](./backend/README.md)**: Detailed backend documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with modern web technologies and best practices.

---

**Version**: 1.0.0  
**Last Updated**: December 2025
