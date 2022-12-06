'use strict';

const {assert} = require('chai');
const {readFile} = require('node:fs/promises');

const {solution1, solution2} = require('..');

describe('day 6', () => {
	let exampleInput;
	let puzzleInput;

	before(async () => {
		exampleInput = [
			await readFile(`${__dirname}/fixtures/example-input-1.txt`, 'utf-8'),
			await readFile(`${__dirname}/fixtures/example-input-2.txt`, 'utf-8'),
			await readFile(`${__dirname}/fixtures/example-input-3.txt`, 'utf-8'),
			await readFile(`${__dirname}/fixtures/example-input-4.txt`, 'utf-8'),
			await readFile(`${__dirname}/fixtures/example-input-5.txt`, 'utf-8')
		];
		puzzleInput = await readFile(`${__dirname}/fixtures/puzzle-input.txt`, 'utf-8');
	});

	describe('solution 1', () => {

		describe('with test data #1', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(exampleInput[0]), 7);
			});

		});

		describe('with test data #2', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(exampleInput[1]), 5);
			});

		});

		describe('with test data #3', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(exampleInput[2]), 6);
			});

		});

		describe('with test data #4', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(exampleInput[3]), 10);
			});

		});

		describe('with test data #5', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(exampleInput[4]), 11);
			});

		});

		describe('with puzzle input', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(puzzleInput), 1282);
			});

		});

	});

	describe('solution 2', () => {

		describe('with test data #1', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution2(exampleInput[0]), 19);
			});

		});

		describe('with test data #2', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution2(exampleInput[1]), 23);
			});

		});

		describe('with test data #3', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution2(exampleInput[2]), 23);
			});

		});

		describe('with test data #4', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution2(exampleInput[3]), 29);
			});

		});

		describe('with test data #5', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution2(exampleInput[4]), 26);
			});

		});

		describe('with puzzle input', () => {

			it('returns the expected result', () => {
				assert.deepEqual(solution2(puzzleInput), 3513);
			});

		});

	});

});
