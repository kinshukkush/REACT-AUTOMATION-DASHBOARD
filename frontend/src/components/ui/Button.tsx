import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: ReactNode;
    children: ReactNode;
}

export const Button = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    children,
    className,
    disabled,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'btn-ghost',
        danger: 'btn bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-600/30 border border-red-500/30 hover:shadow-xl hover:shadow-red-600/40',
        success: 'btn bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg shadow-green-600/30 border border-green-500/30 hover:shadow-xl hover:shadow-green-600/40',
    };

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-7 py-3.5 text-lg',
    };

    return (
        <motion.button
            whileHover={{
                scale: disabled || loading ? 1 : 1.02,
                y: disabled || loading ? 0 : -2
            }}
            whileTap={{
                scale: disabled || loading ? 1 : 0.98,
                y: disabled || loading ? 0 : 0
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 17
            }}
            className={cn(
                'btn',
                variants[variant],
                sizes[size],
                'relative overflow-hidden',
                disabled || loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {/* Shine effect on hover */}
            {!disabled && !loading && (
                <motion.div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    whileHover={{ translateX: '200%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
            )}

            <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : icon ? (
                    <motion.span
                        whileHover={{ rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {icon}
                    </motion.span>
                ) : null}
                <span>{children}</span>
            </span>
        </motion.button>
    );
};
