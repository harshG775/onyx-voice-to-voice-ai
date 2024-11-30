"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStrongPassword = exports.isValidEmail = void 0;
/**
 * Validates an email address.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
/**
 * Checks if a password meets strong password criteria.
 *
 * @param {string} password - The password to check.
 * @returns {boolean} True if the password is strong, false otherwise.
 */
const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
exports.isStrongPassword = isStrongPassword;
