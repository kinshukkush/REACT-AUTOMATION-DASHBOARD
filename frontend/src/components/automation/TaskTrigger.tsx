import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Play, Zap, CheckCircle, Trash2, RotateCcw, RefreshCw, TrendingUp } from 'lucide-react';
import { useExecuteAction } from '../../hooks/useApi';

const predefinedTasks = [
    {
        name: 'Clear Logs',
        description: 'Clear all activity feed logs',
        icon: Trash2,
        color: 'from-red-500 to-rose-600',
    },
    {
        name: 'Reset Metrics',
        description: 'Reset all metrics to zero',
        icon: RotateCcw,
        color: 'from-orange-500 to-amber-600',
    },
    {
        name: 'Simulate Traffic',
        description: 'Generate random traffic data',
        icon: TrendingUp,
        color: 'from-green-500 to-emerald-600',
    },
    {
        name: 'Restore Defaults',
        description: 'Restore all metrics to defaults',
        icon: RefreshCw,
        color: 'from-blue-500 to-cyan-600',
    },
];

export const TaskTrigger = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const { mutate: executeAction, isPending, isSuccess } = useExecuteAction();

    const handleExecute = () => {
        if (!taskName || !taskDescription) return;

        executeAction({
            action: 'trigger_task',
            parameters: {
                name: taskName,
                description: taskDescription,
            },
        });

        // Clear form after successful execution
        if (isSuccess) {
            setTaskName('');
            setTaskDescription('');
        }
    };

    const handlePredefinedTask = (task: typeof predefinedTasks[0]) => {
        setTaskName(task.name);
        setTaskDescription(task.description);
        executeAction({
            action: 'trigger_task',
            parameters: {
                name: task.name,
                description: task.description,
            },
        });
    };

    const isFormValid = taskName.trim() !== '' && taskDescription.trim() !== '';

    return (
        <div className="space-y-6">
            {/* Predefined Tasks */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary-500/10 rounded-lg">
                        <Zap className="w-5 h-5 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {predefinedTasks.map((task, index) => (
                        <motion.button
                            key={task.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePredefinedTask(task)}
                            disabled={isPending}
                            className="p-4 bg-dark-hover rounded-xl border border-dark-border hover:border-primary-500/50 transition-all duration-300 group text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="flex items-start gap-3">
                                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${task.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
                                    <task.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-semibold mb-1 group-hover:text-primary-300 transition-colors">
                                        {task.name}
                                    </h4>
                                    <p className="text-sm text-gray-400">{task.description}</p>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </Card>

            {/* Custom Task */}
            <Card>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary-500/10 rounded-lg">
                        <Play className="w-5 h-5 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Custom Automation Task</h3>
                </div>

                <div className="space-y-5">
                    <Input
                        label="Task Name"
                        placeholder="Enter task name..."
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />

                    <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Task Description
                        </label>
                        <motion.textarea
                            whileFocus={{ scale: 1.01 }}
                            className="w-full px-4 py-3 bg-dark-card/80 border border-dark-border rounded-xl text-gray-300 min-h-[120px] resize-none transition-all duration-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 placeholder:text-gray-500"
                            placeholder="Describe what this automation should do..."
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </div>

                    <Button
                        variant="primary"
                        onClick={handleExecute}
                        loading={isPending}
                        disabled={!isFormValid}
                        icon={<Play className="w-4 h-4" />}
                        className="w-full"
                    >
                        {isPending ? 'Executing...' : 'Execute Task'}
                    </Button>

                    <AnimatePresence>
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl"
                            >
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-green-400 mb-1">
                                            Task Executed Successfully!
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            Your automation task has been triggered and is now running.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Card>
        </div>
    );
};
