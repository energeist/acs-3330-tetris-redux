import React from 'react'
import GridSquare from './GridSquare'

import { useSelector } from 'react-redux'
import { shapes } from '../utils'

// Draws the "next" block view showing the next block to drop
export default function NextBlock(props) {
  const nextShape = useSelector(state => state.nextShape)

  const block = shapes[nextShape][0] // Get the first rotation
  // Map the block to the grid
  const grid = block.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      const color = square ? nextShape : 0
      return <GridSquare key={`${row}${col}`} color={color} />
    })
  })
  
  return (
    <div className="next-block">
      {grid}
    </div>
  )
}