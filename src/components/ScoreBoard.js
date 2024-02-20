import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { pause, resume, restart } from '../features/gameSlice'

export default function ScoreBoard() {
  const dispatch = useDispatch()
  const { score, completedRows, speed, level, isRunning, gameOver } = useSelector(state => state)
  return (
    <div className="score-board">
      <div>Score: { score }</div>
      <div>Rows: { completedRows }</div>
      <div>Level: { level }</div>
      <div>Current drop delay: { speed } ms</div>
      <button 
        disabled={gameOver}
        className="score-board-button" 
        onClick={(e) => {
          if (gameOver) { return }
          if (isRunning) {
            dispatch(pause())
          } else {
            dispatch(resume())
          }
      }}>{isRunning ? 'Pause' : 'Play'}</button>
      <button 
        className="score-board-button" 
        onClick={(e) => {
          dispatch(restart())
        }
      }>Restart</button>
    </div>
  )
}