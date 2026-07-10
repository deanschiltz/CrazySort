import { Jar } from '@/game/models/Jar';

/**
 * @typedef {Object} PourResult
 * @property {boolean} success
 * @property {number} amount Poured layer count when successful.
 * @property {string | null} color Poured color key when successful.
 * @property {string | null} reason Failure reason when unsuccessful.
 */

/**
 * Determine whether liquid can pour from source to destination.
 * @param {Jar} sourceJar
 * @param {Jar} destJar
 * @returns {boolean}
 */
export function canPour(sourceJar, destJar) {
  if (sourceJar.isEmpty()) {
    return false;
  }

  if (destJar.isFull()) {
    return false;
  }

  if (destJar.isEmpty()) {
    return true;
  }

  return sourceJar.topColor === destJar.topColor;
}

/**
 * Calculate how many layers would pour between two jars.
 * @param {Jar} sourceJar
 * @param {Jar} destJar
 * @returns {number}
 */
export function getPourAmount(sourceJar, destJar) {
  if (!canPour(sourceJar, destJar)) {
    return 0;
  }

  return Math.min(sourceJar.getTopRunLength(), destJar.availableSpace);
}

/**
 * Execute a pour between two jars (mutates both jars).
 * @param {Jar} sourceJar
 * @param {Jar} destJar
 * @returns {PourResult}
 */
export function pour(sourceJar, destJar) {
  if (!canPour(sourceJar, destJar)) {
    let reason = 'invalid_move';

    if (sourceJar.isEmpty()) {
      reason = 'source_empty';
    } else if (destJar.isFull()) {
      reason = 'destination_full';
    } else if (destJar.topColor !== sourceJar.topColor) {
      reason = 'color_mismatch';
    }

    return {
      success: false,
      amount: 0,
      color: null,
      reason,
    };
  }

  const amount = getPourAmount(sourceJar, destJar);
  const color = sourceJar.topColor;

  for (let index = 0; index < amount; index += 1) {
    sourceJar.layers.shift();
    destJar.layers.unshift(color);
  }

  return {
    success: true,
    amount,
    color,
    reason: null,
  };
}

/**
 * Create jar instances from level data.
 * @param {string[][]} jarLayers
 * @param {number} [capacity]
 * @returns {Jar[]}
 */
export function createJarsFromLevel(jarLayers, capacity) {
  return jarLayers.map((layers) => new Jar(layers, capacity));
}
