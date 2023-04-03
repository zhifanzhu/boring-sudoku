import './App.css';
import React from 'react';
import Solver from './solve.mjs';

const INVALID = 'Invalid Character';
const UNSOLVABLE = 'Unsolvable';
const SOLVABLE = 'Solvable';

function Table(props) {
  // board: 9x9 array of strings
  // return true if each cell is a digit 1-9, false otherwise
  const sanityCheck = (board) => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === '') return false;
        let c = parseInt(board[i][j]);
        if (isNaN(c)) return false;
        if (c < 1 || c > 9) return false;
      }
    }
    return true;
  }

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
    }
  }
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

function App(props) {
  const solver = new Solver(false);
  const [solver_state, setSolverState] = React.useState(SOLVABLE);
  const [board, setBoard] = React.useState([
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ]);
  const [solBoard, setSolBoard] = React.useState([
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ]);

  return (
    <div className="App">
      Input:
      <Table board={board} setBoard={setBoard} setSolBoard={setSolBoard}
        setSolverState={setSolverState}
        solver={solver}></Table>
      Output:<br></br>
      Status: {solver_state}
      <StaticTable board={solBoard}></StaticTable>
    </div>
  );
}

export default App;
