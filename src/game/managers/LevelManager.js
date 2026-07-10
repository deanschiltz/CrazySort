import { pack01Levels } from '@/game/levels/pack01';

/**
 * @typedef {import('@/game/levels/levelTypes').LevelDefinition} LevelDefinition
 */

/** Total levels shipped in version 1. */
export const TOTAL_LEVELS_V1 = 50;

/**
 * Loads and provides access to level packs.
 * Future packs (51–100, etc.) register here without gameplay changes.
 */
export class LevelManager {
  constructor() {
    /** @type {LevelDefinition[]} */
    this.levels = [...pack01Levels].sort((a, b) => a.number - b.number);
  }

  /**
   * @param {number} levelNumber 1-based player-facing level number.
   * @returns {LevelDefinition | null}
   */
  getLevel(levelNumber) {
    return this.levels.find((level) => level.number === levelNumber) ?? null;
  }

  /** @returns {LevelDefinition[]} */
  getAllLevels() {
    return this.levels;
  }

  /** @returns {number} */
  getTotalLevels() {
    return this.levels.length;
  }

  /**
   * @param {number} levelNumber
   * @returns {LevelDefinition | null}
   */
  getNextLevel(levelNumber) {
    return this.getLevel(levelNumber + 1);
  }

  /**
   * @param {'tutorial' | 'easy' | 'medium' | 'hard' | 'expert'} difficulty
   * @returns {LevelDefinition[]}
   */
  getLevelsByDifficulty(difficulty) {
    return this.levels.filter((level) => level.difficulty === difficulty);
  }
}

export const levelManager = new LevelManager();
