/**
 * Determine whether the puzzle has been solved.
 * Every jar must be empty or completely filled with one color.
 * @param {import('@/game/models/Jar').Jar[]} jars
 * @returns {boolean}
 */
export function isLevelComplete(jars) {
  return jars.every((jar) => jar.isSolved());
}

/**
 * Count how many jars are fully sorted (non-empty and solved).
 * @param {import('@/game/models/Jar').Jar[]} jars
 * @returns {number}
 */
export function countSolvedJars(jars) {
  return jars.filter((jar) => !jar.isEmpty() && jar.isSolved()).length;
}
