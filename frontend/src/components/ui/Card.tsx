import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    glass?: boolean;
    onClick?: () => void;
}

export const Card = ({ children, className, hover = false, glass = false, onClick }: CardProps) => {
    const baseClass = glass ? 'glass' : 'card';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={cn(baseClass, hover && 'card-hover', className)}
            onClick={onClick}
            whileHover={hover ? { y: -4 } : {}}
            whileTap={hover && onClick ? { scale: 0.98 } : {}}
        >
            {children}
        </motion.div>
    );
};
