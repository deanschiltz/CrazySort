import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_SAVE_DATA,
  normalizeSaveData,
  SAVE_STORAGE_KEY,
} from '@/services/storage/saveSchema';
import { calculateStars, coinsForStars } from '@/utils/stars';

/**
 * Centralized persistence layer.
 * All AsyncStorage access for game data goes through this class.
 *
 * Designed so a future backend adapter can replace or sync with local storage
 * without changing gameplay, UI, or engine code.
 */
export class SaveManager {
  constructor() {
    /** @type {import('@/services/storage/saveSchema').SaveData | null} */
    this.cache = null;
    /** @type {boolean} */
    this.isReady = false;
  }

  /**
   * Load save data from device storage.
   * @returns {Promise<import('@/services/storage/saveSchema').SaveData>}
   */
  async load() {
    try {
      const raw = await AsyncStorage.getItem(SAVE_STORAGE_KEY);
      this.cache = normalizeSaveData(raw ? JSON.parse(raw) : null);
    } catch (error) {
      console.warn('[SaveManager] Load failed, using defaults.', error);
      this.cache = { ...DEFAULT_SAVE_DATA };
    }

    this.isReady = true;
    return this.getData();
  }

  /**
   * @returns {import('@/services/storage/saveSchema').SaveData}
   */
  getData() {
    if (!this.cache) {
      return { ...DEFAULT_SAVE_DATA };
    }
    return normalizeSaveData(this.cache);
  }

  /**
   * Persist the full save blob.
   * @param {import('@/services/storage/saveSchema').SaveData} data
   * @returns {Promise<import('@/services/storage/saveSchema').SaveData>}
   */
  async save(data) {
    const normalized = normalizeSaveData(data);
    this.cache = normalized;
    await AsyncStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  /**
   * Merge a partial update and persist.
   * @param {Partial<import('@/services/storage/saveSchema').SaveData>} patch
   * @returns {Promise<import('@/services/storage/saveSchema').SaveData>}
   */
  async update(patch) {
    const merged = normalizeSaveData({ ...this.getData(), ...patch });
    return this.save(merged);
  }

  /**
   * @param {import('@/services/storage/saveSchema').SaveSettings} settings
   */
  async updateSettings(settings) {
    const data = this.getData();
    return this.save({ ...data, settings: { ...data.settings, ...settings } });
  }

  /**
   * @param {number} levelNumber
   * @param {import('@/game/engine/GameEngine').GameSnapshot} snapshot
   */
  async saveLevelInProgress(levelNumber, snapshot) {
    const data = this.getData();
    return this.save({
      ...data,
      currentLevel: levelNumber,
      levelInProgress: { levelNumber, snapshot },
    });
  }

  /** @returns {Promise<import('@/services/storage/saveSchema').SaveData>} */
  async clearLevelInProgress() {
    const data = this.getData();
    return this.save({ ...data, levelInProgress: null });
  }

  /**
   * Record stats after a completed level.
   * @param {number} levelNumber
   * @param {number} moves
   * @param {number} [parMoves=20]
   * @returns {Promise<{
   *   stars: number,
   *   coinsEarned: number,
   *   isNewBest: boolean,
   *   unlockedLevel: number,
   * }>}
   */
  async recordLevelComplete(levelNumber, moves, parMoves = 20) {
    const data = this.getData();
    const starsKey = String(levelNumber);
    const prevBest = data.bestMoves[starsKey];
    const prevStars = data.starsEarned[starsKey] ?? 0;
    const stars = calculateStars(moves, parMoves);
    const coinsEarned = coinsForStars(stars);
    const isNewBest = prevBest === undefined || moves < prevBest;
    const unlockedLevel = Math.max(data.unlockedLevel, levelNumber + 1);

    await this.save({
      ...data,
      unlockedLevel,
      currentLevel: levelNumber,
      levelInProgress: null,
      coins: data.coins + coinsEarned,
      starsEarned: {
        ...data.starsEarned,
        [starsKey]: Math.max(prevStars, stars),
      },
      bestMoves: {
        ...data.bestMoves,
        [starsKey]: isNewBest ? moves : prevBest,
      },
      statistics: {
        ...data.statistics,
        totalMoves: data.statistics.totalMoves + moves,
        levelsCompleted: data.statistics.levelsCompleted + 1,
      },
    });

    return { stars, coinsEarned, isNewBest, unlockedLevel };
  }

  /**
   * @param {number} [count=1]
   */
  async consumeHint(count = 1) {
    const data = this.getData();
    const hintsRemaining = Math.max(0, data.hintsRemaining - count);

    return this.save({
      ...data,
      hintsRemaining,
      statistics: {
        ...data.statistics,
        hintsUsed: data.statistics.hintsUsed + count,
      },
    });
  }

  /**
   * @param {number} [count=1]
   */
  async refundHint(count = 1) {
    const data = this.getData();
    return this.save({
      ...data,
      hintsRemaining: data.hintsRemaining + count,
      statistics: {
        ...data.statistics,
        hintsUsed: Math.max(0, data.statistics.hintsUsed - count),
      },
    });
  }

  /** @returns {Promise<import('@/services/storage/saveSchema').SaveData>} */
  async recordGameStarted() {
    const data = this.getData();
    return this.save({
      ...data,
      statistics: {
        ...data.statistics,
        gamesPlayed: data.statistics.gamesPlayed + 1,
      },
    });
  }

  /** Wipe all progress — useful for development. */
  async resetProgress() {
    return this.save({ ...DEFAULT_SAVE_DATA });
  }
}

export const saveManager = new SaveManager();
