/**
 * @typedef {'tutorial' | 'easy' | 'medium' | 'hard' | 'expert'} LevelDifficulty
 */

/**
 * @typedef {Object} LevelDefinition
 * @property {number} id Internal level identifier.
 * @property {number} number Player-facing level number.
 * @property {string} name Display name.
 * @property {LevelDifficulty} difficulty
 * @property {number} jarCount
 * @property {number} capacity Layers per jar.
 * @property {string[][]} jars Top-to-bottom liquid color keys per jar (index 0 = top).
 * @property {number} [parMoves] Target move count for 3-star rating.
 */

export {};
