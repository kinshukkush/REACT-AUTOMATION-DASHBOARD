import { motion } from 'framer-motion';
import { MetricsCard } from '../components/dashboard/MetricsCard';
import { Charts } from '../components/dashboard/Charts';
import { InsightsPanel } from '../components/dashboard/InsightsPanel';
import { RecommendationsPanel } from '../components/dashboard/RecommendationsPanel';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { useDashboardMetrics } from '../hooks/useApi';
import { MetricCardSkeleton } from '../components/ui/Skeleton';

export const Dashboard = () => {
    const { data: metrics, isLoading } = useDashboardMetrics();

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between"
            >
                <div>
                    <motion.h1 
                        className="text-4xl font-bold text-white mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Dashboard
                    </motion.h1>
                    <motion.p 
                        className="text-gray-400"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Welcome back! Here's what's happening with your operations.
                    </motion.p>
                </div>
                <motion.div 
                    className="px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-xs text-gray-400">Last updated</p>
                    <p className="text-sm font-semibold text-primary-300">
                        {new Date().toLocaleTimeString()}
                    </p>
                </motion.div>
            </motion.div>

            {/* Stats Overview */}
            <StatsOverview />
            
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => <MetricCardSkeleton key={i} />)
                    : metrics?.map((metric, index) => (
                        <MetricsCard key={metric.id} metric={metric} index={index} />
                    ))}
            </div>

            {/* Charts */}
            <Charts />

            {/* Insights and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InsightsPanel />
                <RecommendationsPanel />
            </div>

            {/* Activity Feed */}
            <ActivityFeed />
        </div>
    );
};
