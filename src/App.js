import React, { useState } from 'react';

function Square(props) {
  return (
    <button
      style={{
        backgroundColor: props.value === 'X' ? '#48BB78' : props.value === 'O' ? '#F56565' : '#FFF',
        border: '1px solid #E2E8F0',
        color: props.value === 'X' || props.value === 'O' ? '#FFF' : '#4A5568',
        fontSize: '24px',
        fontWeight: 'bold',
        lineHeight: '34px',
        height: '34px',
        width: '34px',
        margin: '-1px',
        padding: '0',
        textAlign: 'center',
        float: 'left',
        transition: 'background-color 0.3s ease-in-out',
      }}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (squares.every(square => square)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div style={{ background: '#2D3748', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px', color: '#FFF' }}>{status}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {Array(9)
          .fill()
          .map((_, i) => (
            <div key={i}>{renderSquare(i)}</div>
          ))}
      </div>
      <button
        style={{
          background: '#4A90E2',
          color: '#FFF',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          marginTop: '20px',
          cursor: 'pointer',
          transition: 'background 0.3s ease-in-out',
        }}
        onClick={restartGame}
      >
        Restart
      </button>
      <div style={{ marginTop: '20px', color: '#4A5568', textAlign: 'center', fontSize: '0.8rem' }}>Created by vici</div>
    </div>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', background: '#1A202C' }}>
      <div style={{ padding: '20px', background: '#2D3748', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px', color: '#FFF', textAlign: 'center' }}>Tic Tac Toe</h1>
        <div style={{ width: 'fit-content' }}>
          <Board />
        </div>
      </div>
    </div>
  );
}

export default App;
