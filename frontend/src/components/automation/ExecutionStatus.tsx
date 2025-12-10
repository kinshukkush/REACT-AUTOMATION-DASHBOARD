
import { Card } from '../ui/Card';
import { useOperationsStatus } from '../../hooks/useApi';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertTriangle, XCircle, Activity } from 'lucide-react';

export const ExecutionStatus = () => {
    const { data: operations, isLoading } = useOperationsStatus();

    const statusIcons = {
        running: CheckCircle,
        stopped: XCircle,
        error: XCircle,
        warning: AlertTriangle,
    };

    const statusColors = {
        running: 'text-green-400 bg-green-500/10',
        stopped: 'text-gray-400 bg-gray-500/10',
        error: 'text-red-400 bg-red-500/10',
        warning: 'text-yellow-400 bg-yellow-500/10',
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

    return (
        <Card>
            <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-primary-400" />
                <h3 className="text-lg font-semibold text-white">Service Status</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operations?.map((operation, index) => {
                    const StatusIcon = statusIcons[operation.status];
                    return (
                        <motion.div
                            key={operation.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass p-4 rounded-lg"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className={`p-2 rounded-lg ${statusColors[operation.status]}`}>
                                        <StatusIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white">{operation.name}</h4>
                                        <p className="text-xs text-gray-400">
                                            Uptime: {operation.uptime.toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="bg-dark-bg p-2 rounded">
                                    <p className="text-gray-500 mb-1">CPU</p>
                                    <p className="text-white font-medium">{operation.metrics.cpu}%</p>
                                </div>
                                <div className="bg-dark-bg p-2 rounded">
                                    <p className="text-gray-500 mb-1">Memory</p>
                                    <p className="text-white font-medium">{operation.metrics.memory}%</p>
                                </div>
                                <div className="bg-dark-bg p-2 rounded">
                                    <p className="text-gray-500 mb-1">Requests</p>
                                    <p className="text-white font-medium">
                                        {operation.metrics.requests.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Card>
    );
};
