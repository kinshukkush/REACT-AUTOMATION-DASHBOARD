import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;

// Enhanced CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Request logging middleware with error handling
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// --- Data Types ---
interface AutomationTask {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string;
    result?: any;
}

interface ActivityItem {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: string;
    user?: string;
    metadata?: Record<string, any>;
}

interface MetricData {
    id: string;
    label: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
    icon: string;
}

interface OperationStatus {
    id: string;
    name: string;
    status: 'running' | 'stopped' | 'error' | 'warning';
    uptime: number;
    lastCheck: string;
    metrics: {
        cpu: number;
        memory: number;
        requests: number;
    };
}

// --- Initial State ---

let activityFeed: ActivityItem[] = [
    {
        id: '1',
        type: 'success',
        message: 'Deployment completed successfully',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        user: 'System',
    },
    {
        id: '2',
        type: 'warning',
        message: 'High memory usage detected on cache server',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
    },
    {
        id: '3',
        type: 'info',
        message: 'Database backup completed',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        user: 'Automated Task',
    },
    {
        id: '4',
        type: 'error',
        message: 'Failed to connect to external API',
        timestamp: new Date(Date.now() - 2400000).toISOString(),
    },
];

let metrics: MetricData[] = [
    {
        id: '1',
        label: 'Total Requests',
        value: 73420,
        change: 12.5,
        trend: 'up',
        icon: 'activity',
    },
    {
        id: '2',
        label: 'Active Users',
        value: 2847,
        change: 8.3,
        trend: 'up',
        icon: 'users',
    },
    {
        id: '3',
        label: 'Avg Response Time',
        value: 145,
        change: -5.2,
        trend: 'down',
        icon: 'zap',
    },
    {
        id: '4',
        label: 'Error Rate',
        value: 0.8,
        change: -15.4,
        trend: 'down',
        icon: 'alert-circle',
    },
];

let operations: OperationStatus[] = [
    {
        id: '1',
        name: 'API Gateway',
        status: 'running',
        uptime: 99.8,
        lastCheck: new Date().toISOString(),
        metrics: { cpu: 45, memory: 62, requests: 15420 },
    },
    {
        id: '2',
        name: 'Database Cluster',
        status: 'running',
        uptime: 99.9,
        lastCheck: new Date().toISOString(),
        metrics: { cpu: 38, memory: 71, requests: 8920 },
    },
    {
        id: '3',
        name: 'Cache Server',
        status: 'warning',
        uptime: 98.5,
        lastCheck: new Date().toISOString(),
        metrics: { cpu: 72, memory: 85, requests: 42100 },
    },
    {
        id: '4',
        name: 'Message Queue',
        status: 'running',
        uptime: 99.7,
        lastCheck: new Date().toISOString(),
        metrics: { cpu: 28, memory: 54, requests: 6780 },
    },
];

// --- Endpoints ---

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// Dashboard endpoints
app.get('/dashboard/metrics', (req, res) => {
    res.json(metrics);
});

app.get('/dashboard/summary', (req, res) => {
    const totalRequests = metrics.find(m => m.label === 'Total Requests')?.value || 0;
    const activeUsers = metrics.find(m => m.label === 'Active Users')?.value || 0;
    const avgResponseTime = metrics.find(m => m.label === 'Avg Response Time')?.value || 0;
    const errorRate = metrics.find(m => m.label === 'Error Rate')?.value || 0;

    res.json({
        totalRequests,
        activeUsers,
        avgResponseTime,
        errorRate,
        healthScore: Math.round(100 - (errorRate * 10 + (avgResponseTime / 10))),
        timestamp: new Date().toISOString()
    });
});

// Activity feed endpoints
app.get('/activity/feed', (req, res) => {
    const limit = parseInt(req.query.limit as string) || 50;
    res.json(activityFeed.slice(0, limit));
});

app.post('/activity/add', (req, res) => {
    const { type, message, user, metadata } = req.body;
    
    const newActivity: ActivityItem = {
        id: Math.random().toString(36).substr(2, 9),
        type: type || 'info',
        message,
        timestamp: new Date().toISOString(),
        user,
        metadata
    };
    
    activityFeed.unshift(newActivity);
    
    // Keep only last 100 activities
    if (activityFeed.length > 100) {
        activityFeed = activityFeed.slice(0, 100);
    }
    
    res.json(newActivity);
});

// Operations endpoints
app.get('/operations/status', (req, res) => {
    res.json(operations);
});

