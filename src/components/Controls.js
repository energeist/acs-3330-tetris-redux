import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { moveDown, moveLeft, moveRight, rotate } from '../features/gameSlice'

export default function Controls(props) {
  const dispatch = useDispatch()
  const { isRunning, speed, gameOver } = useSelector(state => state)
  
  // Set up the game timer
  const requestRef = useRef()
  const lastUpdateTimeRef = useRef(0)
  const progressTimeRef = useRef(0)
  const speedRef = useRef(1000)

  const update = (time) => {
    requestRef.current = requestAnimationFrame(update)
    if (!isRunning) {
      return 
    }
    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = time
    }
    if (!speedRef.current) {
      speedRef.current = speed
    }
    const deltaTime = time - lastUpdateTimeRef.current
    progressTimeRef.current += deltaTime
    if (progressTimeRef.current > speed) {
      dispatch(moveDown())
      progressTimeRef.current = 0
    }
    lastUpdateTimeRef.current = time
  }

  // Initialize request animation frame and remove it when isRunning changes
  useEffect(() => {
    requestRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(requestRef.current)
  }, [isRunning, speed])

  // Function to handle control events either by key press or click
  const handleControlEvent = (action) => {
    if (!isRunning || gameOver) return;
    switch (action) {
      case 'left':
        dispatch(moveLeft());
        break;
      case 'right':
        dispatch(moveRight());
        break;
      case 'down':
        dispatch(moveDown());
        break;
      case 'rotate':
        dispatch(rotate());
        break;
      default:
        break;
    }
  };

  // Keyboard interaction
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isRunning || gameOver) return;
      switch (event.key) {
        case 'ArrowLeft':
          handleControlEvent('left');
          break;
        case 'ArrowRight':
          handleControlEvent('right');
          break;
        case 'ArrowDown':
          handleControlEvent('down');
          break;
        case 'ArrowUp':
          handleControlEvent('rotate');
          break;
        default:
          break;
      }
    };

    // Event listeners
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isRunning, gameOver, dispatch]);

  return (
    <div className="controls">
      {/* left */}
      <button 
        disabled={!isRunning || gameOver }
        className="control-button" 
        onClick={(e) => {
          handleControlEvent('left')
        }
      }>Left</button>

      {/* right */}
      <button 
        disabled={!isRunning || gameOver }
        className="control-button" 
        onClick={(e) => {
          handleControlEvent('right')
        }
      }>Right</button>

      {/* rotate */}
      <button 
        disabled={!isRunning || gameOver }
        className="control-button" 
        onClick={(e) => {
          handleControlEvent('rotate')
        }  
      }>Rotate</button>

      {/* down */}
      <button 
        disabled={!isRunning || gameOver }
        className="control-button" 
        onClick={(e) => {
          handleControlEvent('down')
        }
      }>Down</button>
    </div>   
  )
}