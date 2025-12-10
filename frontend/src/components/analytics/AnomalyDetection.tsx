import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useAnomalies } from '../../hooks/useApi';
import { explainAnomaly } from '../../services/openai';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';

export const AnomalyDetection = () => {
    const { data: anomalies, isLoading, error } = useAnomalies();
    const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);
    const [explanation, setExplanation] = useState<string>('');
    const [explaining, setExplaining] = useState(false);

    const handleExplain = async (anomaly: any) => {
        setSelectedAnomaly(anomaly.id);
        setExplaining(true);
        try {
            const result = await explainAnomaly({
                metric: anomaly.metric,
                expectedValue: anomaly.expectedValue,
                actualValue: anomaly.actualValue,
                timestamp: anomaly.detectedAt,
            });
            setExplanation(result);
        } catch (err) {
            setExplanation('Failed to generate explanation. Please try again.');
        } finally {
            setExplaining(false);
        }
    };

    const severityColors = {
        low: 'border-blue-500/30 bg-blue-500/5',
        medium: 'border-yellow-500/30 bg-yellow-500/5',
        high: 'border-red-500/30 bg-red-500/5',
    };

    // Mock chart data
    const generateChartData = (anomaly: any) => {
        const data = [];
        for (let i = -10; i <= 10; i++) {
            const isAnomaly = i === 0;
            data.push({
                time: i,
                value: isAnomaly ? anomaly.actualValue : anomaly.expectedValue + Math.random() * 20 - 10,
                expected: anomaly.expectedValue,
            });
        }
        return data;
    };

    if (isLoading) {
        return (
            <Card>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
                </div>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to load anomalies</span>
                </div>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-semibold text-white mb-6">Detected Anomalies</h3>

                <div className="space-y-4">
                    {anomalies?.map((anomaly, index) => (
                        <motion.div
                            key={anomaly.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-lg border ${severityColors[anomaly.severity]}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h4 className="font-medium text-white mb-1">{anomaly.metric}</h4>
                                    <p className="text-sm text-gray-400">
                                        Detected {new Date(anomaly.detectedAt).toLocaleString()}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleExplain(anomaly)}
                                    loading={explaining && selectedAnomaly === anomaly.id}
                                    icon={<Sparkles className="w-4 h-4" />}
                                >
                                    Explain
                                </Button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Expected</p>
                                    <p className="text-lg font-semibold text-white">
                                        {anomaly.expectedValue.toFixed(1)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Actual</p>
                                    <p className="text-lg font-semibold text-red-400">
                                        {anomaly.actualValue.toFixed(1)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Deviation</p>
                                    <p className="text-lg font-semibold text-yellow-400">
                                        {anomaly.deviation.toFixed(1)}%
                                    </p>
                                </div>
                            </div>

                            {/* Chart */}
                            <ResponsiveContainer width="100%" height={150}>
                                <LineChart data={generateChartData(anomaly)}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f28" />
                                    <XAxis dataKey="time" stroke="#6b7280" hide />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#13131a',
                                            border: '1px solid #1f1f28',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <ReferenceLine
                                        y={anomaly.expectedValue}
                                        stroke="#22d3ee"
                                        strokeDasharray="3 3"
                                        label="Expected"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#f472b6"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            {/* AI Explanation */}
                            {selectedAnomaly === anomaly.id && explanation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-4 p-4 glass rounded-lg border border-primary-500/30"
                                >
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-primary-400 mb-2">
                                                AI Explanation
                                            </p>
                                            <p className="text-sm text-gray-300 whitespace-pre-line">
                                                {explanation}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
