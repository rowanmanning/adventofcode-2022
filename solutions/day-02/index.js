/* eslint-disable id-length */
'use strict';

const {sum} = require('@rowanmanning/adventofcode-math');

const GUIDE_TO_SHAPE = {
	A: 'rock',
	B: 'paper',
	C: 'scissors',
	X: 'rock',
	Y: 'paper',
	Z: 'scissors'
};

const SHAPE_TO_SCORE = {
	rock: 1,
	paper: 2,
	scissors: 3
};

const SHAPES_TO_RESULT = {
	rock: {
		rock: 'draw',
		paper: 'lose',
		scissors: 'win'
	},
	paper: {
		rock: 'win',
		paper: 'draw',
		scissors: 'lose'
	},
	scissors: {
		rock: 'lose',
		paper: 'win',
		scissors: 'draw'
	}
};

const RESULT_TO_SCORE = {
	win: 6,
	draw: 3,
	lose: 0
};

const GUIDE_TO_DESIRED_RESULT = {
	X: 'lose',
	Y: 'draw',
	Z: 'win'
};

const DESIRED_RESULT_TO_SHAPE = {
	lose: {
		rock: 'scissors',
		paper: 'rock',
		scissors: 'paper'
	},
	draw: {
		rock: 'rock',
		paper: 'paper',
		scissors: 'scissors'
	},
	win: {
		rock: 'paper',
		paper: 'scissors',
		scissors: 'rock'
	}
};

exports.solution1 = function solution1(input) {
	return input.split('\n')
		.map(round => {
			const [theirPlay, yourPlay] = round.split(' ');

			const theirShape = GUIDE_TO_SHAPE[theirPlay];
			const yourShape = GUIDE_TO_SHAPE[yourPlay];

			const result = SHAPES_TO_RESULT[yourShape][theirShape];

			return SHAPE_TO_SCORE[yourShape] + RESULT_TO_SCORE[result];
		})
		.reduce(sum);
};

exports.solution2 = function solution2(input) {
	return input.split('\n')
		.map(round => {
			const [theirPlay, yourPlay] = round.split(' ');

			const theirShape = GUIDE_TO_SHAPE[theirPlay];
			const yourDesiredResult = GUIDE_TO_DESIRED_RESULT[yourPlay];

			const yourShape = DESIRED_RESULT_TO_SHAPE[yourDesiredResult][theirShape];

			return SHAPE_TO_SCORE[yourShape] + RESULT_TO_SCORE[yourDesiredResult];
		})
		.reduce(sum);
};
