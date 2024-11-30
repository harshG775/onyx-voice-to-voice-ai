"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tick = tick;
/**
 * Wait for a certain number of milliseconds.
 * @param milliseconds
 */
function tick(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}
