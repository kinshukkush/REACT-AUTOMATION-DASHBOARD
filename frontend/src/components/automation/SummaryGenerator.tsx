import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles, Copy, Check, FileText } from 'lucide-react';
import { useActivityFeed } from '../../hooks/useApi';
import { summarizeAlerts } from '../../services/openai';

export const SummaryGenerator = () => {
    const { data: activities } = useActivityFeed();
    const [summary, setSummary] = useState('');
    const [generating, setGenerating] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!activities) return;

        setGenerating(true);
        try {
            const alerts = activities.filter((a) => a.type === 'warning' || a.type === 'error');
            const result = await summarizeAlerts(alerts);
            setSummary(result);
        } catch (error) {
            console.error('Failed to generate summary:', error);
            setSummary('Failed to generate summary. Please try again.');
        } finally {
            setGenerating(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <Card>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-500/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">AI Alert Summary</h3>
                </div>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGenerate}
                    loading={generating}
                    disabled={!activities || activities.length === 0}
                    icon={<Sparkles className="w-4 h-4" />}
                >
                    {generating ? 'Generating...' : 'Generate'}
                </Button>
            </div>

            <AnimatePresence mode="wait">
                {summary ? (
                    <motion.div
                        key="summary"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="glass p-5 rounded-xl border border-primary-500/30"
                        >
                            <div className="flex items-start gap-3">
                                <motion.div
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                                </motion.div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-primary-400 mb-3">AI Generated Summary</p>
                                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{summary}</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex gap-2">
                            <Button
                                variant={copied ? "success" : "secondary"}
                                size="sm"
                                onClick={handleCopy}
                                icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            >
                                {copied ? 'Copied!' : 'Copy to Clipboard'}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSummary('')}
                            >
                                Clear
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        </motion.div>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto">
                            Click "Generate" to create an AI-powered summary of recent alerts and warnings
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
};
