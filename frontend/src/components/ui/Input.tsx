import { type InputHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
}

export const Input = ({ label, error, icon, className, ...props }: InputProps) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                    {label}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        'input',
                        icon && 'pl-10',
                        error && 'border-red-500 focus:ring-red-500/50 focus:border-red-500',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 flex items-center gap-1"
                >
                    <span className="w-1 h-1 bg-red-400 rounded-full" />
                    {error}
                </motion.p>
            )}
        </div>
    );
};
