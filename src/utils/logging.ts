// Logging utilities

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: unknown;
}

const logs: LogEntry[] = [];

/**
 * Logs a message with the specified level and optional data
 * @param level - The log level
 * @param message - The log message
 * @param data - Optional data to include with the log
 */
function log(level: 'info' | 'warn' | 'error', message: string, data?: unknown): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  if (data) {
    entry.data = data;
  }

  logs.push(entry);

  // Keep logs array from growing too large
  if (logs.length > 1000) {
    logs.shift();
  }

  // Also log to console for development
  console[level](message, data);
}

/**
 * Logs an informational message
 * @param message - The log message
 * @param data - Optional data to include with the log
 */
export function logInfo(message: string, data?: unknown): void {
  log('info', message, data);
}

/**
 * Logs a warning message
 * @param message - The log message
 * @param data - Optional data to include with the log
 */
export function logWarning(message: string, data?: unknown): void {
  log('warn', message, data);
}

/**
 * Logs an error message
 * @param message - The log message
 * @param data - Optional data to include with the log
 */
export function logError(message: string, data?: unknown): void {
  log('error', message, data);
}

/**
 * Logs a query and its results
 * @param query - The user query
 * @param results - The matched agents
 * @param executionTime - The execution time in milliseconds
 */
export function logQuery(query: string, results: unknown[], executionTime: number): void {
  logInfo('Query processed', {
    query,
    resultCount: results.length,
    executionTime,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Gets all logs, optionally filtered by level
 * @param level - Optional log level to filter by
 * @returns Array of log entries
 */
export function getLogs(level?: 'info' | 'warn' | 'error'): LogEntry[] {
  if (level) {
    return logs.filter(entry => entry.level === level);
  }
  return [...logs];
}
