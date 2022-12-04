'use strict';

const {assert} = require('chai');
const {readFile} = require('node:fs/promises');

const {solution1, solution2} = require('..');

describe('solution', () => {

	describe('.solution1(input)', () => {
		let exampleInput;
		let puzzleInput;

		before(async () => {
			exampleInput = await readFile(`${__dirname}/fixtures/example-input.txt`, 'utf-8');
			puzzleInput = await readFile(`${__dirname}/fixtures/puzzle-input.txt`, 'utf-8');
		});

		describe('with test data', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(exampleInput), 24000);
			});

		});

		describe('with puzzle input', () => {

			it('returns the expected result', () => {
				assert.strictEqual(solution1(puzzleInput), 64929);
			});

		});

	});

	describe('.solution2(input)', () => {

		beforeEach(() => {
			solution2();
		});

		it('has tests');

	});

});
