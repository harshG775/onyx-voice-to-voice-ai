/**
 * Represents options for pagination.
 */
export interface PaginationOptions {
    page: number;
    limit: number;
}

/**
 * Extracts pagination options from a query object.
 *
 * @param {any} query - The query object containing pagination parameters.
 * @returns {PaginationOptions} An object with page and limit properties.
 */
export const getPaginationOptions = (query: any): PaginationOptions => {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    return { page, limit };
};

/**
 * Generates pagination metadata.
 *
 * @param {number} total - The total number of items.
 * @param {PaginationOptions} options - The current pagination options.
 * @returns {Object} An object containing pagination metadata.
 */
export const getPaginationMetadata = (total: number, options: PaginationOptions): object => {
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
