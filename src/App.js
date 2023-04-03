import './App.css';
import React from 'react';
import Solver from './solve.mjs';

import Button from '@mui/material/Button';

const UNSOLVABLE = 'Unsolvable';
const SOLVABLE = 'Solvable';

function Table(props) {

  const onChange = (e) => {
    const value = e.target.value;
    console.log('value: ' + value);
    if (value !== '' && (value < '1' || value > '9')) {
      console.log('invalid input');
      return;
    }

    let value_cell;
    if (value === '') {
      value_cell = null;
    } else {
      value_cell = parseInt(value);
    }
    console.log('value_cell: ' + value_cell);
    const row = e.target.parentNode.parentNode.rowIndex;
    const col = e.target.parentNode.cellIndex;
    const newBoard = props.board.slice();
    newBoard[row][col] = value_cell;
    props.setBoard(newBoard);

    const solution = props.solver.solve(newBoard);
    if (solution) {
      props.setSolBoard(solution);
      props.setSolverState(SOLVABLE);
    } else {
      props.setSolverState(UNSOLVABLE);
      const solBoard = new Array(9).fill(null).map(() => new Array(9).fill('X'));
      props.setSolBoard(solBoard);
    }
  }

  // Display input board
  const table = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const cell = props.board[i][j] === null ? '' : props.board[i][j];
      row.push(<td key={i*9+j}>
        <input onChange={onChange} type="text" size="1" maxLength="1" value={cell}/>
      </td>
      )
    }
    table.push(<tr key={i}>{row}</tr>);
  }
  return <table><tbody>{table}</tbody></table>;
}

// Output board is static
function StaticTable(props) {
  const table = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      row.push(<td key={i*9+j}>{props.board[i][j]}</td>)
    }
    table.push(<tr key={i}>{row}</tr>);
  }
  return <table><tbody>{table}</tbody></table>;
}

// Returns: 9x9 double array
function generate_random_board() {
  // First generate a random permutation of 1-9
  // Then solve the board
  // Then remove some numbers
  const order = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 9; i++) {
    const j = Math.floor(Math.random() * 9);
    const temp = order[i];
    order[i] = order[j];
    order[j] = temp;
  }
  const board = Array.from({length: 9}, () => Array.from({length: 9}, () => null));
  for (let i = 0; i < 9; i++) {
    board[i][0] = order[i];
  }
  const sol = new Solver(false).solve(board);
  // remove randomly 60 times
  for (let n = 0; n < 60; ++n) {
    const i = Math.floor(Math.random() * 9);
    const j = Math.floor(Math.random() * 9);
    if (sol[i][j] !== null) {
      sol[i][j] = null;
      ++n;
    }
  }
  return sol;
}

function App(props) {
  const solver = new Solver(false);
  const [solver_state, setSolverState] = React.useState(SOLVABLE);
  const [board, setBoard] = React.useState(generate_random_board());
  // const [board, setBoard] = React.useState([
  //   [5, 3, 4, 6, 7, 8, 9, 1, 2],
  //   [6, 7, 2, 1, 9, 5, 3, 4, 8],
  //   [1, 9, 8, 3, 4, 2, 5, 6, 7],
  //   [8, 5, 9, 7, 6, 1, 4, 2, 3],
  //   [4, 2, 6, 8, 5, 3, 7, 9, 1],
  //   [7, 1, 3, 9, 2, 4, 8, 5, 6],
  //   [9, 6, 1, 5, 3, 7, 2, 8, 4],
  //   [2, 8, 7, 4, 1, 9, 6, 3, 5],
  //   [3, 4, 5, 2, 8, 6, 1, 7, 9]
  // ]);
  const [solBoard, setSolBoard] = React.useState(board);

  const clear_input = () => {
    setBoard(Array.from({length: 9}, () => Array.from({length: 9}, () => null)));
  };
  const set_random_board = () => {
    const rnd_board = generate_random_board();
    setBoard(rnd_board);
    setSolBoard(rnd_board);
  };

  return (
    <div className="App">
      <b>Input:</b><br></br>
      <Button onClick={set_random_board}>Random</Button>
      <Button onClick={clear_input}>Clear</Button>
      <Table board={board} setBoard={setBoard} setSolBoard={setSolBoard}
        setSolverState={setSolverState}
        solver={solver}></Table>
      <b>Solution:</b><br></br>
      Status: {solver_state}
      <StaticTable board={solBoard}></StaticTable>
    </div>
  );
}

export default App;
