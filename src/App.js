import React from 'react';
import './App.css';

import GridSquare from './components/GridSquare'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Tetris Redux</h1>
      </header>
      <GridSquare color="1" />
      <GridSquare color="2" />
      <GridSquare color="3" />
      <GridSquare color="4" />
      <GridSquare color="5" />
      <GridSquare color="6" />
      <GridSquare color="7" />
      <GridSquare color="8" />
      <GridSquare color="0" />
    </div>
  );
}

export default App;