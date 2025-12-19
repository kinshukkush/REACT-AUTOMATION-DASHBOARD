import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Zap,
    BarChart3,
    Settings,
    ChevronLeft,
    Sparkles,
    Activity,
    Info,
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Automation', href: '/automation', icon: Zap },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{
                x: 0,
                opacity: 1,
                width: collapsed ? 80 : 256
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-screen backdrop-blur-xl bg-dark-card/80 border-r border-dark-border z-30 overflow-hidden"
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-dark-border">
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-accent-purple rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 ring-2 ring-primary-500/20">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-xl bg-gradient-to-r from-primary-400 via-accent-purple to-accent-pink bg-clip-text text-transparent">AI Ops</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onToggle}
                    className="p-2 hover:bg-dark-hover rounded-xl transition-all duration-300 group"
                >
                    <ChevronLeft
                        className={`w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300 ${collapsed ? 'rotate-180' : ''
                            }`}
                    />
                </motion.button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                ? 'bg-gradient-to-r from-primary-600/30 to-primary-500/10 text-primary-300 shadow-lg shadow-primary-500/20'
                                : 'text-gray-400 hover:bg-dark-hover hover:text-white'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 border-l-4 border-primary-500 rounded-xl"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative z-10"
                                >
                                    <item.icon className={`w-5 h-5 flex-shrink-0 transition-all ${
                                        isActive ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : ''
                                    }`} />
                                </motion.div>
                                <AnimatePresence mode="wait">
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2, delay: 0.1 }}
                                            className="font-semibold relative z-10"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <AnimatePresence mode="wait">
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-6 left-4 right-4"
                    >
                        <div className="glass p-4 rounded-xl space-y-3">
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                                />
                                <span className="font-medium">All systems operational</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Activity className="w-3.5 h-3.5 text-primary-400" />
                                <span className="text-gray-500">Uptime: 99.9%</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.aside>
    );
};
