import { motion } from 'framer-motion';
import { AnomalyDetection } from '../components/analytics/AnomalyDetection';

export const Analytics = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                <p className="text-gray-400">
                    Detect anomalies and get AI-powered explanations
                </p>
            </motion.div>

            {/* Anomaly Detection */}
            <AnomalyDetection />
        </div>
    );
};
