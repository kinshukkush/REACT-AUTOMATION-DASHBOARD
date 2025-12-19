import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import {
    Activity,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Info,
    Loader2,
    AlertCircle,
    ChevronRight,
} from 'lucide-react';
import { useActivityFeed } from '../../hooks/useApi';

export const ActivityFeed = () => {
    const { data: activities, isLoading, error } = useActivityFeed();

    const typeIcons = {
        info: Info,
        success: CheckCircle,
        warning: AlertTriangle,
        error: XCircle,
    };

    const typeColors = {
        info: 'text-blue-400 bg-blue-500/10',
        success: 'text-green-400 bg-green-500/10',
        warning: 'text-yellow-400 bg-yellow-500/10',
        error: 'text-red-400 bg-red-500/10',
    };

    const getRelativeTime = (timestamp: string) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = Math.floor((now.getTime() - time.getTime()) / 1000);

        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
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
                    <span>Failed to load activity feed</span>
                </div>
            </Card>
        );
    }

    const stats = {
        total: activities?.length || 0,
        success: activities?.filter(a => a.type === 'success').length || 0,
        warnings: activities?.filter(a => a.type === 'warning').length || 0,
        errors: activities?.filter(a => a.type === 'error').length || 0,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-500/10 rounded-lg">
                            <Activity className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Activity Feed</h3>
                            <p className="text-xs text-gray-500">Real-time system events</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 rounded-lg">
                            <span className="text-xs font-medium text-green-400">{stats.success}</span>
                            <span className="text-xs text-gray-500">Success</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 bg-yellow-500/10 rounded-lg">
                            <span className="text-xs font-medium text-yellow-400">{stats.warnings}</span>
                            <span className="text-xs text-gray-500">Warnings</span>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 rounded-lg">
                            <span className="text-xs font-medium text-red-400">{stats.errors}</span>
                            <span className="text-xs text-gray-500">Errors</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {activities?.map((activity, index) => {
                        const Icon = typeIcons[activity.type];
                        return (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.01, x: 4 }}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-dark-hover transition-all duration-200 border border-transparent hover:border-primary-500/30 cursor-pointer group"
                            >
                            <div className={`p-2 rounded-lg ${typeColors[activity.type]}`}>
                                <Icon className="w-4 h-4" />
                            </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{activity.message}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs text-gray-500">
                                            {getRelativeTime(activity.timestamp)}
                                        </span>
                                        {activity.user && (
                                            <>
                                                <span className="text-xs text-gray-600">•</span>
                                                <span className="text-xs text-gray-500">{activity.user}</span>
                                            </>
                                        )}
                                        <span className="text-xs text-gray-600">•</span>
                                        <span className="text-xs text-gray-600">{new Date(activity.timestamp).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </Card>
        </motion.div>
    );
};
