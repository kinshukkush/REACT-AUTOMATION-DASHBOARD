import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getOperationsStatus,
    getTaskRecommendations,
    getAnomalies,
    executeAction,
    getActivityFeed,
    getDashboardMetrics,
    getInsights,
} from '../services/api';
import type { ExecuteActionRequest } from '../types';

// Query keys
export const queryKeys = {
    operations: ['operations'] as const,
    tasks: ['tasks'] as const,
    anomalies: ['anomalies'] as const,
    activity: ['activity'] as const,
    metrics: ['metrics'] as const,
    insights: ['insights'] as const,
};

/**
 * Hook for fetching operations status
 */
export const useOperationsStatus = () => {
    return useQuery({
        queryKey: queryKeys.operations,
        queryFn: getOperationsStatus,
        refetchInterval: 30000, // Refetch every 30 seconds
        staleTime: 20000,
    });
};

/**
 * Hook for fetching task recommendations
 */
export const useTaskRecommendations = () => {
    return useQuery({
        queryKey: queryKeys.tasks,
        queryFn: getTaskRecommendations,
        refetchInterval: 60000, // Refetch every minute
        staleTime: 45000,
    });
};

/**
 * Hook for fetching anomalies
 */
export const useAnomalies = () => {
    return useQuery({
        queryKey: queryKeys.anomalies,
        queryFn: getAnomalies,
        refetchInterval: 45000,
        staleTime: 30000,
    });
};

/**
 * Hook for fetching activity feed
 */
export const useActivityFeed = () => {
    return useQuery({
        queryKey: queryKeys.activity,
        queryFn: () => getActivityFeed(),
        refetchInterval: 15000, // Refetch every 15 seconds
        staleTime: 10000,
    });
};

/**
 * Hook for fetching dashboard metrics
 */
export const useDashboardMetrics = () => {
    return useQuery({
        queryKey: queryKeys.metrics,
        queryFn: getDashboardMetrics,
        refetchInterval: 30000,
        staleTime: 20000,
    });
};

/**
 * Hook for fetching insights
 */
export const useInsights = () => {
    return useQuery({
        queryKey: queryKeys.insights,
        queryFn: getInsights,
        refetchInterval: 60000,
        staleTime: 45000,
    });
};

/**
 * Hook for executing actions
 */
export const useExecuteAction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: ExecuteActionRequest) => executeAction(request),
        onSuccess: () => {
            // Invalidate relevant queries after action execution
            queryClient.invalidateQueries({ queryKey: queryKeys.operations });
            queryClient.invalidateQueries({ queryKey: queryKeys.activity });
        },
    });
};
