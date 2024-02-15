export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
random(1, 6) // returns 3 (or 1, 2, 3, 4, 5, 6)