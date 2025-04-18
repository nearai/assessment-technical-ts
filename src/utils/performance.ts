// Performance monitoring utilities

interface PerformanceMetric {
  operation: string;
  timestamp: number;
  duration: number;
}

// In-memory storage for performance metrics
const performanceMetrics: PerformanceMetric[] = [];

/**
 * Records a performance metric for a specific operation
 * @param operation - The name of the operation being measured
 * @param duration - The duration of the operation in milliseconds
 */
export function measurePerformance(operation: string, duration: number): void {
  performanceMetrics.push({
    operation,
    timestamp: Date.now(),
    duration,
  });
  
  // Keep only the last 1000 metrics to prevent memory issues
  if (performanceMetrics.length > 1000) {
    performanceMetrics.shift();
  }
}

/**
 * Gets the average duration for a specific operation
 * @param operation - The name of the operation
 * @param timeWindow - Optional time window in milliseconds (default: last 24 hours)
 * @returns The average duration in milliseconds
 */
export function getAverageDuration(operation: string, timeWindow: number = 24 * 60 * 60 * 1000): number {
  const now = Date.now();
  const relevantMetrics = performanceMetrics.filter(
    metric => metric.operation === operation && (now - metric.timestamp) <= timeWindow
  );
  
  if (relevantMetrics.length === 0) {
    return 0;
  }
  
  const totalDuration = relevantMetrics.reduce((sum, metric) => sum + metric.duration, 0);
  return totalDuration / relevantMetrics.length;
}

/**
 * Gets performance statistics for a specific operation
 * @param operation - The name of the operation
 * @returns Object containing min, max, avg, and p95 durations
 */
export function getPerformanceStats(operation: string): { min: number; max: number; avg: number; p95: number } {
  const relevantMetrics = performanceMetrics.filter(metric => metric.operation === operation);
  
  if (relevantMetrics.length === 0) {
    return { min: 0, max: 0, avg: 0, p95: 0 };
  }
  
  const durations = relevantMetrics.map(metric => metric.duration).sort((a, b) => a - b);
  const min = durations[0];
  const max = durations[durations.length - 1];
  const avg = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
  const p95Index = Math.floor(durations.length * 0.95);
  const p95 = durations[p95Index];
  
  return { min, max, avg, p95 };
}