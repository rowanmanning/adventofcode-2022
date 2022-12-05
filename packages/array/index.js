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
