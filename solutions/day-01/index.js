'use strict';

const {sum} = require('@rowanmanning/adventofcode-math');

exports.solution1 = function solution1(input) {
	return getTotalCaloriesPerElf(input).shift();
};

exports.solution2 = function solution2(input) {
	return getTotalCaloriesPerElf(input).slice(0, 3).reduce(sum);
};

/**
 * Get the total calories each elf holds.
 *
 * @param {string} input - A text representation of the elf calories.
 * @returns {Array<number>} - Returns the total calories each elf has, sorted by most to least.
 */
function getTotalCaloriesPerElf(input) {
	return input
		.split('\n\n')
		.map(elf => {
			return elf
				.split('\n')
				.map(Number)
				.reduce(sum);
		})
		.sort(sortDescending);
}

/**
 * A simple sort function for sorting in descending order.
 *
 * @param {any} value1 - The first value to compare.
 * @param {any} value2 - The second value to compare.
 * @returns {number} - Returns the result of the comparison.
 */
function sortDescending(value1, value2) {
	return value2 - value1;
}
