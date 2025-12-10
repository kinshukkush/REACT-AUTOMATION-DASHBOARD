import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import {
    Sparkles,
    Zap,
    BarChart3,
    Shield,
    Cpu,
    Globe,
    Code2,
    Terminal,
    Play,
    RefreshCw,
    Trash2,
    RotateCcw,
    TrendingUp,
    Database,
    Server,
    Activity,
} from 'lucide-react';

export const About = () => {
    const features = [
        {
            icon: BarChart3,
            title: 'Real-time Metrics',
            description: 'Monitor key performance indicators with live updates and trend analysis.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Zap,
            title: 'Automation Engine',
            description: 'Execute complex automation tasks with AI-powered intelligence.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Activity,
            title: 'Analytics Dashboard',
            description: 'Advanced analytics with anomaly detection and predictive insights.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Shield,
            title: 'Secure & Reliable',
            description: 'Enterprise-grade security with 99.9% uptime guarantee.',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const techStack = [
        { name: 'React 19', icon: Code2, category: 'Frontend' },
        { name: 'TypeScript', icon: Code2, category: 'Language' },
        { name: 'Vite', icon: Zap, category: 'Build Tool' },
        { name: 'TailwindCSS', icon: Sparkles, category: 'Styling' },
        { name: 'Framer Motion', icon: Activity, category: 'Animation' },
        { name: 'React Query', icon: Database, category: 'State Management' },
        { name: 'Node.js', icon: Server, category: 'Backend' },
        { name: 'Express', icon: Globe, category: 'API Framework' },
    ];

    const automationCommands = [
        {
            name: 'Clear Logs',
            description: 'Removes all activity feed entries',
            command: 'Clear Logs',
            icon: Trash2,
            color: 'text-red-400',
        },
        {
            name: 'Reset Metrics',
            description: 'Sets all metrics to zero',
            command: 'Reset Metrics',
            icon: RotateCcw,
            color: 'text-orange-400',
        },
        {
            name: 'Simulate Traffic',
            description: 'Generates random traffic and updates metrics',
            command: 'Simulate Traffic',
            icon: TrendingUp,
            color: 'text-green-400',
        },
        {
            name: 'Restore Defaults',
            description: 'Restores all metrics to default values',
            command: 'Restore Defaults',
            icon: RefreshCw,
            color: 'text-blue-400',
        },
    ];

    const quickStart = [
        {
            step: 1,
            title: 'Install Dependencies',
            command: 'cd backend && npm install',
            description: 'Install backend dependencies',
        },
        {
            step: 2,
            title: 'Start Backend Server',
            command: 'npm start',
            description: 'Backend runs on http://localhost:8000',
        },
        {
            step: 3,
            title: 'Install Frontend Dependencies',
            command: 'cd ../frontend && npm install',
            description: 'Install frontend dependencies',
        },
        {
            step: 4,
            title: 'Start Frontend Dev Server',
            command: 'npm run dev',
            description: 'Frontend runs on http://localhost:5173',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-purple rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/50 ring-4 ring-primary-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <motion.h1
                            className="text-4xl font-bold text-white mb-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            AI Operations Dashboard
                        </motion.h1>
                        <motion.p
                            className="text-gray-400"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            Intelligent system monitoring, automation, and analytics platform
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Project Overview */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Cpu className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Project Overview</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed mb-4">
                        The AI Operations Dashboard is a comprehensive, full-stack solution designed to
                        monitor system operations, visualize key metrics in real-time, and automate complex
                        tasks with AI-powered intelligence. Built with modern web technologies, it provides
                        an intuitive interface for managing and optimizing your infrastructure.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        This platform combines real-time data visualization, predictive analytics, anomaly
                        detection, and intelligent automation to help you maintain optimal system performance,
                        reduce downtime, and make data-driven decisions.
                    </p>
                </div>
            </Card>

            {/* Key Features */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card>
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Tech Stack */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Code2 className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Technology Stack</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {techStack.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 bg-dark-hover rounded-xl border border-dark-border hover:border-primary-500/50 transition-all duration-300 group"
                        >
                            <tech.icon className="w-8 h-8 text-primary-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="text-white font-semibold mb-1">{tech.name}</h3>
                            <p className="text-xs text-gray-500">{tech.category}</p>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Automation Commands */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Terminal className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Automation Task Commands</h2>
                </div>
                <p className="text-gray-400 mb-6">
                    Use these predefined commands in the Automation section to control the dashboard:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {automationCommands.map((cmd, index) => (
                        <motion.div
                            key={cmd.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-dark-hover rounded-xl border border-dark-border hover:border-primary-500/30 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <cmd.icon className={`w-5 h-5 ${cmd.color} flex-shrink-0 mt-0.5`} />
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold mb-1">{cmd.name}</h3>
                                    <p className="text-sm text-gray-400 mb-3">{cmd.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-dark-card rounded-lg border border-dark-border">
                                <Play className="w-3 h-3 text-gray-500" />
                                <code className="text-xs text-primary-300 font-mono">{cmd.command}</code>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Quick Start Guide */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Play className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Quick Start Guide</h2>
                </div>
                <div className="space-y-4">
                    {quickStart.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-dark-hover rounded-xl border border-dark-border"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-500/30">
                                <span className="text-white font-bold">{step.step}</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                                <div className="p-3 bg-dark-card rounded-lg border border-dark-border mb-2 font-mono text-sm text-primary-300">
                                    {step.command}
                                </div>
                                <p className="text-sm text-gray-400">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Project Structure */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Project Structure</h2>
                </div>
                <div className="space-y-4">
                    <div className="p-4 bg-dark-hover rounded-xl border border-dark-border">
                        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Server className="w-4 h-4 text-blue-400" />
                            Backend (Node.js + Express)
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                            REST API server handling data persistence, metrics calculation, and automation logic.
                        </p>
                        <div className="pl-4 border-l-2 border-dark-border space-y-1 text-sm text-gray-500 font-mono">
                            <div>📁 backend/</div>
                            <div>&nbsp;&nbsp;📄 server.ts - Main server file</div>
                            <div>&nbsp;&nbsp;📄 package.json - Dependencies</div>
                        </div>
                    </div>
                    <div className="p-4 bg-dark-hover rounded-xl border border-dark-border">
                        <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-purple-400" />
                            Frontend (React + TypeScript)
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                            Modern React application with TypeScript, TailwindCSS, and Framer Motion.
                        </p>
                        <div className="pl-4 border-l-2 border-dark-border space-y-1 text-sm text-gray-500 font-mono">
                            <div>📁 frontend/</div>
                            <div>&nbsp;&nbsp;📁 src/</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 components/ - Reusable UI components</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 pages/ - Page components</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 services/ - API services</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;📁 hooks/ - Custom React hooks</div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Additional Info */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold text-white">Additional Information</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                    <div>
                        <h3 className="text-white font-semibold mb-2">Default Ports</h3>
                        <ul className="space-y-1 text-sm text-gray-400">
                            <li>• Backend API: <code className="text-primary-400">http://localhost:8000</code></li>
                            <li>• Frontend Dev Server: <code className="text-primary-400">http://localhost:5173</code></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-2">Build Commands</h3>
                        <ul className="space-y-1 text-sm text-gray-400">
                            <li>• Backend: <code className="text-primary-400">npm run build</code></li>
                            <li>• Frontend: <code className="text-primary-400">npm run build</code></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-2">Environment Variables</h3>
                        <p className="text-sm text-gray-400 mb-2">
                            Create a <code className="text-primary-400">.env</code> file in the frontend directory:
                        </p>
                        <div className="p-3 bg-dark-card rounded-lg border border-dark-border font-mono text-sm text-primary-300">
                            VITE_API_BASE_URL=http://localhost:8000
                        </div>
                    </div>
                </div>
            </Card>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-8 border-t border-dark-border"
            >
                <p className="text-gray-400 text-sm">
                    Built with ❤️ using modern web technologies • Version 1.0.0
                </p>
            </motion.div>
        </div>
    );
};
