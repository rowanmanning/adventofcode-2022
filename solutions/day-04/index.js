'use strict';

const {range} = require('@rowanmanning/adventofcode-array');

exports.solution1 = function solution1(input) {
	return parseInput(input).filter(([assignment1, assignment2]) => {
		return (
			(assignment1[0] >= assignment2[0] && assignment1[1] <= assignment2[1]) ||
			(assignment2[0] >= assignment1[0] && assignment2[1] <= assignment1[1])
		);
	}).length;
};

exports.solution2 = function solution2(input) {
	return parseInput(input).filter(([assignment1, assignment2]) => {
		const assignment1Numbers = range(...assignment1);
		const assignment2Numbers = range(...assignment2);
		return assignment1Numbers.some(number => assignment2Numbers.includes(number));
	}).length;
};

/**
 * Parse the problem input.
 *
 * @param {string} input - The raw input string.
 * @returns {Array<Array<[number, number]>>} - Returns the parsed input.
 */
function parseInput(input) {
	return input.split('\n').map(parsePair);
}

/**
 * @param {string} pair - The raw pair input string.
 * @returns {Array<[number, number]>} - Returns the parsed pair.
 */
function parsePair(pair) {
	return pair.split(',').map(assignment => {
		const [value1, value2] = assignment.split('-').map(Number);
		return [value1, value2];
	});
}
