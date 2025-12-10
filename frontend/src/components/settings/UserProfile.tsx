import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { User as UserIcon, Mail, Briefcase, Save, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const UserProfile = () => {
    const { user, setUser } = useStore();
    const [name, setName] = useState(user?.name || 'Admin User');
    const [email, setEmail] = useState(user?.email || 'admin@example.com');
    const [role, setRole] = useState(user?.role || 'Administrator');
    const [saved, setSaved] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setUser({
                id: user?.id || '1',
                name,
                email,
                role,
            });
            setSaved(true);
            setIsLoading(false);
            
            setTimeout(() => setSaved(false), 3000);
        }, 1000);
    };

    const hasChanges = 
        name !== (user?.name || 'Admin User') || 
        email !== (user?.email || 'admin@example.com') || 
        role !== (user?.role || 'Administrator');

    return (
        <Card>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                    <UserIcon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">User Profile</h3>
            </div>

            <div className="space-y-5">
                <div className="flex justify-center mb-6">
                    <motion.div 
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="relative"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-purple rounded-full flex items-center justify-center shadow-xl shadow-primary-500/30 ring-4 ring-primary-500/20">
                            <UserIcon className="w-12 h-12 text-white" />
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-dark-card"
                        />
                    </motion.div>
                </div>

                <Input
                    label="Full Name"
                    icon={<UserIcon className="w-4 h-4" />}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                />

                <Input
                    label="Email Address"
                    type="email"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                />

                <Input
                    label="Role"
                    icon={<Briefcase className="w-4 h-4" />}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Your role"
                />

                <Button 
                    variant={saved ? "success" : "primary"}
                    onClick={handleSave}
                    loading={isLoading}
                    disabled={!hasChanges}
                    icon={saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    className="w-full"
                >
                    {saved ? 'Profile Updated!' : 'Update Profile'}
                </Button>

                <AnimatePresence>
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
                                        Profile Updated!
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Your profile information has been saved successfully.
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
