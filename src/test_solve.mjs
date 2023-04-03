import Solver from "./solve.mjs";
import BitSet from "bitset";

function test_solvable() {
  let board = [
      [null, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, null],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, null, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];
  console.log(board);

  const solver = new Solver(false);
  let r = solver.solve(board);
  console.log('Result')
  for (let i = 0; i < 9; ++i) {
    console.log(r[i].join(' '));
  }
}

function test_unsolvable() {
  // generate 9x9 empty board
  let board = Array.from({length: 9}, () => Array.from({length: 9}, () => null));
  board[0][0] = 1;
  board[0][1] = 1;
  console.log(board);

  const solver = new Solver();
  let r = solver.solve(board);
  console.log(r)
}

test_solvable();
test_unsolvable();