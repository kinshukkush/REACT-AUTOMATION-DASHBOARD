import axios from 'axios';
import type {
    OperationStatus,
    TaskRecommendation,
    Anomaly,
    AutomationTask,
    ExecuteActionRequest,
    ActivityItem,
    MetricData,
    Insight,
} from '../types';

// Create axios instance with base configuration
const getBaseURL = () => {
    // Check localStorage for saved backend URL
    const savedUrl = localStorage.getItem('api_base_url');
    if (savedUrl) return savedUrl;
    
    // Check for stored config
    const storedConfig = localStorage.getItem('ai-dashboard-storage');
    if (storedConfig) {
        try {
            const parsed = JSON.parse(storedConfig);
            if (parsed?.state?.apiConfig?.backendUrl) {
                return parsed.state.apiConfig.backendUrl;
            }
        } catch (e) {
            console.error('Error parsing stored config:', e);
        }
    }
    
    // Fallback to environment variable
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
};

const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Update base URL when it changes
if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
        if (e.key === 'api_base_url' && e.newValue) {
            api.defaults.baseURL = e.newValue;
        }
    });
}

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor with retry logic
api.interceptors.response.use(
    (response) => response,
    async (error: any) => {
        const config = error.config as any;

        // Retry logic with exponential backoff
        if (config && !config._retry && error.response?.status && error.response.status >= 500) {
            config._retry = true;
            config._retryCount = (config._retryCount || 0) + 1;

            if (config._retryCount <= 3) {
                const delay = Math.pow(2, config._retryCount) * 1000; // Exponential backoff
                await new Promise((resolve) => setTimeout(resolve, delay));
                return api(config);
            }
        }

        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

// API Methods

/**
 * Get current operations status
 */
/**
 * Get current operations status
 */
export const getOperationsStatus = async (): Promise<OperationStatus[]> => {
    try {
        const response = await api.get<OperationStatus[]>('/operations/status');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch operations status:', error);
        return [];
    }
};

/**
 * Get task recommendations
 */
export const getTaskRecommendations = async (): Promise<TaskRecommendation[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(getMockTaskRecommendations()), 600);
    });
};

/**
 * Get anomalies
 */
export const getAnomalies = async (): Promise<Anomaly[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(getMockAnomalies()), 700);
    });
};

/**
 * Execute automation action
 */
export const executeAction = async (request: ExecuteActionRequest): Promise<AutomationTask> => {
    try {
        const response = await api.post<AutomationTask>('/actions/execute', request);
        return response.data;
    } catch (error) {
        console.error('Failed to execute action:', error);
        throw error;
    }
};

/**
 * Get activity feed
 */
export const getActivityFeed = async (): Promise<ActivityItem[]> => {
    try {
        const response = await api.get<ActivityItem[]>('/activity/feed');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch activity feed:', error);
        return [];
    }
};

/**
 * Get dashboard metrics
 */
export const getDashboardMetrics = async (): Promise<MetricData[]> => {
    try {
        const response = await api.get<MetricData[]>('/dashboard/metrics');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch dashboard metrics:', error);
        return [];
    }
};

/**
 * Get insights
 */
export const getInsights = async (): Promise<Insight[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(getMockInsights()), 800);
    });
};

// Mock data for development (when backend is not available)

const getMockOperationsStatus = (): OperationStatus[] => [
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

const getMockTaskRecommendations = (): TaskRecommendation[] => [
    {
        id: '1',
        title: 'Optimize Cache Server Performance',
        description: 'Cache server is showing high memory usage. Consider implementing cache eviction policies.',
        priority: 'high',
        estimatedTime: '2-3 hours',
        category: 'Performance',
        aiReasoning: 'High memory usage (85%) detected on cache server with increasing request load.',
    },
    {
        id: '2',
        title: 'Review API Rate Limiting',
        description: 'API Gateway experiencing increased traffic. Update rate limiting rules to prevent abuse.',
        priority: 'medium',
        estimatedTime: '1 hour',
        category: 'Security',
        aiReasoning: 'Traffic patterns show 40% increase in requests over the past week.',
    },
    {
        id: '3',
        title: 'Database Index Optimization',
        description: 'Slow query performance detected. Add indexes to frequently queried columns.',
        priority: 'medium',
        estimatedTime: '3-4 hours',
        category: 'Database',
        aiReasoning: 'Query performance degradation observed in analytics endpoints.',
    },
];

const getMockAnomalies = (): Anomaly[] => [
    {
        id: '1',
        metric: 'API Response Time',
        detectedAt: new Date(Date.now() - 3600000).toISOString(),
        severity: 'high',
        expectedValue: 120,
        actualValue: 450,
        deviation: 275,
    },
    {
        id: '2',
        metric: 'Memory Usage',
        detectedAt: new Date(Date.now() - 7200000).toISOString(),
        severity: 'medium',
        expectedValue: 65,
        actualValue: 85,
        deviation: 30.8,
    },
];

const getMockActivityFeed = (): ActivityItem[] => [
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

const getMockMetrics = (): MetricData[] => [
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

const getMockInsights = (): Insight[] => [
    {
        id: '1',
        title: 'Traffic Surge Detected',
        description: 'API requests increased by 40% in the last 24 hours. Consider scaling resources.',
        severity: 'warning',
        timestamp: new Date().toISOString(),
        aiGenerated: true,
    },
    {
        id: '2',
        title: 'Performance Improvement',
        description: 'Average response time decreased by 15% after recent optimizations.',
        severity: 'info',
        timestamp: new Date().toISOString(),
        aiGenerated: true,
    },
    {
        id: '3',
        title: 'Cache Hit Rate Optimal',
        description: 'Cache hit rate is at 94%, indicating efficient caching strategy.',
        severity: 'info',
        timestamp: new Date().toISOString(),
        aiGenerated: true,
    },
];

export default api;
