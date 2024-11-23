/**
 * Formats a Date object to YYYY-MM-DD string.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

/**
 * Adds a specified number of days to a given date.
 *
 * @param {Date} date - The starting date.
 * @param {number} days - The number of days to add.
 * @returns {Date} A new Date object representing the result.
 */
export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
