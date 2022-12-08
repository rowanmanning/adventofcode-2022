/* eslint-disable id-length */
'use strict';

// Just don't even look at this. It's monstrous and slow
// and I don't have the energy to fix it

exports.solution1 = function solution1(input) {
	const matrix = new Matrix(
		input.split('\n').map(row => row.split('').map(height => ({
			height: Number(height),
			visible: false
		})))
	);
	const bounds = matrix.bounds;
	const cells = [...matrix].map(cell => {
		// Outer edges
		if (
			cell.x === bounds.minX ||
			cell.x === bounds.maxX ||
			cell.y === bounds.minY ||
			cell.y === bounds.maxY
		) {
			cell.value.visible = true;
			return cell;
		}

		// Inside
		const siblings = matrix.siblings(cell.x, cell.y);
		const north = siblings.filter(({direction}) => direction === 'north');
		const south = siblings.filter(({direction}) => direction === 'south');
		const east = siblings.filter(({direction}) => direction === 'east');
		const west = siblings.filter(({direction}) => direction === 'west');
		if (
			north.every(relationship => cell.value.height > relationship.cell.value.height) ||
			south.every(relationship => cell.value.height > relationship.cell.value.height) ||
			east.every(relationship => cell.value.height > relationship.cell.value.height) ||
			west.every(relationship => cell.value.height > relationship.cell.value.height)
		) {
			cell.value.visible = true;
		}

		return cell;
	});

	return cells.filter(cell => cell.value.visible).length;
};

exports.solution2 = function solution2(input) {
	const matrix = new Matrix(
		input.split('\n').map(row => row.split('').map(height => ({
			height: Number(height),
			visible: false
		})))
	);
	const distances = [...matrix].map(cell => {
		const siblings = matrix.siblings(cell.x, cell.y);
		const north = siblings.filter(({direction}) => direction === 'north')
			.sort((a, b) => b.cell.y - a.cell.y);
		const south = siblings.filter(({direction}) => direction === 'south')
			.sort((a, b) => a.cell.y - b.cell.y);
		const east = siblings.filter(({direction}) => direction === 'east')
			.sort((a, b) => a.cell.x - b.cell.x);
		const west = siblings.filter(({direction}) => direction === 'west')
			.sort((a, b) => b.cell.x - a.cell.x);

		let northDistance = 0;
		let southDistance = 0;
		let eastDistance = 0;
		let westDistance = 0;
		for (const relationship of north) {
			northDistance += 1;
			if (relationship.cell.value.height >= cell.value.height) {
				break;
			}
		}
		for (const relationship of south) {
			southDistance += 1;
			if (relationship.cell.value.height >= cell.value.height) {
				break;
			}
		}
		for (const relationship of east) {
			eastDistance += 1;
			if (relationship.cell.value.height >= cell.value.height) {
				break;
			}
		}
		for (const relationship of west) {
			westDistance += 1;
			if (relationship.cell.value.height >= cell.value.height) {
				break;
			}
		}

		return (northDistance * southDistance * eastDistance * westDistance);
	});

	return Math.max(...distances);
};


/**
 * @typedef {object} Cell
 * @property {number} x
 * @property {number} y
 * @property {any} value
 */

/**
 * @typedef {object} SiblingRelationship
 * @property {number} xDiff
 * @property {number} yDiff
 * @property {string} direction
 * @property {Cell} cell
 */

/**
 * @typedef {object} MatrixBounds
 * @property {number} minX
 * @property {number} minY
 * @property {number} maxX
 * @property {number} maxY
 */

/**
 * Class representing a data matrix.
 */
class Matrix {

	/**
	 * @type {Array<Cell>}
	 */
	#cells;

	/**
	 * @type {Object<string, Cell>}
	 */
	#cellMap;

	/**
	 * @type {MatrixBounds}
	 */
	#bounds;

	/**
	 * @param {Array<Array<any>>} data
	 */
	constructor(data) {
		this.#cells = data.flatMap((row, rowIndex) => row.map((value, columnIndex) => ({
			x: columnIndex,
			y: rowIndex,
			value
		})));
		this.#cellMap = Object.fromEntries(this.#cells.map(cell => {
			return [`${cell.x}/${cell.y}`, cell];
		}));
		this.#bounds = Object.freeze({
			minX: 0,
			minY: 0,
			maxX: Math.max(...this.#cells.map(({x}) => x)),
			maxY: Math.max(...this.#cells.map(({y}) => y))
		});
	}

	/**
	 * @returns {Array<Cell>}
	 */
	get data() {
		return structuredClone(this.#cells);
	}

	/**
	 * @yields {Cell}
	 */
	*[Symbol.iterator]() {
		let index = 0;
		const max = this.#cells.length - 1;
		while (index <= max) {
			yield structuredClone(this.#cells[index]);
			index += 1;
		}
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns {Cell | null}.
	 */
	cell(x, y) {
		const index = `${x}/${y}`;
		return this.#cellMap[index] ? structuredClone(this.#cellMap[index]) : null;
	}

	/**
	 *
	 * @param {*} x
	 * @param {*} y
	 * @returns {Array<SiblingRelationship>}
	 */
	siblings(x, y) {
		return this.#cells
			.filter(cell => {
				return (cell.x === x || cell.y === y) && !(cell.x === x && cell.y === y);
			})
			.map(cell => {
				const xDiff = cell.x - x;
				const yDiff = cell.y - y;
				let direction = 'east';
				if (xDiff === 0 && yDiff < 0) {
					direction = 'north';
				} else if (xDiff === 0 && yDiff > 0) {
					direction = 'south';
				} else if (yDiff === 0 && xDiff < 0) {
					direction = 'west';
				}
				return {
					xDiff,
					yDiff,
					direction,
					cell: structuredClone(cell)
				};
			});
	}

	/**
	 * @returns {MatrixBounds}
	 */
	get bounds() {
		return this.#bounds;
	}

}
