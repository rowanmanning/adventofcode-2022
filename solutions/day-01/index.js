'use strict';

exports.solution1 = function solution1(input) {
	return Math.max(
		...input
			.split('\n\n')
			.map(elf => {
				return elf
					.split('\n')
					.reduce(sum);
			})
	);
};

exports.solution2 = function solution2() {

};

/**
 * Add two numbers together.
 *
 * @param {string | number} number1 - The first number.
 * @param {string | number} number2 - The number to add to the first.
 * @returns {number} - Returns the result of the sum.
 */
function sum(number1, number2) {
	return Number(number1) + Number(number2);
}
