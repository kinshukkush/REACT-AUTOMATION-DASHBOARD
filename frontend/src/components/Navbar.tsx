import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useClickOutside } from '../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const user = useStore((state) => state.user);
    const navigate = useNavigate();
    
    const notificationsRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useClickOutside(notificationsRef, () => setShowNotifications(false), showNotifications);
    useClickOutside(profileRef, () => setShowProfile(false), showProfile);

    const notifications = [
        { id: 1, message: 'High CPU usage detected', time: '5m ago', unread: true },
        { id: 2, message: 'Deployment completed successfully', time: '1h ago', unread: true },
        { id: 3, message: 'New anomaly detected', time: '2h ago', unread: false },
    ];

    const handleProfileClick = () => {
        navigate('/settings');
        setShowProfile(false);
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logout clicked');
        setShowProfile(false);
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="h-16 backdrop-blur-xl bg-dark-card/80 border-b border-dark-border px-6 flex items-center justify-between sticky top-0 z-40"
        >
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors group-focus-within:text-primary-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2.5 input"
                    />
                </div>
            </div>

            {/* System Status Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full"
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
                />
                <span className="text-xs font-medium text-green-400">All Systems Operational</span>
            </motion.div>

            {/* Right Section */}
            <div className="flex items-center gap-3 ml-6">
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setShowNotifications(!showNotifications);
                            setShowProfile(false);
                        }}
                        className="relative p-2.5 hover:bg-dark-hover rounded-xl transition-all duration-300 group"
                    >
                        <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </motion.button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-80 card shadow-2xl z-50"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-white">Notifications</h3>
                                    <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-300 rounded-full">
                                        {notifications.filter((n) => n.unread).length} unread
                                    </span>
                                </div>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <motion.div
                                            key={notification.id}
                                            whileHover={{ scale: 1.02 }}
                                            className={`p-3 rounded-lg cursor-pointer transition-all ${
                                                notification.unread 
                                                    ? 'bg-primary-500/10 border border-primary-500/30' 
                                                    : 'bg-dark-bg/50 hover:bg-dark-hover'
                                            }`}
                                        >
                                            <p className="text-sm text-gray-300">{notification.message}</p>
                                            <span className="text-xs text-gray-500">{notification.time}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative" ref={profileRef}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            setShowProfile(!showProfile);
                            setShowNotifications(false);
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-dark-hover rounded-xl transition-all duration-300"
                    >
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-purple rounded-full flex items-center justify-center ring-2 ring-primary-500/20 hover:ring-primary-500/40 transition-all">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left hidden md:block">
                            <p className="text-sm font-semibold text-white">
                                {user?.name || 'Admin User'}
                            </p>
                            <p className="text-xs text-gray-400">{user?.role || 'Administrator'}</p>
                        </div>
                    </motion.button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-56 card shadow-2xl z-50 overflow-hidden"
                            >
                                <motion.button
                                    whileHover={{ x: 4 }}
                                    onClick={handleProfileClick}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-dark-hover transition-all rounded-lg"
                                >
                                    <SettingsIcon className="w-4 h-4" />
                                    <span>Settings</span>
                                </motion.button>
                                <div className="border-t border-dark-border my-1" />
                                <motion.button
                                    whileHover={{ x: 4 }}
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-all rounded-lg"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
};
