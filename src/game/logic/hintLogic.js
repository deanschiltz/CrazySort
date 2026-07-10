import { canPour } from '@/game/logic/pourLogic';

/**
 * @typedef {Object} HintMove
 * @property {number} sourceIndex
 * @property {number} destIndex
 */

/**
 * Find the first valid pour between any two jars.
 * @param {import('@/game/models/Jar').Jar[]} jars
 * @returns {HintMove | null}
 */
export function findHintMove(jars) {
  for (let sourceIndex = 0; sourceIndex < jars.length; sourceIndex += 1) {
    if (jars[sourceIndex].isEmpty()) {
      continue;
    }

    for (let destIndex = 0; destIndex < jars.length; destIndex += 1) {
      if (sourceIndex === destIndex) {
        continue;
      }

      if (canPour(jars[sourceIndex], jars[destIndex])) {
        return { sourceIndex, destIndex };
      }
    }
  }

  return null;
}
