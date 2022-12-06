'use strict';

const {chunk} = require('@rowanmanning/adventofcode-array');

exports.solution1 = function solution1(input) {
	const {procedure, supplyArea} = parseInput(input);
	for (const step of procedure) {
		let count = 0;
		while (count < step.count) {
			supplyArea.performMove({
				fromStack: step.fromStack,
				toStack: step.toStack
			});
			count += 1;
		}
	}
	return supplyArea.getTopCrates().join('');
};

exports.solution2 = function solution2(input) {
	const {procedure, supplyArea} = parseInput(input);
	for (const step of procedure) {
		supplyArea.performMove(step);
	}
	return supplyArea.getTopCrates().join('');
};

/**
 * Parse an input string.
 *
 * @param {string} input - The raw input.
 * @returns {{procedure: ProcedureStep[], supplyArea: SupplyArea}} - Returns the procedure stacks.
 */
function parseInput(input) {
	const [crateStacks, procedure] = input.split('\n\n');
	return {
		supplyArea: SupplyArea.fromInput(crateStacks),
		procedure: parseProcedure(procedure)
	};
}

/**
 * @typedef {object} ProcedureStep
 * @property {number} count - The number of crates to move.
 * @property {string} fromStack - The stack to move a crate from.
 * @property {string} toStack - The stack to move a crate to.
 */

const PROCEDURE_STEP_REGEXP = /^move (\d+) from (\d+) to (\d+)$/;

/**
 * Parse a procedure string.
 *
 * @param {string} input - The raw procedure input.
 * @returns {Array<ProcedureStep>} - Returns the processed procedure.
 */
function parseProcedure(input) {
	const steps = [];
	for (const step of input.split('\n')) {
		const match = step.match(PROCEDURE_STEP_REGEXP);
		if (match) {
			const [, count, from, to] = match;
			steps.push({
				count: Number(count),
				fromStack: from,
				toStack: to
			});
		}
	}
	return steps;
}

class SupplyArea {

	constructor({crateStacks}) {
		this.crateStacks = crateStacks;
		this.crateStacksByName = Object.fromEntries(crateStacks.map(stack => [stack.name, stack]));
	}

	performMove({fromStack, toStack, count = 1}) {
		let operations = 0;
		const crates = [];
		while (operations < count) {
			crates.push(this.crateStacksByName[fromStack].remove());
			operations += 1;
		}
		for (const crate of crates.reverse()) {
			this.crateStacksByName[toStack].add(crate);
		}
	}

	getTopCrates() {
		return this.crateStacks.map(stack => stack.getTopCrate());
	}

	static fromInput(input) {
		const rows = input
			.split('\n')
			.map(row => {
				return chunk([...row], 4)
					.map(column => (column[1].trim() ? column[1] : null));
			});
		const crateStacks = rows.pop().map((name, index) => {
			const crates = rows.filter(row => row[index]).map(row => row[index]);
			return new CrateStack({
				name,
				crates
			});
		});
		return new SupplyArea({crateStacks});
	}

}

class CrateStack {

	constructor({name, crates}) {
		this.name = name;
		this.crates = crates;
	}

	getTopCrate() {
		return this.crates[0];
	}

	add(crate) {
		this.crates.unshift(crate);
	}

	remove() {
		return this.crates.shift();
	}

}
