/**
 * @typedef {Object} SaveSettings
 * @property {boolean} soundEnabled
 * @property {boolean} musicEnabled
 */

/**
 * @typedef {Object} LevelInProgress
 * @property {number} levelNumber
 * @property {import('@/game/engine/GameEngine').GameSnapshot} snapshot
 */

/**
 * @typedef {Object} SaveStatistics
 * @property {number} totalMoves
 * @property {number} levelsCompleted
 * @property {number} gamesPlayed
 * @property {number} hintsUsed
 */

/**
 * @typedef {Object} DailyRewardProgress
 * @property {string | null} lastClaimDate ISO date string (YYYY-MM-DD)
 * @property {number} streak
 */

/**
 * @typedef {Object} SaveData
 * @property {number} unlockedLevel Highest unlocked level number.
 * @property {number} currentLevel Last played level number.
 * @property {LevelInProgress | null} levelInProgress Active puzzle state.
 * @property {number} coins
 * @property {Record<string, number>} starsEarned Level number → star count.
 * @property {Record<string, number>} bestMoves Level number → fewest moves.
 * @property {SaveStatistics} statistics
 * @property {SaveSettings} settings
 * @property {DailyRewardProgress} dailyReward
 * @property {number} hintsRemaining
 * @property {Record<string, boolean>} achievements
 */

/** @type {SaveData} */
export const DEFAULT_SAVE_DATA = {
  unlockedLevel: 1,
  currentLevel: 1,
  levelInProgress: null,
  coins: 0,
  starsEarned: {},
  bestMoves: {},
  statistics: {
    totalMoves: 0,
    levelsCompleted: 0,
    gamesPlayed: 0,
    hintsUsed: 0,
  },
  settings: {
    soundEnabled: true,
    musicEnabled: true,
  },
  dailyReward: {
    lastClaimDate: null,
    streak: 0,
  },
  hintsRemaining: 3,
  achievements: {},
};

/** AsyncStorage key for the unified save blob. */
export const SAVE_STORAGE_KEY = '@crazysort/save/v1';

/**
 * Merge persisted data with defaults so new fields always exist.
 * @param {Partial<SaveData> | null | undefined} raw
 * @returns {SaveData}
 */
export function normalizeSaveData(raw) {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_SAVE_DATA };
  }

  return {
    ...DEFAULT_SAVE_DATA,
    ...raw,
    starsEarned: { ...DEFAULT_SAVE_DATA.starsEarned, ...raw.starsEarned },
    bestMoves: { ...DEFAULT_SAVE_DATA.bestMoves, ...raw.bestMoves },
    statistics: { ...DEFAULT_SAVE_DATA.statistics, ...raw.statistics },
    settings: { ...DEFAULT_SAVE_DATA.settings, ...raw.settings },
    dailyReward: { ...DEFAULT_SAVE_DATA.dailyReward, ...raw.dailyReward },
    achievements: { ...DEFAULT_SAVE_DATA.achievements, ...raw.achievements },
  };
}
