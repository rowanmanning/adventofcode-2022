'use strict';

/**
 * Split an array into chunks of a given size.
 *
 * @param {Array<any>} array - The array to split into chunks.
 * @param {number} chunkSize - The length of each chunk.
 * @returns {Array<Array<any>>} - Returns the array split into chunks.
 */
exports.chunk = function chunk(array, chunkSize) {
	const chunks = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize));
	}
	return chunks;
};

/**
 * Get an array of numbers within a range.
 *
 * @param {number} min - The minimum number to get.
 * @param {number} max - The maximum number to get.
 * @returns {Array<number>} - Returns the range of numbers.
 */
exports.range = function range(min, max) {
	return Array(max - min + 1).fill(0).map((_, index) => index + min);
};
