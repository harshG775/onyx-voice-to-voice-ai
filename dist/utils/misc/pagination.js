"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationMetadata = exports.getPaginationOptions = void 0;
/**
 * Extracts pagination options from a query object.
 *
 * @param {any} query - The query object containing pagination parameters.
 * @returns {PaginationOptions} An object with page and limit properties.
 */
const getPaginationOptions = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    return { page, limit };
};
exports.getPaginationOptions = getPaginationOptions;
/**
 * Generates pagination metadata.
 *
 * @param {number} total - The total number of items.
 * @param {PaginationOptions} options - The current pagination options.
 * @returns {Object} An object containing pagination metadata.
 */
const getPaginationMetadata = (total, options) => {
    const { page, limit } = options;
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    return {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage,
        hasPrevPage,
    };
};
exports.getPaginationMetadata = getPaginationMetadata;
