'use strict';

const {chunk} = require('@rowanmanning/adventofcode-array');
const {sum} = require('@rowanmanning/adventofcode-math');

const ITEM_TO_PRIORITY = 'abcdefghijklmnopqrstuvwxyz'
	.split('')
	.reduce((result, letter, index, alphabet) => {
		const priority = index + 1;
		result[letter] = priority;
		result[letter.toUpperCase()] = priority + alphabet.length;
		return result;
	}, {});

exports.solution1 = function solution1(input) {
	return input
		.split('\n')
		.map(rucksack => {
			const items = rucksack.split('');
			const [compartment1, compartment2] = chunk(items, items.length / 2);
			const [intersection] = new Set(
				compartment1.filter(item => compartment2.includes(item))
			);
			return ITEM_TO_PRIORITY[intersection];
		})
		.reduce(sum);
};

exports.solution2 = function solution2(input) {
	return chunk(input.split('\n'), 3)
		.map(group => {
			const [rucksack1, rucksack2, rucksack3] = group.map(rucksack => rucksack.split(''));
			const [intersection] = new Set(
				rucksack1.filter(item =>
					rucksack2.includes(item) && rucksack3.includes(item)
				)
			);
			return ITEM_TO_PRIORITY[intersection];
		})
		.reduce(sum);
};
