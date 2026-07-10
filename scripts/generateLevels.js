/**
 * Generates the 50-level pack for CrazySort.
 * Run: node scripts/generateLevels.js
 *
 * Levels are built by randomly distributing shuffled liquids into jars,
 * then verified solvable via BFS. Level 1 uses the handcrafted tutorial layout.
 */

const fs = require('fs');
const path = require('path');

const LIQUID_COLOR_KEYS = [
  'ruby',
  'amber',
  'emerald',
  'sapphire',
  'amethyst',
  'coral',
  'citrine',
  'teal',
];

const LEVEL_NAMES = [
  'First Pour',
  'Gentle Mix',
  'Color Wake',
  'Soft Shuffle',
  'Ruby Trail',
  'Emerald Turn',
  'Sapphire Drift',
  'Balanced Start',
  'Tiny Twist',
  'Calm Currents',
  'Planning Path',
  'Dual Stream',
  'Glass Garden',
  'Quiet Shuffle',
  'Amber Flow',
  'Teal Shift',
  'Coral Pass',
  'Layer Logic',
  'Mellow Merge',
  'Sort Sprint',
  'Jar Juggle',
  'Violet Hint',
  'Citrine Cross',
  'Midway Mix',
  'Flow State',
  'Deep Pour',
  'Cobalt Chain',
  'Prism Path',
  'Stack Story',
  'Color Craft',
  'Jade Junction',
  'Spectrum Sort',
  'Tidal Turn',
  'Glass Maze',
  'Pour Puzzle',
  'Chroma Chain',
  'Liquid Labyrinth',
  'Sortistry',
  'Vivid Vials',
  'Master Mix',
  'Crazy Cascade',
  'Strategic Pour',
  'Rainbow Riddle',
  'Elite Empty',
  'Grand Shuffle',
  'Color Conductor',
  'Final Flask',
  'Brain Blender',
  'Sort Supremacy',
  'CrazySort Crown',
];

/** Mulberry32 seeded PRNG */
function createRng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class Jar {
  constructor(layers = [], capacity = 4) {
    this.layers = [...layers];
    this.capacity = capacity;
  }

  clone() {
    return new Jar(this.layers, this.capacity);
  }

  isEmpty() {
    return this.layers.length === 0;
  }

  get availableSpace() {
    return this.capacity - this.layers.length;
  }

  get topColor() {
    return this.isEmpty() ? null : this.layers[0];
  }

  getTopRunLength() {
    if (this.isEmpty()) return 0;
    const top = this.topColor;
    let count = 0;
    for (let i = 0; i < this.layers.length; i += 1) {
      if (this.layers[i] !== top) break;
      count += 1;
    }
    return count;
  }

  isSolved() {
    if (this.isEmpty()) return true;
    if (this.layers.length < this.capacity) return false;
    return this.layers.every((layer) => layer === this.layers[0]);
  }
}

function canPour(source, dest) {
  if (source.isEmpty() || dest.availableSpace === 0) return false;
  if (dest.isEmpty()) return true;
  return source.topColor === dest.topColor;
}

function pour(source, dest) {
  const amount = Math.min(source.getTopRunLength(), dest.availableSpace);
  const color = source.topColor;
  for (let i = 0; i < amount; i += 1) {
    source.layers.shift();
    dest.layers.unshift(color);
  }
}

function isComplete(jars) {
  return jars.every((jar) => jar.isSolved());
}

function stateKey(jars) {
  return JSON.stringify(jars.map((j) => j.layers));
}

function findMinimumMoves(jarLayers, capacity, maxDepth = 80) {
  const start = jarLayers.map((l) => new Jar(l, capacity));
  if (isComplete(start)) return 0;

  const queue = [{ jars: start, moves: 0 }];
  const visited = new Set([stateKey(start)]);

  while (queue.length) {
    const current = queue.shift();
    if (current.moves >= maxDepth) continue;

    for (let s = 0; s < current.jars.length; s += 1) {
      for (let d = 0; d < current.jars.length; d += 1) {
        if (s === d) continue;
        const next = current.jars.map((j) => j.clone());
        if (!canPour(next[s], next[d])) continue;
        pour(next[s], next[d]);
        if (isComplete(next)) return current.moves + 1;
        const key = stateKey(next);
        if (visited.has(key)) continue;
        visited.add(key);
        queue.push({ jars: next, moves: current.moves + 1 });
      }
    }
  }
  return null;
}

