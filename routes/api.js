'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.puzzle || !req.body.coordinate || !req.body.value)
        return res.json({ error: 'Required field(s) missing' });
      else if (!/^[1-9.]+$/.test(req.body.puzzle))
        return res.json({ error: 'Invalid characters in puzzle' });
      else if (req.body.puzzle.length != 81)
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      else if (req.body.coordinate.length != 2 || !/^[A-I]+$/.test(req.body.coordinate[0]) || !/^[1-9]+$/.test(req.body.coordinate[1]))
        return res.json({ error: 'Invalid coordinate' });
      else if (!/^[1-9]+$/.test(req.body.value))
        return res.json({ error: 'Invalid value' });

      let conflict = [];
      if (!solver.checkRowPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value))
        conflict.push('row');
      if (!solver.checkColPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value))
        conflict.push('column');
      if (!solver.checkRegionPlacement(req.body.puzzle, req.body.coordinate[0], req.body.coordinate[1], req.body.value))
        conflict.push('region');
      if (conflict.length == 0)
        return res.json({ valid: true });
      else
        return res.json({ valid: false, conflict: conflict });
    });

  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle)
        return res.json({ error: 'Required field missing' });
      else if (!/^[1-9.]+$/.test(req.body.puzzle))
        return res.json({ error: 'Invalid characters in puzzle' });
      else if (req.body.puzzle.length != 81)
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      if (!solver.solve(req.body.puzzle))
        return res.json({ error: 'Puzzle cannot be solved' });
      else
        return res.json({ solution: solver.solve(req.body.puzzle) });
    });
};
