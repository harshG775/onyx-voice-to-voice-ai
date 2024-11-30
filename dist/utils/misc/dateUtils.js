"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDays = exports.formatDate = void 0;
/**
 * Formats a Date object to YYYY-MM-DD string.
 *
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
const formatDate = (date) => {
    return date.toISOString().split("T")[0];
};
exports.formatDate = formatDate;
/**
 * Adds a specified number of days to a given date.
 *
 * @param {Date} date - The starting date.
 * @param {number} days - The number of days to add.
 * @returns {Date} A new Date object representing the result.
 */
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
