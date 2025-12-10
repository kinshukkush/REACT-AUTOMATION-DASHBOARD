import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, Clock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useTaskRecommendations } from '../../hooks/useApi';

export const RecommendationsPanel = () => {
    const { data: recommendations, isLoading, error } = useTaskRecommendations();

    const priorityColors = {
        low: 'text-blue-400 bg-blue-500/10',
        medium: 'text-yellow-400 bg-yellow-500/10',
        high: 'text-red-400 bg-red-500/10',
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
                    <span>Failed to load recommendations</span>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
                </div>
                <span className="text-sm text-gray-400">
                    {recommendations?.length || 0} tasks
                </span>
            </div>

            <div className="space-y-4">
                {recommendations?.map((task, index) => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group"
                    >
                        <Card hover className="!p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]
                                                }`}
                                        >
                                            {task.priority.toUpperCase()}
                                        </span>
                                        <span className="text-xs px-2 py-1 bg-dark-bg rounded-full text-gray-400">
                                            {task.category}
                                        </span>
                                    </div>

                                    <h4 className="font-medium text-white mb-1 group-hover:text-primary-400 transition-colors">
                                        {task.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 mb-3">{task.description}</p>

                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{task.estimatedTime}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" />
                                            <span>AI Suggested</span>
                                        </div>
                                    </div>

                                    {task.aiReasoning && (
                                        <div className="mt-3 p-3 bg-primary-500/5 border border-primary-500/20 rounded-lg">
                                            <p className="text-xs text-gray-400">
                                                <span className="font-medium text-primary-400">AI Reasoning:</span>{' '}
                                                {task.aiReasoning}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Card>
    );
};
