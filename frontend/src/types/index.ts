// API Response Types
export interface MetricData {
    id: string;
    label: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'neutral';
    icon: string;
}

export interface ChartDataPoint {
    timestamp: string;
    value: number;
    label?: string;
}

export interface Insight {
    id: string;
    title: string;
    description: string;
    severity: 'info' | 'warning' | 'critical';
    timestamp: string;
    aiGenerated: boolean;
}

export interface TaskRecommendation {
    id: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    estimatedTime: string;
    category: string;
    aiReasoning: string;
}

export interface Anomaly {
    id: string;
    metric: string;
    detectedAt: string;
    severity: 'low' | 'medium' | 'high';
    expectedValue: number;
    actualValue: number;
    deviation: number;
    explanation?: string;
}

export interface OperationStatus {
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

export interface ActivityItem {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: string;
    user?: string;
    metadata?: Record<string, any>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

export interface ApiConfig {
    openaiKey: string;
    backendUrl: string;
}

export interface AutomationTask {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    createdAt: string;
    completedAt?: string;
    result?: any;
}

export interface Forecast {
    metric: string;
    predictions: Array<{
        timestamp: string;
        value: number;
        confidence: number;
    }>;
    accuracy: number;
    generatedAt: string;
}

// Store Types
export interface AppState {
    user: User | null;
    theme: 'dark' | 'light';
    apiConfig: ApiConfig;
    setUser: (user: User | null) => void;
    setTheme: (theme: 'dark' | 'light') => void;
    updateApiConfig: (config: Partial<ApiConfig>) => void;
}

// API Request Types
export interface ExecuteActionRequest {
    action: string;
    parameters?: Record<string, any>;
}

export interface GenerateInsightRequest {
    context: string;
    dataPoints?: any[];
}
