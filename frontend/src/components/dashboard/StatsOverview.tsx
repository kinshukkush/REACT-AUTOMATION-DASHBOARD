import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Users, Zap, Server, Activity } from 'lucide-react';

export const StatsOverview = () => {
    const stats = [
        {
            label: 'Total Operations',
            value: '1,234',
            change: '+12%',
            trend: 'up',
            icon: Activity,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            label: 'Active Sessions',
            value: '48',
            change: '+8%',
            trend: 'up',
            icon: Users,
            color: 'from-purple-500 to-pink-500',
        },
        {
            label: 'Response Time',
            value: '145ms',
            change: '-12%',
            trend: 'down',
            icon: Zap,
            color: 'from-green-500 to-emerald-500',
        },
        {
            label: 'Server Load',
            value: '45%',
            change: '+3%',
            trend: 'up',
            icon: Server,
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                >
                    <Card className="relative overflow-hidden group cursor-pointer">
                        {/* Gradient background */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} shadow-lg`}>
                                    <stat.icon className="w-4 h-4 text-white" />
                                </div>
                                <motion.span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                        stat.trend === 'up'
                                            ? 'bg-green-500/10 text-green-400'
                                            : 'bg-red-500/10 text-red-400'
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {stat.change}
                                </motion.span>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};