app.get('/operations/:id', (req, res) => {
    const operation = operations.find(op => op.id === req.params.id);
    if (operation) {
        res.json(operation);
    } else {
        res.status(404).json({ error: 'Operation not found' });
    }
});

app.patch('/operations/:id', (req, res) => {
    const { status } = req.body;
    const operation = operations.find(op => op.id === req.params.id);
    
    if (operation) {
        operation.status = status;
        operation.lastCheck = new Date().toISOString();
        res.json(operation);
    } else {
        res.status(404).json({ error: 'Operation not found' });
    }
});

app.post('/actions/execute', (req, res) => {
    const { action, parameters } = req.body;
    const taskName = parameters?.name || action;
    const taskDesc = parameters?.description || '';

    console.log(`Received action: ${action}`, parameters);

    // Logic to modify state based on action
    const lowerName = taskName.toLowerCase();
    const lowerDesc = taskDesc.toLowerCase();

    let resultLog = 'Action executed successfully';

    if (lowerName.includes('clear') && (lowerName.includes('log') || lowerDesc.includes('log'))) {
        // Clear Logs
        activityFeed = [];
        resultLog = 'Activity logs cleared';
        console.log('Logs cleared');
    } else if (lowerName.includes('reset') || lowerName.includes('zero') || lowerDesc.includes('zero')) {
        // Reset Metrics
        metrics = metrics.map(m => ({ ...m, value: 0, change: 0, trend: 'neutral' }));
        resultLog = 'Metrics reset to zero';
        console.log('Metrics reset');
    } else if (lowerName.includes('simulate') || lowerName.includes('traffic') || lowerName.includes('generate')) {
        // Simulate Traffic
        metrics = metrics.map(m => {
            if (m.label === 'Total Requests') {
                const increase = Math.floor(Math.random() * 500) + 100;
                return { ...m, value: m.value + increase, change: 12.5, trend: 'up' };
            } else if (m.label === 'Active Users') {
                const increase = Math.floor(Math.random() * 50) + 10;
                return { ...m, value: m.value + increase, change: 8.3, trend: 'up' };
            } else if (m.label === 'Avg Response Time') {
                return { ...m, value: Math.floor(Math.random() * 200) + 50, change: -5.2, trend: 'down' };
            } else if (m.label === 'Error Rate') {
                return { ...m, value: parseFloat((Math.random() * 2).toFixed(1)), change: -15.4, trend: 'down' };
            }
            return m;
        });
        resultLog = 'Traffic simulation started';
        console.log('Traffic simulated');
    } else if (lowerName.includes('restore') || lowerName.includes('default')) {
        // Restore Metrics
        metrics = [
            { id: '1', label: 'Total Requests', value: 73420, change: 12.5, trend: 'up', icon: 'activity' },
            { id: '2', label: 'Active Users', value: 2847, change: 8.3, trend: 'up', icon: 'users' },
            { id: '3', label: 'Avg Response Time', value: 145, change: -5.2, trend: 'down', icon: 'zap' },
            { id: '4', label: 'Error Rate', value: 0.8, change: -15.4, trend: 'down', icon: 'alert-circle' },
        ];
        resultLog = 'Metrics restored to defaults';
        console.log('Metrics restored');
    } else {
        // Default: Add to activity feed
        activityFeed.unshift({
            id: Math.random().toString(36).substr(2, 9),
            type: 'info',
            message: `Task executed: ${taskName}`,
            timestamp: new Date().toISOString(),
            user: 'Admin'
        });
    }

    // Simulate task execution
    const task: AutomationTask = {
        id: Math.random().toString(36).substr(2, 9),
        name: taskName,
        description: taskDesc || `Executed action: ${action}`,
        status: 'completed',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        result: { logs: [resultLog] }
    };

    // Return immediate success
    res.json(task);
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[ERROR]', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });
    
    res.status(err.status || 500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        path: req.path,
        message: `Endpoint ${req.method} ${req.path} does not exist`,
        timestamp: new Date().toISOString()
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║   AI Operations Dashboard - Backend Server     ║
╠════════════════════════════════════════════════╣
║  🚀 Server running on http://localhost:${PORT}    ║
║  📊 Status: Operational                        ║
║  🔧 Environment: ${process.env.NODE_ENV || 'development'}                   ║
║  ⏰ Started: ${new Date().toLocaleString()}           ║
╚════════════════════════════════════════════════╝
    `);
});