function getDifficulty(number) {
  if (number <= 10) return 'tutorial';
  if (number <= 25) return 'easy';
  if (number <= 40) return 'medium';
  return 'hard';
}

function shuffleArray(array, rng) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function isSolvedState(jarLayers, capacity) {
  return jarLayers.every((layers) => {
    if (layers.length === 0) {
      return true;
    }
    if (layers.length < capacity) {
      return false;
    }
    return layers.every((color) => color === layers[0]);
  });
}

/** At least one jar must contain mixed colors — not a pre-sorted puzzle. */
function isScrambled(jarLayers) {
  return jarLayers.some((layers) => {
    if (layers.length <= 1) {
      return false;
    }
    const unique = new Set(layers);
    return unique.size > 1;
  });
}

function distributeShuffledLiquids(shuffled, colorCount, capacity, emptyCount) {
  const jarCount = colorCount + emptyCount;
  const jars = Array.from({ length: jarCount }, () => []);
  let index = 0;

  for (let jarIndex = 0; jarIndex < colorCount; jarIndex += 1) {
    const layers = [];
    for (let layer = 0; layer < capacity; layer += 1) {
      layers.push(shuffled[index]);
      index += 1;
    }
    // index 0 = top (pours first)
    jars[jarIndex] = layers.reverse();
  }

  return jars;
}

function getConfig(number) {
  if (number <= 10) {
    return { colors: 3, capacity: 4, empty: 2 };
  }
  if (number <= 25) {
    return { colors: 4, capacity: 4, empty: 2 };
  }
  if (number <= 40) {
    return { colors: 5, capacity: 4, empty: 2 };
  }
  return { colors: 6, capacity: 4, empty: 2 };
}

function generateLevel(number, rng) {
  const config = getConfig(number);
  const colorKeys = LIQUID_COLOR_KEYS.slice(0, config.colors);
  const pool = [];

  for (const color of colorKeys) {
    for (let i = 0; i < config.capacity; i += 1) {
      pool.push(color);
    }
  }

  for (let attempt = 0; attempt < 400; attempt += 1) {
    const attemptRng = createRng(number * 9973 + attempt * 17);
    const shuffled = shuffleArray(pool, attemptRng);
    const jars = distributeShuffledLiquids(
      shuffled,
      config.colors,
      config.capacity,
      config.empty,
    );

    if (!isScrambled(jars) || isSolvedState(jars, config.capacity)) {
      continue;
    }

    const parMoves = findMinimumMoves(jars, config.capacity, 80);
    if (parMoves === null || parMoves < 2) {
      continue;
    }

    return {
      id: number - 1,
      number,
      name: LEVEL_NAMES[number - 1],
      difficulty: getDifficulty(number),
      jarCount: jars.length,
      capacity: config.capacity,
      jars,
      parMoves,
    };
  }

  return null;
}

const LEVEL_1 = {
  id: 0,
  number: 1,
  name: 'First Pour',
  difficulty: 'tutorial',
  jarCount: 5,
  capacity: 4,
  jars: [
    ['ruby', 'emerald', 'sapphire', 'ruby'],
    ['sapphire', 'ruby', 'emerald', 'sapphire'],
    ['emerald', 'sapphire', 'ruby', 'emerald'],
    [],
    [],
  ],
  parMoves: findMinimumMoves(
    [
      ['ruby', 'emerald', 'sapphire', 'ruby'],
      ['sapphire', 'ruby', 'emerald', 'sapphire'],
      ['emerald', 'sapphire', 'ruby', 'emerald'],
      [],
      [],
    ],
    4,
  ),
};

const levels = [LEVEL_1];

for (let number = 2; number <= 50; number += 1) {
  let level = null;
  let attempts = 0;
  while (!level && attempts < 200) {
    level = generateLevel(number, createRng(number * 9973 + attempts));
    attempts += 1;
  }
  if (!level) {
    throw new Error(`Failed to generate solvable level ${number}`);
  }
  levels.push(level);
}

const output = `/**
 * CrazySort pack 01 — Levels 1–50.
 * Generated and verified solvable via BFS (see scripts/generateLevels.js).
 * Liquid layers are top-to-bottom (index 0 pours first).
 *
 * @type {import('@/game/levels/levelTypes').LevelDefinition[]}
 */
export const pack01Levels = ${JSON.stringify(levels, null, 2)};
`;

const outPath = path.join(__dirname, '../src/game/levels/pack01.js');
fs.writeFileSync(outPath, output);
console.log(`Wrote ${levels.length} levels to ${outPath}`);
