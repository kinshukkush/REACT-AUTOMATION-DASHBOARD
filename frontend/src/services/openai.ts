// Define Puter.js global interface
declare global {
    interface Window {
        puter: {
            ai: {
                chat: (prompt: string, options?: { model?: string; stream?: boolean }) => Promise<any>;
            };
        };
    }
}

export const generateAIResponse = async (prompt: string): Promise<string> => {
    try {
        // Check if puter is available
        if (!window.puter) {
            console.error("Puter.js not loaded");
            return "Error: AI service not initialized. Please refresh the page.";
        }

        const response = await window.puter.ai.chat(prompt, { model: "gpt-4o-mini" });

        // Puter returns the response content directly or as an object depending on usage
        if (typeof response === 'string') {
            return response;
        } else if (response?.message?.content) {
            return response.message.content;
        } else if (response?.text) {
            return response.text;
        }

        return JSON.stringify(response);

    } catch (error: any) {
        console.error("Error generating AI response via Puter:", error);
        return "Error generating response. Please check your connection.";
    }
};


export const generateTaskRecommendations = async (
    operationsData: any
): Promise<string> => {
    const prompt = `Based on the following operations data, suggest 2 prioritized tasks to improve system performance. Format as a JSON array of objects with keys: title, priority (high/medium/low), estimatedTime, reasoning. Data: ${JSON.stringify(operationsData)}`;
    return generateAIResponse(prompt);
};


export const summarizeAlerts = async (alerts: any[]): Promise<string> => {
    const prompt = `Summarize the following system alerts and suggest action items. Format with markdown headers. Alerts: ${JSON.stringify(alerts)}`;
    return generateAIResponse(prompt);
};


export const explainAnomaly = async (anomalyData: {
    metric: string;
    expectedValue: number;
    actualValue: number;
    timestamp: string;
}): Promise<string> => {
    const prompt = `Explain the following anomaly: Metric ${anomalyData.metric} was ${anomalyData.actualValue} (expected ${anomalyData.expectedValue}) at ${anomalyData.timestamp}. Provide possible causes, impact assessment, and recommended actions.`;
    return generateAIResponse(prompt);
};


export const forecastOperations = async (
    historicalData: any[],
    metric: string
): Promise<string> => {
    const prompt = `Based on the historical data, forecast the trend for ${metric} for the next 24 hours. Data: ${JSON.stringify(historicalData)}`;
    return generateAIResponse(prompt);
};


export const generateInsights = async (dashboardData: any): Promise<string> => {
    const prompt = `Analyze the following dashboard data and provide key insights and performance notes. Data: ${JSON.stringify(dashboardData)}`;
    return generateAIResponse(prompt);
};


export const suggestAutomation = async (
    taskDescription: string
): Promise<string> => {
    const prompt = `Suggest a Python or Bash automation script for the following task: ${taskDescription}. Provide the code and a brief explanation.`;
    return generateAIResponse(prompt);
};
