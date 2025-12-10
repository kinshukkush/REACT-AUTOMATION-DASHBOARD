import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { TrendingUp, Activity, Server } from 'lucide-react';

// Mock data
const lineData = [
    { time: '00:00', requests: 4000, errors: 24 },
    { time: '04:00', requests: 3000, errors: 13 },
    { time: '08:00', requests: 5000, errors: 28 },
    { time: '12:00', requests: 7800, errors: 39 },
    { time: '16:00', requests: 8900, errors: 48 },
    { time: '20:00', requests: 6200, errors: 38 },
];

const areaData = [
    { time: 'Mon', cpu: 45, memory: 62 },
    { time: 'Tue', cpu: 52, memory: 68 },
    { time: 'Wed', cpu: 48, memory: 65 },
    { time: 'Thu', cpu: 61, memory: 72 },
    { time: 'Fri', cpu: 55, memory: 70 },
    { time: 'Sat', cpu: 42, memory: 58 },
    { time: 'Sun', cpu: 38, memory: 54 },
];

const barData = [
    { service: 'API', uptime: 99.8 },
    { service: 'DB', uptime: 99.9 },
    { service: 'Cache', uptime: 98.5 },
    { service: 'Queue', uptime: 99.7 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card p-3 shadow-2xl border border-primary-500/30"
            >
                <p className="text-sm font-semibold text-gray-300 mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-bold">{entry.value}</span>
                    </p>
                ))}
            </motion.div>
        );
    }
    return null;
};

export const Charts = () => {
    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Performance Analytics</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        Real-time data
                    </div>
                </div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary-500/10 rounded-lg">
                                    <TrendingUp className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Request Traffic</h3>
                                    <p className="text-xs text-gray-500">Last 24 hours</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-white">5.2K</p>
                                <p className="text-xs text-green-400">+12.5% today</p>
                            </div>
                        </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f28" />
                        <XAxis dataKey="time" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="requests"
                            stroke="#0ea5e9"
                            strokeWidth={2}
                            dot={{ fill: '#0ea5e9', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="errors"
                            stroke="#f472b6"
                            strokeWidth={2}
                            dot={{ fill: '#f472b6', r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

                </motion.div>

                {/* Area Chart */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary-500/10 rounded-lg">
                                    <Activity className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Resource Usage</h3>
                                    <p className="text-xs text-gray-500">Weekly average</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-white">68%</p>
                                <p className="text-xs text-yellow-400">Moderate</p>
                            </div>
                        </div>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={areaData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f28" />
                        <XAxis dataKey="time" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="cpu"
                            stackId="1"
                            stroke="#a78bfa"
                            fill="#a78bfa"
                            fillOpacity={0.6}
                        />
                        <Area
                            type="monotone"
                            dataKey="memory"
                            stackId="2"
                            stroke="#22d3ee"
                            fill="#22d3ee"
                            fillOpacity={0.6}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Card>

                </motion.div>
            </div>

            {/* Bar Chart */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-500/10 rounded-lg">
                                <Server className="w-5 h-5 text-primary-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Service Uptime</h3>
                                <p className="text-xs text-gray-500">Last 30 days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="text-sm font-semibold text-green-400">99.5%</p>
                                <p className="text-xs text-gray-500">Average</p>
                            </div>
                            <div className="w-px h-8 bg-dark-border" />
                            <div className="text-center">
                                <p className="text-sm font-semibold text-blue-400">4</p>
                                <p className="text-xs text-gray-500">Services</p>
                            </div>
                        </div>
                    </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f28" />
                        <XAxis dataKey="service" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" domain={[95, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="uptime" fill="#34d399" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </Card>
            </motion.div>
        </div>
    );
};
