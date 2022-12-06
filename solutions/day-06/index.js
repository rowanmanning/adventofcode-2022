'use strict';

exports.solution1 = function solution1(input) {
	return getStartSequence({
		message: input,
		length: 4
	});
};

exports.solution2 = function solution2(input) {
	return getStartSequence({
		message: input,
		length: 14
	});
};

/**
 * Get the start sequence for a message string.
 *
 * @param {object} options - Parser options.
 * @param {string} options.message - The message string to find the start sequence for.
 * @param {number} options.length - The expected length of the start sequence.
 * @returns {number | void} - Returns the index at the end of the start sequence.
 */
function getStartSequence({message, length}) {
	const buffer = [];
	let index = 1;
	for (const character of [...message]) {
		if (buffer.length >= length) {
			buffer.shift();
		}
		buffer.push(character);
		if (new Set(buffer).size === length) {
			return index;
		}
		index += 1;
	}
}
