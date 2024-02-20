import { createSlice } from '@reduxjs/toolkit'
import { 
  defaultState, 
  nextRotation, 
  canMoveTo,
  addBlockToGrid,
  checkRows,
  randomShape
} from '../utils'

export const gameSlice = createSlice({
  name: 'game',
  initialState: defaultState(),
  reducers: {
    pause: (state) => {
      state.isRunning = false
      return state
    },
    resume: (state) => { 
      state.isRunning = true
      return state
    },
    restart: () => defaultState(),
    gameOver: () => { },
    moveLeft: (state) => {
      const { shape, grid, x, y, rotation } = state
      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        state.x = x - 1
      }
      return state
    },
    moveRight: (state) => {
      const { shape, grid, x, y, rotation } = state
      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        state.x = x + 1
      }
      return state
    },
    moveDown: (state) => {
			const { x, y, shape, grid, rotation, nextShape } = state
			// Get the next potential Y position
			const maybeY = y + 1
			// Check if the current block can move here
			if (canMoveTo(shape, grid, x, maybeY, rotation)) {
        // If so move the block
        state.y = maybeY
        // In this case we're done return state!
        return state
			}
			// If not place the block
			const { newGrid, gameOver } = addBlockToGrid(shape, grid, x, y, rotation)
      if (gameOver) {
        state.gameOver = true
        return state
      }

			// reset some things to start a new shape/block
			state.x = 3
			state.y = -4
			state.rotation = 0
			state.grid = newGrid
			state.shape = nextShape
			state.nextShape = randomShape()
      
      // Check that the new block can be added 
			if (!canMoveTo(nextShape, newGrid, 0, 4, 0)) {
				// If not Game Over
				console.log("Game Should be over...")
				state.shape = 0
				state.gameOver = true
				return state
			}
      
			// Update the score based on if rows were completed or not
      // apparently redux or react doesn't like direct array decomposition so it needs to be assigned to a variable first
      let result = checkRows(newGrid)

			state.score += parseInt(result[0])
      state.completedRows += parseInt(result[1])

      // Check to see if a new level (10 rows) has been reached and decrease speed by 50ms
      if (state.completedRows >= (state.level * 10)) {
        state.level += 1
      }

      let newSpeed = 1000 - ((state.level - 1) * 100)
      if (state.speed !== newSpeed) {
        state.speed = newSpeed
      }

			return state
		},
    rotate: (state) => {
      const { shape, grid, x, y, rotation } = state
      const newRotation = nextRotation(shape, rotation)
      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation
      }
      return state
    },
  }
})

// Action creators are generated for each case reducer function
export const { 
  moveLeft, 
  moveRight, 
  moveDown, 
  rotate, 
  pause, 
  resume, 
  gameOver, 
  restart 
} = gameSlice.actions

export default gameSlice.reducer