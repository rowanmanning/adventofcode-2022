'use strict';

const {assert} = require('chai');
const {readFile} = require('node:fs/promises');

const {solution1, solution2} = require('..');

describe('day 3', () => {
	let exampleInput;
	let puzzleInput;

	before(async () => {
		exampleInput = await readFile(`${__dirname}/fixtures/example-input.txt`, 'utf-8');
		puzzleInput = await readFile(`${__dirname}/fixtures/puzzle-input.txt`, 'utf-8');
	});

	describe('solution 1', () => {

		describe('with test data', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(exampleInput), 157);
			});

		});

		describe('with puzzle input', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(puzzleInput), 7817);
			});

		});

	});

	describe('solution 2', () => {

		describe('with test data', () => {

			it('returns the expected result', () => {
				assert.deepEqual(solution2(exampleInput), 70);
			});

		});

		describe('with puzzle input', () => {

			it('returns the expected result', () => {
				assert.deepEqual(solution2(puzzleInput), 2444);
			});

		});

	});

});
