import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turnNo, setTurnNo] = useState(0);
  const [movingMode, setMovingMode] = useState(false);
  const [movingSquare, setMovingSquare] = useState(null);

  function handleClick(i) {
    if (calculateWinner(squares)) return;
    if (movingMode){
      if (squares[i] || !isValidMovingSquare(movingSquare, i)){
        setMovingMode(false);
        return;
      }
      console.log(`swapping: ${movingSquare} and ${i}`);
      const nextSquares = squares.slice();
      nextSquares[i] = squares[movingSquare];
      nextSquares[movingSquare] = squares[i];
      setSquares(nextSquares);
      setMovingMode(false);
      setTurnNo(turnNo + 1);
    } else {
      if (turnNo >= 6){
        if(squares[i] != (turnNo % 2 == 0 ? 'X' : 'O')) return;
        setMovingSquare(i);
        setMovingMode(true);
      } else {
        if (squares[i]) return;
        const nextSquares = squares.slice();
        if (turnNo % 2 == 0) {
          nextSquares[i] = "X";
        } else {
          nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setTurnNo(turnNo + 1);
      }
    }
    
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (turnNo % 2 == 0 ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isValidMovingSquare(first, second){
  const allowedPairs = {
    0: [1, 3, 4],
    1: [0, 2, 3, 4, 5],
    2: [1, 4, 5],
    3: [0, 1, 4, 6, 7],
    4: [0, 1, 2, 3, 5, 6, 7, 8],
    5: [1, 2, 4, 7, 8],
    6: [3, 4, 7],
    7: [3, 4, 5, 6, 8],
    8: [4, 5, 7]
  };

  return allowedPairs[first]?.includes(second) ?? false;
}

