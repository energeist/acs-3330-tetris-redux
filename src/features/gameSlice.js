import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'game',
  initialState: {},
  reducers: {
    pause: () => { },
    resume: () => { },
    restart: () => { },
    gameOver: () => { },
    moveLeft: () => { },
    moveRight: () => { },
    moveDown: () => { },
    rotate: () => { },
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