import { deepClone } from '@/utils/clone';
import { createJarsFromLevel, canPour, pour } from '@/game/logic/pourLogic';
import { findHintMove } from '@/game/logic/hintLogic';
import { isLevelComplete } from '@/game/logic/winDetection';
import { Jar } from '@/game/models/Jar';

/**
 * @typedef {Object} GameSnapshot
 * @property {ReturnType<Jar['toJSON']>[]} jars
 * @property {number | null} selectedJarIndex
 * @property {boolean} isComplete
 * @property {number} moveCount
 */

/**
 * @typedef {Object} HintState
 * @property {number | null} sourceIndex
 * @property {number | null} destIndex
 */

/**
 * Core game engine — manages jar state, selection, pouring, undo, and hints.
 * UI layers subscribe to state changes via the listener pattern.
 */
export class GameEngine {
  /**
   * @param {import('@/game/levels/levelTypes').LevelDefinition} level
   * @param {GameSnapshot} [initialSnapshot]
   */
  constructor(level, initialSnapshot) {
    /** @type {import('@/game/levels/levelTypes').LevelDefinition} */
    this.level = level;
    /** @type {Jar[]} */
    this.jars = createJarsFromLevel(level.jars, level.capacity);
    /** @type {number | null} */
    this.selectedJarIndex = null;
    /** @type {boolean} */
    this.isComplete = false;
    /** @type {number} */
    this.moveCount = 0;
    /** @type {GameSnapshot[]} */
    this.history = [];
    /** @type {HintState} */
    this.hintState = { sourceIndex: null, destIndex: null };
    /** @type {Set<(state: GameSnapshot) => void>} */
    this.listeners = new Set();

    if (initialSnapshot) {
      this.restoreSnapshot(initialSnapshot, { silent: true });
    }
  }

  /**
   * @returns {GameSnapshot}
   */
  getSnapshot() {
    return {
      jars: this.jars.map((jar) => jar.toJSON()),
      selectedJarIndex: this.selectedJarIndex,
      isComplete: this.isComplete,
      moveCount: this.moveCount,
    };
  }

  /** @returns {HintState} */
  getHintState() {
    return { ...this.hintState };
  }

  /** @returns {boolean} */
  canUndo() {
    return this.history.length > 0 && !this.isComplete;
  }

  /**
   * @param {(state: GameSnapshot) => void} listener
   * @returns {() => void} Unsubscribe function.
   */
  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getSnapshot());

    return () => {
      this.listeners.delete(listener);
    };
  }

  /** @private */
  notify() {
    const snapshot = this.getSnapshot();
    this.listeners.forEach((listener) => listener(snapshot));
  }

  /** @private */
  clearHint() {
    this.hintState = { sourceIndex: null, destIndex: null };
  }

  /**
   * Handle a player tap on a jar.
   * @param {number} jarIndex
   * @returns {{ action: 'selected' | 'deselected' | 'poured' | 'invalid' | 'ignored', pourAmount?: number }}
   */
  handleJarTap(jarIndex) {
    if (this.isComplete) {
      return { action: 'ignored' };
    }

    if (jarIndex < 0 || jarIndex >= this.jars.length) {
      return { action: 'invalid' };
    }

    this.clearHint();

    if (this.selectedJarIndex === null) {
      if (this.jars[jarIndex].isEmpty()) {
        return { action: 'invalid' };
      }

      this.selectedJarIndex = jarIndex;
      this.notify();
      return { action: 'selected' };
    }

    if (this.selectedJarIndex === jarIndex) {
      this.selectedJarIndex = null;
      this.notify();
      return { action: 'deselected' };
    }

    const sourceJar = this.jars[this.selectedJarIndex];
    const destJar = this.jars[jarIndex];

    if (!canPour(sourceJar, destJar)) {
      if (!destJar.isEmpty()) {
        this.selectedJarIndex = jarIndex;
        this.notify();
        return { action: 'selected' };
      }

      return { action: 'invalid' };
    }

    const sourceIndex = this.selectedJarIndex;
    const beforePour = this.createSnapshot();
    const result = pour(sourceJar, destJar);

    this.history.push(beforePour);
    this.moveCount += 1;
    this.selectedJarIndex = null;
    this.isComplete = isLevelComplete(this.jars);
    this.notify();

    return {
      action: 'poured',
      pourAmount: result.amount,
      color: result.color,
      sourceIndex,
      destIndex: jarIndex,
      beforeSnapshot: beforePour,
    };
  }

  /** Revert the last successful pour. @returns {boolean} */
  undo() {
    if (!this.canUndo()) {
      return false;
    }

    const previous = this.history.pop();
    if (!previous) {
      return false;
    }

    this.restoreSnapshot(previous, { silent: true });
    this.clearHint();
    this.notify();
    return true;
  }

  /**
   * Highlight a valid move. Returns whether a hint was found.
   * Does not consume hint currency — the UI layer handles that.
   * @returns {boolean}
   */
  requestHint() {
    if (this.isComplete) {
      return false;
    }

    const hint = findHintMove(this.jars);
    if (!hint) {
      return false;
    }

    this.hintState = hint;
    this.selectedJarIndex = hint.sourceIndex;
    this.notify();
    return true;
  }

  /** Reset the puzzle to its initial state. */
  reset() {
    this.jars = createJarsFromLevel(this.level.jars, this.level.capacity);
    this.selectedJarIndex = null;
    this.isComplete = false;
    this.moveCount = 0;
    this.history = [];
    this.clearHint();
    this.notify();
  }

  /**
   * @param {import('@/game/levels/levelTypes').LevelDefinition} level
   * @param {GameSnapshot} [initialSnapshot]
   */
  loadLevel(level, initialSnapshot) {
    this.level = level;
    this.jars = createJarsFromLevel(level.jars, level.capacity);
    this.selectedJarIndex = null;
    this.isComplete = false;
    this.moveCount = 0;
    this.history = [];
    this.clearHint();

    if (initialSnapshot) {
      this.restoreSnapshot(initialSnapshot, { silent: true });
    }

    this.notify();
  }

  /**
   * @param {GameSnapshot} snapshot
   * @param {{ silent?: boolean }} [options]
   */
  restoreSnapshot(snapshot, options = {}) {
    this.jars = snapshot.jars.map((jarData) => Jar.fromJSON(jarData));
    this.selectedJarIndex = snapshot.selectedJarIndex;
    this.isComplete = snapshot.isComplete;
    this.moveCount = snapshot.moveCount;

    if (!options.silent) {
      this.notify();
    }
  }

  /**
   * @returns {GameSnapshot}
   */
  createSnapshot() {
    return deepClone(this.getSnapshot());
  }
}
