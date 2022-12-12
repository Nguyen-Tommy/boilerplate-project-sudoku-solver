const chai = require('chai');
const { puzzlesAndSolutions } = require('../controllers/puzzle-strings.js');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

require('../controllers/puzzle-strings.js');

suite('Unit Tests', () => {

    suite('Test validate function', () => {
        test('Logic handles a valid puzzle string of 81 characters', function () {
            assert.isTrue(solver.validate(puzzlesAndSolutions[0][0]));
        });

        test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
            let invalidArray = 'a.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isFalse(solver.validate(invalidArray));
        });

        test('Logic handles a puzzle string that is not 81 characters in length', function () {
            let invalidArray = '.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
            assert.isFalse(solver.validate(invalidArray));
        });
    });

    suite('Test checkRowPlacement function', () => {
        test('Logic handles a valid row placement', function () {
            assert.isTrue(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'A', 2, 3));
        });

        test('Logic handles an invalid row placement', function () {
            assert.isFalse(solver.checkRowPlacement(puzzlesAndSolutions[0][0], 'A', 2, 1));
        });
    });

    suite('Test checkColPlacement function', () => {
        test('Logic handles a valid column placement', function () {
            assert.isTrue(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'A', 2, 1));
        });

        test('Logic handles an invalid column placement', function () {
            assert.isFalse(solver.checkColPlacement(puzzlesAndSolutions[0][0], 'A', 2, 2));
        });
    });

    suite('Test checkRegionPlacement function', () => {
        test('Logic handles a valid region (3x3 grid) placement', function () {
            assert.isTrue(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'A', 2, 3));
        });

        test('Logic handles an invalid region (3x3 grid) placement', function () {
            assert.isFalse(solver.checkRegionPlacement(puzzlesAndSolutions[0][0], 'A', 2, 6));
        });
    });

    suite('Test solve function', () => {
        test('Valid puzzle strings pass the solver', function () {
            assert.equal(solver.solve(puzzlesAndSolutions[0][0]).join(''), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        });
        test('Invalid puzzle strings fail the solver', function () {
            let invalidArray = '9.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
            assert.isFalse(solver.solve(invalidArray));
        });
        test('Solver returns the expected solution for an incomplete puzzle', function () {
            assert.equal(solver.solve(puzzlesAndSolutions[0][0]).join(''), '135762984946381257728459613694517832812936745357824196473298561581673429269145378');
        });
    });
});
