import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useInsights } from '../../hooks/useApi';
import { generateInsights } from '../../services/openai';

export const InsightsPanel = () => {
    const { data: insights, isLoading, error } = useInsights();
    const [aiInsight, setAiInsight] = useState<string>('');
    const [generatingAI, setGeneratingAI] = useState(false);

    useEffect(() => {
        const generateAIInsight = async () => {
            if (insights && insights.length > 0) {
                setGeneratingAI(true);
                try {
                    const dashboardData = {
                        totalInsights: insights.length,
                        criticalCount: insights.filter((i) => i.severity === 'critical').length,
                        warningCount: insights.filter((i) => i.severity === 'warning').length,
                    };
                    const response = await generateInsights(dashboardData);
                    setAiInsight(response);
                } catch (err) {
                    console.error('Failed to generate AI insight:', err);
                } finally {
                    setGeneratingAI(false);
                }
            }
        };

        generateAIInsight();
    }, [insights]);

    const severityColors = {
        info: 'border-blue-500/30 bg-blue-500/5',
        warning: 'border-yellow-500/30 bg-yellow-500/5',
        critical: 'border-red-500/30 bg-red-500/5',
    };

    const severityIcons = {
        info: '💡',
        warning: '⚠️',
        critical: '🚨',
    };

    if (isLoading) {
        return (
            <Card>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to load insights</span>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary-400" />
                <h3 className="text-lg font-semibold text-white">AI Insights</h3>
            </div>

            <div className="space-y-4">
                {/* AI Generated Summary */}
                {generatingAI ? (
                    <div className="glass p-4 rounded-lg flex items-center gap-3">
                        <Loader2 className="w-5 h-5 text-primary-400 animate-spin" />
                        <span className="text-sm text-gray-400">Generating AI insights...</span>
                    </div>
                ) : aiInsight ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-4 rounded-lg border border-primary-500/30"
                    >
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-primary-400 mb-1">AI Summary</p>
                                <p className="text-sm text-gray-300 whitespace-pre-line">{aiInsight}</p>
                            </div>
                        </div>
                    </motion.div>
                ) : null}

                {/* Insights List */}
                {insights?.map((insight, index) => (
                    <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${severityColors[insight.severity]}`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{severityIcons[insight.severity]}</span>
                            <div className="flex-1">
                                <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                                <p className="text-sm text-gray-400">{insight.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-gray-500">
                                        {new Date(insight.timestamp).toLocaleTimeString()}
                                    </span>
                                    {insight.aiGenerated && (
                                        <span className="text-xs px-2 py-0.5 bg-primary-500/20 text-primary-400 rounded">
                                            AI Generated
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
};
