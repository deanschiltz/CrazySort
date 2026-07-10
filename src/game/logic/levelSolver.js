import { canPour } from '@/game/logic/pourLogic';
import { isLevelComplete } from '@/game/logic/winDetection';
import { Jar } from '@/game/models/Jar';

/**
 * @param {string[][]} layersByJar
 * @param {number} capacity
 * @returns {Jar[]}
 */
function toJars(layersByJar, capacity) {
  return layersByJar.map((layers) => new Jar(layers, capacity));
}

/**
 * @param {Jar[]} jars
 * @returns {string}
 */
function stateKey(jars) {
  return JSON.stringify(jars.map((jar) => jar.layers));
}

/**
 * Find minimum moves to solve a puzzle via BFS.
 * @param {string[][]} jarLayers
 * @param {number} capacity
 * @param {number} [maxDepth=80]
 * @returns {number | null} Minimum moves, or null if unsolvable within depth.
 */
export function findMinimumMoves(jarLayers, capacity, maxDepth = 80) {
  const startJars = toJars(jarLayers, capacity);

  if (isLevelComplete(startJars)) {
    return 0;
  }

  /** @type {{ jars: Jar[], moves: number }[]} */
  const queue = [{ jars: startJars, moves: 0 }];
  const visited = new Set([stateKey(startJars)]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!current) {
      break;
    }

    if (current.moves >= maxDepth) {
      continue;
    }

    for (let source = 0; source < current.jars.length; source += 1) {
      for (let dest = 0; dest < current.jars.length; dest += 1) {
        if (source === dest) {
          continue;
        }

        const nextJars = current.jars.map((jar) => jar.clone());
        const sourceJar = nextJars[source];
        const destJar = nextJars[dest];

        if (!canPour(sourceJar, destJar)) {
          continue;
        }

        const color = sourceJar.topColor;
        const amount = Math.min(
          sourceJar.getTopRunLength(),
          destJar.availableSpace,
        );

        for (let index = 0; index < amount; index += 1) {
          sourceJar.layers.shift();
          destJar.layers.unshift(color);
        }

        if (isLevelComplete(nextJars)) {
          return current.moves + 1;
        }

        const key = stateKey(nextJars);
        if (visited.has(key)) {
          continue;
        }

        visited.add(key);
        queue.push({ jars: nextJars, moves: current.moves + 1 });
      }
    }
  }

  return null;
}

/**
 * @param {string[][]} jarLayers
 * @param {number} capacity
 * @returns {boolean}
 */
export function isLevelSolvable(jarLayers, capacity) {
  return findMinimumMoves(jarLayers, capacity) !== null;
}
