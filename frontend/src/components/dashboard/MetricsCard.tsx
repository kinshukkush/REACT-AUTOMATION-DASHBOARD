import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { MetricData } from '../../types';

interface MetricsCardProps {
    metric: MetricData;
    index: number;
}

export const MetricsCard = ({ metric, index }: MetricsCardProps) => {
    const [count, setCount] = useState(0);
    const Icon = (Icons[metric.icon as keyof typeof Icons] as any) || Activity;

    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = metric.value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= metric.value) {
                setCount(metric.value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [metric.value]);

    const TrendIcon =
        metric.trend === 'up' ? TrendingUp : metric.trend === 'down' ? TrendingDown : Minus;

    const trendColor =
        metric.trend === 'up'
            ? 'text-green-500'
            : metric.trend === 'down'
                ? 'text-red-500'
                : 'text-gray-500';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100
            }}
            whileHover={{ y: -8 }}
        >
            <Card hover className="relative overflow-hidden group">
                {/* Background gradient */}
                <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-2xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                        <motion.div 
                            className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-primary-500/30 transition-shadow"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Icon className="w-7 h-7 text-primary-400" />
                        </motion.div>
                        <motion.div 
                            className={`flex items-center gap-1 text-sm px-2.5 py-1 rounded-full ${trendColor} bg-current/10`}
                            whileHover={{ scale: 1.1 }}
                        >
                            <TrendIcon className="w-4 h-4" />
                            <span className="font-semibold">{Math.abs(metric.change)}%</span>
                        </motion.div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-400">{metric.label}</p>
                        <motion.p
                            className="text-4xl font-bold text-white"
                            key={count}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                        >
                            {count.toLocaleString()}
                            {metric.label.includes('Time') && <span className="text-xl text-gray-400">ms</span>}
                            {metric.label.includes('Rate') && <span className="text-xl text-gray-400">%</span>}
                        </motion.p>
                        
                        {/* Additional Info */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-dark-border/50"
                        >
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Live
                            </span>
                            <span>•</span>
                            <span>Updated {new Date().toLocaleTimeString()}</span>
                        </motion.div>
                    </div>
                </div>
                
                {/* Hover overlay effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-purple/0 opacity-0 group-hover:from-primary-500/10 group-hover:to-accent-purple/10 group-hover:opacity-100 transition-all duration-500 rounded-xl pointer-events-none"
                />
            </Card>
        </motion.div>
    );
};
