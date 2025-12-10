import { motion } from 'framer-motion';
import { TaskTrigger } from '../components/automation/TaskTrigger';
import { SummaryGenerator } from '../components/automation/SummaryGenerator';
import { ExecutionStatus } from '../components/automation/ExecutionStatus';

export const Automation = () => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1 
                    className="text-4xl font-bold text-white mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Automation Hub
                </motion.h1>
                <motion.p 
                    className="text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Execute predefined tasks or create custom automation workflows
                </motion.p>
            </motion.div>

            {/* Task Trigger - Takes full width with predefined tasks */}
            <TaskTrigger />

            {/* Summary Generator and Execution Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SummaryGenerator />
                <ExecutionStatus />
            </div>
        </div>
    );
};
