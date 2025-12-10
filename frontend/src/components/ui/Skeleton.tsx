import { cn } from '../../utils/cn';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = ({ className, variant = 'rectangular' }: SkeletonProps) => {
    const variants = {
        text: 'h-4 rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    return (
        <div
            className={cn(
                'bg-dark-card shimmer animate-pulse',
                variants[variant],
                className
            )}
        />
    );
};

export const MetricCardSkeleton = () => (
    <div className="card space-y-3">
        <Skeleton className="h-4 w-24" variant="text" />
        <Skeleton className="h-8 w-32" variant="text" />
        <Skeleton className="h-3 w-16" variant="text" />
    </div>
);

export const ChartSkeleton = () => (
    <div className="card">
        <Skeleton className="h-6 w-32 mb-4" variant="text" />
        <Skeleton className="h-64 w-full" />
    </div>
);
