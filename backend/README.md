# Backend - AI Operations Dashboard

Node.js/Express backend server for the AI Operations Dashboard, providing RESTful API endpoints for managing dashboard metrics, activity feeds, operations status, and automation tasks.

## 📋 Overview

This backend service maintains in-memory state for system metrics, activity logs, and operation status. It handles automation task execution and provides real-time data for the frontend dashboard.

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Middleware**: CORS, Body Parser

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:8000`.

## 🔌 API Endpoints

### Health Check
- `GET /health` - Server health status with uptime and version

### Dashboard Endpoints
- `GET /dashboard/metrics` - Current system metrics (Requests, Users, Response Time, Error Rate)
- `GET /dashboard/summary` - Aggregated dashboard summary with health score

### Activity Feed
- `GET /activity/feed?limit=50` - Activity logs (supports pagination)
- `POST /activity/add` - Add new activity item

### Operations Status
- `GET /operations/status` - All operations/services status
- `GET /operations/:id` - Specific operation details
- `PATCH /operations/:id` - Update operation status

### Automation
- `POST /actions/execute` - Execute automation task

**Request Body:**
```json
{
  "action": "trigger_task",
  "parameters": {
    "name": "Task Name",
    "description": "Task description"
  }
}
```

## ⚡ Predefined Automation Commands

Special task names trigger specific actions:

| Task Name | Action |
|-----------|--------|
| **Clear Logs** | Clears all activity feed entries |
| **Reset Metrics** | Sets all metrics to zero |
| **Simulate Traffic** | Generates random traffic and updates metrics |
| **Restore Defaults** | Restores metrics to default values |

Any other task name will add an entry to the activity feed.

## 🔧 Development

### Available Scripts

```bash
# Start server (production)
npm start

# Development mode with auto-reload
npm run dev

# Build TypeScript
npm run build
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file:

```env
PORT=8000
NODE_ENV=development
```

## 📊 Data Models

### MetricData
```typescript
{
  id: string;
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}
```

### ActivityItem
```typescript
{
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: string;
  user?: string;
  metadata?: Record<string, any>;
}
```

## 🐛 Error Handling

- Comprehensive error handling middleware
- Request logging with timestamps
- 404 handler for undefined routes
- 500 error responses for server errors

## 📝 Notes

- Data is stored in-memory (resets on server restart)
- Activity feed limited to 100 most recent items
- CORS enabled for all origins (configure for production)
- All timestamps in ISO 8601 format

## 📄 License

MIT
