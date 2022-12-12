

class SudokuSolver {

  validate(puzzleString) {
    const regex = /^[1-9.]+$/;

    if (!puzzleString)
      return false;
    else if (!regex.test(puzzleString))
      return false;
    else if (puzzleString.length != 81)
      return false;
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    row = this.letterToNumber(row);

    for (let i = (row - 1) * 9; i < (row - 1) * 9 + 9; i++) {
      if (puzzleString[i] == value && i != (row - 1) * 9 + column - 1)
        return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    row = this.letterToNumber(row);

    for (let i = column - 1; i < 81; i += 9) {
      if (puzzleString[i] == value && i != (row - 1) * 9 + column - 1)
        return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    row = this.letterToNumber(row);
    let rowRegion = Math.floor((row - 1) / 3);
    let colRegion = Math.floor((column - 1) / 3);
    let count = 0;

    for (let i = rowRegion * 27 + colRegion * 3; i < (rowRegion * 27 + colRegion * 3) + 21; i++) {
      if (puzzleString[i] == value && i != (row - 1) * 9 + column - 1)
        return false;
      count++;
      if (count % 3 == 0)
        i += 6;
    }
    return true;
  }

  solve(puzzleString) {
    let solvedString = this.deepCopyArray(puzzleString);
    let backTrack = false;

    for (let i = 0; i < 81; i++) {
      if (i < 0)
        return false;
      if (puzzleString[i] == '.') {
        backTrack = true;
        for (let j = solvedString[i] == '.' ? 1 : Number(solvedString[i]) + 1; j < 10; j++) {
          if (this.checkRowPlacement(solvedString, Math.floor(i / 9) + 1, i % 9 + 1, j) && this.checkColPlacement(solvedString, Math.floor(i / 9) + 1, i % 9 + 1, j) && this.checkRegionPlacement(solvedString, Math.floor(i / 9) + 1, i % 9 + 1, j)) {
            solvedString[i] = String(j);
            backTrack = false;
            break;
          }
        }
        if (backTrack)
          solvedString[i] = '.';
      }
      if (backTrack) {
        i -= 2;
      }
    }
    return solvedString;
  }

  letterToNumber(letter) {
    switch (letter) {
      case 'A': return 1; break;
      case 'B': return 2; break;
      case 'C': return 3; break;
      case 'D': return 4; break;
      case 'E': return 5; break;
      case 'F': return 6; break;
      case 'G': return 7; break;
      case 'H': return 8; break;
      case 'I': return 9; break;
      default: return letter;
    }
  }

  deepCopyArray(array) {
    let result = [];

    for (let i = 0; i < array.length; i++) {
      result[i] = array[i];
    }
    return result;
  }
}

module.exports = SudokuSolver;

