/**
 * Calculate star rating from player moves vs puzzle par.
 * @param {number} moves
 * @param {number} parMoves Optimal or target move count.
 * @returns {1 | 2 | 3}
 */
export function calculateStars(moves, parMoves) {
  if (moves <= parMoves) {
    return 3;
  }
  if (moves <= parMoves + 4) {
    return 2;
  }
  return 1;
}

/**
 * @param {number} stars
 * @returns {number}
 */
export function coinsForStars(stars) {
  return stars * 10;
}
