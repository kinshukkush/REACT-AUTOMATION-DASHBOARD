import { motion } from 'framer-motion';
import { ApiConfig } from '../components/settings/ApiConfig';
import { UserProfile } from '../components/settings/UserProfile';

export const Settings = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-gray-400">
                    Manage your API configuration and user profile
                </p>
            </motion.div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserProfile />
                <ApiConfig />
            </div>
        </div>
    );
};
