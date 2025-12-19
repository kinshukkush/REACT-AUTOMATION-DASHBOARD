import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Key, CheckCircle, Save } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const ApiConfig = () => {
    const { apiConfig, updateApiConfig } = useStore();
    const [openaiKey, setOpenaiKey] = useState(apiConfig.openaiKey);
    const [backendUrl, setBackendUrl] = useState(apiConfig.backendUrl);
    const [saved, setSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const validateApiKey = (key: string): boolean => {
        // Basic validation for OpenAI API key format
        return key.trim().length > 0 && (key.startsWith('sk-') || key.startsWith('puter-'));
    };

    const validateUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleSave = () => {
        setError('');

        // Validate inputs
        if (!validateApiKey(openaiKey)) {
            setError('Please enter a valid API key (must start with sk- or puter-)');
            return;
        }

        if (!validateUrl(backendUrl)) {
            setError('Please enter a valid backend URL');
            return;
        }

        setIsLoading(true);
        
        // Save configuration
        setTimeout(() => {
            updateApiConfig({
                openaiKey,
                backendUrl,
            });
            
            // Update axios base URL dynamically
            if (typeof window !== 'undefined') {
                localStorage.setItem('api_base_url', backendUrl);
            }
            
            setSaved(true);
            setIsLoading(false);
            
            setTimeout(() => setSaved(false), 4000);
        }, 1000);
    };

    const hasChanges = openaiKey !== apiConfig.openaiKey || backendUrl !== apiConfig.backendUrl;
    const isValid = validateApiKey(openaiKey) && validateUrl(backendUrl);

    return (
        <Card>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                    <Key className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">API Configuration</h3>
            </div>

            <div className="space-y-5">
                <Input
                    label="OpenAI API Key"
                    type="password"
                    placeholder="sk-..."
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    icon={<Key className="w-4 h-4" />}
                />

                <Input
                    label="Backend API URL"
                    type="url"
                    placeholder="http://localhost:8000"
                    value={backendUrl}
                    onChange={(e) => setBackendUrl(e.target.value)}
                />

                <Button
                    variant={saved ? "success" : "primary"}
                    onClick={handleSave}
                    loading={isLoading}
                    disabled={!hasChanges || !isValid}
                    icon={saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    className="w-full"
                >
                    {saved ? 'Saved Successfully!' : 'Save Configuration'}
                </Button>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="p-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-xl"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5">⚠</div>
                                <div>
                                    <p className="text-sm font-semibold text-red-400 mb-1">
                                        Configuration Error
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {saved && (
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
                                        Configuration Saved!
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Your API settings have been updated successfully.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
};
