'use strict';

const {join: joinPath} = require('node:path');
const {sum} = require('@rowanmanning/adventofcode-math');


exports.solution1 = function solution1(input) {
	const MAX_FILE_SIZE = 100_000;

	const fileSystem = Directory.fromCommandInput(input);
	const sizes = fileSystem.directories.map(directory => directory.size);
	return sizes.filter(size => size <= MAX_FILE_SIZE).reduce(sum);
};

exports.solution2 = function solution2(input) {
	const TOTAL_DISK_SPACE = 70_000_000;
	const SPACE_REQUIREMENT = 30_000_000;

	const fileSystem = Directory.fromCommandInput(input);
	const freeSpace = TOTAL_DISK_SPACE - fileSystem.size;
	const targetDeletion = SPACE_REQUIREMENT - freeSpace;

	const sizes = fileSystem.directories
		.map(directory => directory.size)
		.filter(size => size >= targetDeletion);

	return Math.min(...sizes);
};

class FileSystemEntry {

	/**
	 * @type {string}
	 */
	#name;

	/**
	 * @returns {string}
	 */
	get name() {
		return this.#name;
	}

	/**
	 * @type {Directory | null}
	 */
	#parent;

	/**
	 * @returns {Directory | null}
	 */
	get parent() {
		return this.#parent;
	}

	/**
	 * @returns {string}
	 */
	get path() {
		if (this.parent?.path) {
			return joinPath(this.parent.path, this.#name);
		}
		return this.#name;
	}

	/**
	 * @param {object} options
	 * @param {string} options.name
	 * @param {Directory | null} [options.parent]
	 */
	constructor({name, parent = null}) {
		this.#name = name;
		this.#parent = parent;
	}

}

class Directory extends FileSystemEntry {

	/**
	 * @type {Set<Directory | File>}
	 */
	#children = new Set();

	/**
	 * @param {object} options
	 * @param {string} options.name
	 * @param {Directory | null} [options.parent]
	 */
	constructor({name, parent = null}) {
		super({
			name,
			parent
		});
		parent?.addChild(this);
	}

	/**
	 * @param {Directory | File} child
	 */
	addChild(child) {
		this.#children.add(child);
	}

	/**
	 * @returns {number}
	 */
	get size() {
		return [...this.#children].reduce((total, child) => {
			return total + child.size;
		}, 0);
	}

	/**
	 * @returns {Array<Directory>}
	 */
	get directories() {
		return [...this.#children]
			.filter(

				/**
				 * @param {File | Directory} child
				 * @returns {child is Directory}
				 */
				child => child instanceof Directory
			)
			.flatMap(child => {
				return [
					child,
					...child.directories
				];
			});
	}

	valueOf() {
		return {
			name: this.name,
			children: [...this.#children].map(child => child.valueOf())
		};
	}

	/**
	 * @param {string} input
	 * @returns {Directory}
	 */
	static fromCommandInput(input) {
		const root = new Directory({name: '/'});
		const pathMap = {'/': root};
		let current = root;

		for (const line of input.split('\n')) {
			const parts = line.split(' ');
			if (line.startsWith('$')) {
				const [, command, argument] = parts;
				if (command === 'cd') {
					if (argument === '/') {
						current = root;
					} else if (argument === '..') {
						if (!current.parent) {
							throw new Error('Cannot cd up a level with no parent');
						}
						current = current.parent;
					} else {
						const path = joinPath(current.path, argument);
						pathMap[path] = current = (
							pathMap[path] || new Directory({
								name: argument,
								parent: current
							})
						);
					}
				}
			} else {
				const path = joinPath(current.path, parts[1]);
				if (!pathMap[path]) {
					if (parts[0] === 'dir') {
						pathMap[path] = new Directory({
							name: parts[1],
							parent: current
						});
					} else {
						pathMap[path] = new File({
							name: parts[1],
							parent: current,
							size: Number(parts[0])
						});
					}
				}
			}
		}
		return pathMap['/'];
	}

}

class File extends FileSystemEntry {

	/**
	 * @type {number}
	 */
	#size;

	/**
	 * @returns {number}
	 */
	get size() {
		return this.#size;
	}

	/**
	 * @param {object} options
	 * @param {string} options.name
	 * @param {Directory | null} [options.parent]
	 * @param {number} options.size
	 */
	constructor({name, parent, size}) {
		super({
			name,
			parent
		});
		this.#size = size;
		parent?.addChild(this);
	}

	valueOf() {
		return {
			name: this.name,
			size: this.#size
		};
	}

}
