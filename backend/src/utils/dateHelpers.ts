/**
 * Returns a Date object representing the end of a subscription period.
 * @param plan - 'weekly' or 'monthly'
 * @returns Date
 */
export const getSubscriptionEndDate = (plan: 'weekly' | 'monthly'): Date => {
  const now = new Date();
  if (plan === 'weekly') {
    return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
  return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
};

/**
 * Format a date to 'YYYY-MM-DD' string.
 */
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Check if a subscription is still active.
 */
export const isSubscriptionActive = (endDate: Date | null): boolean => {
  if (!endDate) return false;
  return new Date() < endDate;
};

/**
 * Returns the start and end of today in ISO format for database queries.
 */
export const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { start, end };
};
