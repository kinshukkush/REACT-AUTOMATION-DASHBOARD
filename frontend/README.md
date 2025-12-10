# Frontend - AI Operations Dashboard

A modern, AI-powered React application for monitoring system operations, visualizing real-time metrics, and automating complex tasks.

## 📋 Overview

The frontend provides an intuitive, responsive dashboard with real-time data visualization, smooth animations, and comprehensive automation capabilities. Built with modern web technologies for optimal performance and user experience.

## ✨ Features

- **📊 Real-Time Monitoring**: Live system metrics with animated counters and trend indicators
- **📈 Interactive Charts**: Line, area, and bar charts for data visualization
- **⚡ Automation Hub**: Quick action buttons and custom task execution
- **🤖 AI Integration**: Puter.js integration for intelligent insights (free tier)
- **🎨 Modern UI**: Glassmorphism design with smooth Framer Motion animations
- **🔄 State Management**: React Query for efficient data fetching and caching
- **📱 Responsive**: Fully responsive design for all device sizes
- **🎯 Type Safety**: Full TypeScript support

## 🛠️ Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: TailwindCSS 4.x
- **Animations**: Framer Motion
- **State Management**: Zustand + React Query (@tanstack/react-query)
- **Charts**: Recharts
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **AI Service**: Puter.js (optional)

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend Connection

The frontend connects to the backend API at the URL specified in `VITE_API_BASE_URL`. Ensure the backend server is running before starting the frontend.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── automation/     # Automation components
│   │   ├── analytics/      # Analytics components
│   │   ├── settings/       # Settings components
│   │   └── ui/            # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Automation.tsx
│   │   ├── Analytics.tsx
│   │   ├── About.tsx
│   │   └── Settings.tsx
│   ├── services/           # API services
│   │   ├── api.ts         # Backend API client
│   │   └── openai.ts      # AI service integration
│   ├── hooks/              # Custom React hooks
│   │   ├── useApi.ts      # API hooks
│   │   └── useClickOutside.ts
│   ├── store/              # State management
│   │   └── useStore.ts
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── cn.ts
│   ├── layouts/            # Layout components
│   │   └── MainLayout.tsx
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
├── tailwind.config.js      # Tailwind config
└── README.md              # This file
```

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎨 Key Features

### Dashboard Page
- Real-time metrics cards with animated counters
- Interactive charts (line, area, bar)
- AI-powered insights panel
- Task recommendations
- Activity feed with recent events

### Automation Page
- Quick action buttons for predefined tasks
- Custom task execution form
- Execution status monitoring
- AI-powered summary generation

### Analytics Page
- Anomaly detection
- Performance trends
- Resource usage monitoring
- Advanced data visualization

### About Page
- Project overview
- Technology stack
- Quick start guide
- Automation command reference
- Project structure

### Settings Page
- API configuration
- User profile management
- System preferences

## 🔌 API Integration

The frontend communicates with the backend through Axios with:
- Automatic retry logic with exponential backoff
- Request/response interceptors
- Error handling
- Token-based authentication support

### Main API Hooks

```typescript
// Dashboard
useDashboardMetrics()      // Get current metrics
useActivityFeed()          // Get activity feed
useOperationsStatus()      // Get operations status

// Automation
useExecuteAction()         // Execute automation task

// Analytics
useTaskRecommendations()   // Get AI recommendations
useAnomalies()            // Get detected anomalies
useInsights()             // Get AI insights
```

## 🎭 UI Components

### Reusable Components
- `Card` - Styled card container
- `Button` - Customizable button with variants
- `Input` - Form input with labels
- `Modal` - Overlay modal
- `Skeleton` - Loading placeholders

### Design System
- **Colors**: Primary (blue), Accent (purple/pink), Success, Warning, Error
- **Spacing**: Consistent 4px grid system
- **Typography**: Inter font family
- **Animations**: Smooth transitions with Framer Motion

## 🤖 AI Features

The dashboard uses Puter.js for AI-powered features:
- Insight generation
- Anomaly explanations
- Task recommendations
- Summary generation

No API key required (uses free tier).

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebar
- Adaptive layouts

## 🔒 Security

- Environment variables for sensitive config
- CORS configuration
- Input validation
- XSS protection through React

## 🚀 Performance Optimizations

- Code splitting with React Router
- Lazy loading of components
- React Query for data caching
- Optimized bundle size with Vite
- Memoized components

## 🐛 Debugging

### Common Issues

**Backend connection failed:**
- Ensure backend is running on port 8000
- Check `VITE_API_BASE_URL` in `.env`

**Charts not rendering:**
- Check console for errors
- Verify data format matches chart expectations

**Animations not working:**
- Ensure Framer Motion is properly installed
- Check for CSS conflicts

## 📦 Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deployment Options

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **Static Hosting**: Upload `dist/` folder

## 📄 License

MIT
