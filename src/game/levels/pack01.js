/**
 * CrazySort pack 01 — Levels 1–50.
 * Generated and verified solvable via BFS (see scripts/generateLevels.js).
 * Liquid layers are top-to-bottom (index 0 pours first).
 *
 * @type {import('@/game/levels/levelTypes').LevelDefinition[]}
 */
export const pack01Levels = [
  {
    "id": 0,
    "number": 1,
    "name": "First Pour",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "emerald",
        "sapphire",
        "ruby"
      ],
      [
        "sapphire",
        "ruby",
        "emerald",
        "sapphire"
      ],
      [
        "emerald",
        "sapphire",
        "ruby",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 10
  },
  {
    "id": 1,
    "number": 2,
    "name": "Gentle Mix",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "amber",
        "amber",
        "ruby",
        "amber"
      ],
      [
        "amber",
        "emerald",
        "emerald",
        "emerald"
      ],
      [
        "ruby",
        "ruby",
        "ruby",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 6
  },
  {
    "id": 2,
    "number": 3,
    "name": "Color Wake",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "emerald",
        "amber",
        "emerald"
      ],
      [
        "ruby",
        "amber",
        "emerald",
        "amber"
      ],
      [
        "emerald",
        "ruby",
        "ruby",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 9
  },
  {
    "id": 3,
    "number": 4,
    "name": "Soft Shuffle",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "ruby",
        "emerald",
        "ruby"
      ],
      [
        "emerald",
        "amber",
        "amber",
        "ruby"
      ],
      [
        "emerald",
        "amber",
        "ruby",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 9
  },
  {
    "id": 4,
    "number": 5,
    "name": "Ruby Trail",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "emerald",
        "emerald",
        "amber"
      ],
      [
        "amber",
        "amber",
        "ruby",
        "emerald"
      ],
      [
        "ruby",
        "ruby",
        "amber",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 6
  },
  {
    "id": 5,
    "number": 6,
    "name": "Emerald Turn",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "ruby",
        "amber",
        "ruby"
      ],
      [
        "ruby",
        "amber",
        "emerald",
        "emerald"
      ],
      [
        "ruby",
        "emerald",
        "amber",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 8
  },
  {
    "id": 6,
    "number": 7,
    "name": "Sapphire Drift",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "amber",
        "emerald",
        "ruby"
      ],
      [
        "ruby",
        "emerald",
        "amber",
        "ruby"
      ],
      [
        "emerald",
        "emerald",
        "amber",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 9
  },
  {
    "id": 7,
    "number": 8,
    "name": "Balanced Start",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "amber",
        "emerald",
        "emerald",
        "ruby"
      ],
      [
        "ruby",
        "emerald",
        "emerald",
        "ruby"
      ],
      [
        "amber",
        "ruby",
        "amber",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 8
  },
  {
    "id": 8,
    "number": 9,
    "name": "Tiny Twist",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "amber",
        "emerald",
        "emerald",
        "ruby"
      ],
      [
        "emerald",
        "ruby",
        "ruby",
        "emerald"
      ],
      [
        "amber",
        "ruby",
        "amber",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 8
  },
  {
    "id": 9,
    "number": 10,
    "name": "Calm Currents",
    "difficulty": "tutorial",
    "jarCount": 5,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "amber",
        "amber",
        "ruby"
      ],
      [
        "emerald",
        "amber",
        "emerald",
        "ruby"
      ],
      [
        "ruby",
        "ruby",
        "emerald",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 8
  },
  {
    "id": 10,
    "number": 11,
    "name": "Planning Path",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "sapphire",
        "sapphire",
        "emerald"
      ],
      [
        "sapphire",
        "amber",
        "ruby",
        "amber"
      ],
      [
        "emerald",
        "amber",
        "sapphire",
        "ruby"
      ],
      [
        "amber",
        "ruby",
        "emerald",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 12
  },
  {
    "id": 11,
    "number": 12,
    "name": "Dual Stream",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "amber",
        "emerald",
        "sapphire"
      ],
      [
        "sapphire",
        "emerald",
        "amber",
        "emerald"
      ],
      [
        "sapphire",
        "amber",
        "sapphire",
        "ruby"
      ],
      [
        "ruby",
        "emerald",
        "amber",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 14
  },
  {
    "id": 12,
    "number": 13,
    "name": "Glass Garden",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "ruby",
        "emerald",
        "emerald"
      ],
      [
        "ruby",
        "sapphire",
        "amber",
        "ruby"
      ],
      [
        "amber",
        "amber",
        "sapphire",
        "emerald"
      ],
      [
        "emerald",
        "amber",
        "sapphire",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 12
  },
  {
    "id": 13,
    "number": 14,
    "name": "Quiet Shuffle",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "ruby",
        "emerald",
        "amber"
      ],
      [
        "amber",
        "ruby",
        "emerald",
        "amber"
      ],
      [
        "ruby",
        "sapphire",
        "sapphire",
        "ruby"
      ],
      [
        "sapphire",
        "emerald",
        "sapphire",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 13
  },
  {
    "id": 14,
    "number": 15,
    "name": "Amber Flow",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "amber",
        "ruby",
        "emerald"
      ],
      [
        "amber",
        "ruby",
        "emerald",
        "emerald"
      ],
      [
        "sapphire",
        "emerald",
        "ruby",
        "amber"
      ],
      [
        "amber",
        "sapphire",
        "ruby",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 13
  },
  {
    "id": 15,
    "number": 16,
    "name": "Teal Shift",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "emerald",
        "emerald",
        "amber"
      ],
      [
        "sapphire",
        "ruby",
        "ruby",
        "amber"
      ],
      [
        "sapphire",
        "amber",
        "sapphire",
        "emerald"
      ],
      [
        "ruby",
        "ruby",
        "sapphire",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 10
  },
  {
    "id": 16,
    "number": 17,
    "name": "Coral Pass",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "sapphire",
        "emerald",
        "ruby"
      ],
      [
        "amber",
        "amber",
        "ruby",
        "emerald"
      ],
      [
        "emerald",
        "sapphire",
        "ruby",
        "ruby"
      ],
      [
        "amber",
        "sapphire",
        "sapphire",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 12
  },
  {
    "id": 17,
    "number": 18,
    "name": "Layer Logic",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "emerald",
        "emerald",
        "amber"
      ],
      [
        "amber",
        "sapphire",
        "ruby",
        "ruby"
      ],
      [
        "ruby",
        "sapphire",
        "sapphire",
        "amber"
      ],
      [
        "amber",
        "emerald",
        "ruby",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 11
  },
  {
    "id": 18,
    "number": 19,
    "name": "Mellow Merge",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "amber",
        "amber",
        "emerald",
        "amber"
      ],
      [
        "sapphire",
        "emerald",
        "sapphire",
        "sapphire"
      ],
      [
        "ruby",
        "emerald",
        "amber",
        "emerald"
      ],
      [
        "ruby",
        "ruby",
        "ruby",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 10
  },
  {
    "id": 19,
    "number": 20,
    "name": "Sort Sprint",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "sapphire",
        "emerald",
        "amber"
      ],
      [
        "emerald",
        "emerald",
        "sapphire",
        "emerald"
      ],
      [
        "amber",
        "amber",
        "ruby",
        "ruby"
      ],
      [
        "ruby",
        "amber",
        "ruby",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 9
  },
  {
    "id": 20,
    "number": 21,
    "name": "Jar Juggle",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "ruby",
        "ruby",
        "sapphire"
      ],
      [
        "emerald",
        "amber",
        "amber",
        "amber"
      ],
      [
        "ruby",
        "ruby",
        "amber",
        "emerald"
      ],
      [
        "sapphire",
        "emerald",
        "sapphire",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 9
  },
  {
    "id": 21,
    "number": 22,
    "name": "Violet Hint",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "sapphire",
        "ruby",
        "emerald"
      ],
      [
        "amber",
        "sapphire",
        "sapphire",
        "amber"
      ],
      [
        "amber",
        "ruby",
        "emerald",
        "sapphire"
      ],
      [
        "amber",
        "emerald",
        "emerald",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 11
  },
  {
    "id": 22,
    "number": 23,
    "name": "Citrine Cross",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "amber",
        "emerald",
        "sapphire"
      ],
      [
        "emerald",
        "sapphire",
        "ruby",
        "ruby"
      ],
      [
        "amber",
        "ruby",
        "sapphire",
        "amber"
      ],
      [
        "emerald",
        "amber",
        "sapphire",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 13
  },
  {
    "id": 23,
    "number": 24,
    "name": "Midway Mix",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "ruby",
        "ruby",
        "amber"
      ],
      [
        "amber",
        "sapphire",
        "emerald",
        "sapphire"
      ],
      [
        "sapphire",
        "emerald",
        "ruby",
        "emerald"
      ],
      [
        "emerald",
        "amber",
        "sapphire",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 11
  },
  {
    "id": 24,
    "number": 25,
    "name": "Flow State",
    "difficulty": "easy",
    "jarCount": 6,
    "capacity": 4,
    "jars": [
      [
        "amber",
        "ruby",
        "ruby",
        "emerald"
      ],
      [
        "amber",
        "sapphire",
        "emerald",
        "amber"
      ],
      [
        "emerald",
        "emerald",
        "ruby",
        "ruby"
      ],
      [
        "sapphire",
        "sapphire",
        "amber",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 9
  },
  {
    "id": 25,
    "number": 26,
    "name": "Deep Pour",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "ruby",
        "sapphire",
        "sapphire"
      ],
      [
        "amethyst",
        "emerald",
        "amethyst",
        "amethyst"
      ],
      [
        "amber",
        "emerald",
        "amber",
        "sapphire"
      ],
      [
        "emerald",
        "amber",
        "ruby",
        "sapphire"
      ],
      [
        "emerald",
        "ruby",
        "amethyst",
        "amber"
      ],
      [],
      []
    ],
    "parMoves": 14
  },
  {
    "id": 26,
    "number": 27,
    "name": "Cobalt Chain",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "ruby",
        "amethyst",
        "ruby"
      ],
      [
        "ruby",
        "amethyst",
        "emerald",
        "sapphire"
      ],
      [
        "amber",
        "amber",
        "amethyst",
        "sapphire"
      ],
      [
        "ruby",
        "sapphire",
        "sapphire",
        "amber"
      ],
      [
        "emerald",
        "amethyst",
        "amber",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 15
  },
  {
    "id": 27,
    "number": 28,
    "name": "Prism Path",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "amber",
        "amethyst",
        "sapphire",
        "amber"
      ],
      [
        "sapphire",
        "sapphire",
        "ruby",
        "ruby"
      ],
      [
        "amethyst",
        "ruby",
        "amethyst",
        "amber"
      ],
      [
        "sapphire",
        "emerald",
        "emerald",
        "amber"
      ],
      [
        "ruby",
        "emerald",
        "amethyst",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 14
  },
  {
    "id": 28,
    "number": 29,
    "name": "Stack Story",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "amethyst",
        "sapphire",
        "emerald",
        "amber"
      ],
      [
        "ruby",
        "ruby",
        "amber",
        "emerald"
      ],
      [
        "amethyst",
        "ruby",
        "amber",
        "amethyst"
      ],
      [
        "amethyst",
        "emerald",
        "emerald",
        "amber"
      ],
      [
        "sapphire",
        "ruby",
        "sapphire",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 14
  },
  {
    "id": 29,
    "number": 30,
    "name": "Color Craft",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "amethyst",
        "amethyst",
        "ruby",
        "sapphire"
      ],
      [
        "sapphire",
        "sapphire",
        "emerald",
        "amber"
      ],
      [
        "amber",
        "amber",
        "ruby",
        "amethyst"
      ],
      [
        "emerald",
        "ruby",
        "amber",
        "emerald"
      ],
      [
        "emerald",
        "amethyst",
        "ruby",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 14
  },
  {
    "id": 30,
    "number": 31,
    "name": "Jade Junction",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "emerald",
        "amethyst",
        "ruby"
      ],
      [
        "amethyst",
        "emerald",
        "emerald",
        "amber"
      ],
      [
        "emerald",
        "sapphire",
        "ruby",
        "sapphire"
      ],
      [
        "amber",
        "amethyst",
        "ruby",
        "amber"
      ],
      [
        "ruby",
        "amber",
        "sapphire",
        "amethyst"
      ],
      [],
      []
    ],
    "parMoves": 15
  },
  {
    "id": 31,
    "number": 32,
    "name": "Spectrum Sort",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "amber",
        "emerald",
        "amber"
      ],
      [
        "emerald",
        "amber",
        "emerald",
        "sapphire"
      ],
      [
        "amethyst",
        "ruby",
        "sapphire",
        "sapphire"
      ],
      [
        "emerald",
        "amethyst",
        "ruby",
        "sapphire"
      ],
      [
        "amber",
        "amethyst",
        "ruby",
        "amethyst"
      ],
      [],
      []
    ],
    "parMoves": 16
  },
  {
    "id": 32,
    "number": 33,
    "name": "Tidal Turn",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "amethyst",
        "ruby",
        "emerald",
        "amber"
      ],
      [
        "emerald",
        "sapphire",
        "sapphire",
        "amber"
      ],
      [
        "sapphire",
        "ruby",
        "amethyst",
        "sapphire"
      ],
      [
        "amber",
        "amethyst",
        "ruby",
        "emerald"
      ],
      [
        "amber",
        "amethyst",
        "ruby",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 16
  },
  {
    "id": 33,
    "number": 34,
    "name": "Glass Maze",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "amethyst",
        "ruby",
        "emerald",
        "amber"
      ],
      [
        "sapphire",
        "emerald",
        "ruby",
        "sapphire"
      ],
      [
        "emerald",
        "amber",
        "ruby",
        "amethyst"
      ],
      [
        "amethyst",
        "ruby",
        "emerald",
        "amber"
      ],
      [
        "amethyst",
        "sapphire",
        "amber",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 18
  },
  {
    "id": 34,
    "number": 35,
    "name": "Pour Puzzle",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "sapphire",
        "emerald",
        "emerald"
      ],
      [
        "sapphire",
        "emerald",
        "amber",
        "ruby"
      ],
      [
        "amber",
        "emerald",
        "amethyst",
        "amethyst"
      ],
      [
        "ruby",
        "amber",
        "amethyst",
        "amber"
      ],
      [
        "amethyst",
        "sapphire",
        "ruby",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 12
  },
  {
    "id": 35,
    "number": 36,
    "name": "Chroma Chain",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "amber",
        "sapphire",
        "emerald"
      ],
      [
        "amethyst",
        "emerald",
        "emerald",
        "sapphire"
      ],
      [
        "emerald",
        "ruby",
        "amethyst",
        "amethyst"
      ],
      [
        "ruby",
        "sapphire",
        "amethyst",
        "amber"
      ],
      [
        "amber",
        "amber",
        "ruby",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 13
  },
  {
    "id": 36,
    "number": 37,
    "name": "Liquid Labyrinth",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "amber",
        "amethyst",
        "amethyst"
      ],
      [
        "amethyst",
        "sapphire",
        "amber",
        "sapphire"
      ],
      [
        "emerald",
        "emerald",
        "amber",
        "amethyst"
      ],
      [
        "ruby",
        "ruby",
        "amber",
        "emerald"
      ],
      [
        "ruby",
        "ruby",
        "sapphire",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 12
  },
  {
    "id": 37,
    "number": 38,
    "name": "Sortistry",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "amethyst",
        "emerald",
        "ruby",
        "amethyst"
      ],
      [
        "sapphire",
        "emerald",
        "emerald",
        "ruby"
      ],
      [
        "amber",
        "sapphire",
        "amethyst",
        "ruby"
      ],
      [
        "ruby",
        "amethyst",
        "amber",
        "sapphire"
      ],
      [
        "amber",
        "sapphire",
        "amber",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 16
  },
  {
    "id": 38,
    "number": 39,
    "name": "Vivid Vials",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "amethyst",
        "ruby",
        "amber"
      ],
      [
        "sapphire",
        "amethyst",
        "amber",
        "amethyst"
      ],
      [
        "sapphire",
        "amber",
        "emerald",
        "ruby"
      ],
      [
        "ruby",
        "ruby",
        "amber",
        "sapphire"
      ],
      [
        "emerald",
        "amethyst",
        "sapphire",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 16
  },
  {
    "id": 39,
    "number": 40,
    "name": "Master Mix",
    "difficulty": "medium",
    "jarCount": 7,
    "capacity": 4,
    "jars": [
      [
        "amber",
        "emerald",
        "sapphire",
        "amber"
      ],
      [
        "amber",
        "ruby",
        "ruby",
        "amethyst"
      ],
      [
        "emerald",
        "sapphire",
        "sapphire",
        "amethyst"
      ],
      [
        "amethyst",
        "ruby",
        "emerald",
        "amethyst"
      ],
      [
        "amber",
        "sapphire",
        "ruby",
        "emerald"
      ],
      [],
      []
    ],
    "parMoves": 16
  },
  {
    "id": 40,
    "number": 41,
    "name": "Crazy Cascade",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "coral",
        "ruby",
        "amber",
        "sapphire"
      ],
      [
        "emerald",
        "ruby",
        "amber",
        "sapphire"
      ],
      [
        "sapphire",
        "sapphire",
        "amethyst",
        "emerald"
      ],
      [
        "coral",
        "amethyst",
        "coral",
        "amethyst"
      ],
      [
        "emerald",
        "ruby",
        "amber",
        "ruby"
      ],
      [
        "amber",
        "emerald",
        "coral",
        "amethyst"
      ],
      [],
      []
    ],
    "parMoves": 19
  },
  {
    "id": 41,
    "number": 42,
    "name": "Strategic Pour",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "ruby",
        "emerald",
        "coral",
        "sapphire"
      ],
      [
        "amber",
        "amethyst",
        "coral",
        "coral"
      ],
      [
        "sapphire",
        "amber",
        "coral",
        "ruby"
      ],
      [
        "amber",
        "ruby",
        "emerald",
        "sapphire"
      ],
      [
        "amethyst",
        "amber",
        "ruby",
        "emerald"
      ],
      [
        "amethyst",
        "emerald",
        "sapphire",
        "amethyst"
      ],
      [],
      []
    ],
    "parMoves": 19
  },
  {
    "id": 42,
    "number": 43,
    "name": "Rainbow Riddle",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "ruby",
        "coral",
        "amber"
      ],
      [
        "ruby",
        "sapphire",
        "amber",
        "amber"
      ],
      [
        "emerald",
        "emerald",
        "coral",
        "amethyst"
      ],
      [
        "ruby",
        "coral",
        "ruby",
        "sapphire"
      ],
      [
        "sapphire",
        "amethyst",
        "emerald",
        "sapphire"
      ],
      [
        "amber",
        "amethyst",
        "amethyst",
        "coral"
      ],
      [],
      []
    ],
    "parMoves": 17
  },
  {
    "id": 43,
    "number": 44,
    "name": "Elite Empty",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "amethyst",
        "amethyst",
        "ruby"
      ],
      [
        "amber",
        "amethyst",
        "sapphire",
        "amethyst"
      ],
      [
        "emerald",
        "ruby",
        "sapphire",
        "coral"
      ],
      [
        "coral",
        "sapphire",
        "amber",
        "emerald"
      ],
      [
        "amber",
        "ruby",
        "emerald",
        "coral"
      ],
      [
        "sapphire",
        "ruby",
        "amber",
        "coral"
      ],
      [],
      []
    ],
    "parMoves": 19
  },
  {
    "id": 44,
    "number": 45,
    "name": "Grand Shuffle",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "amethyst",
        "amber",
        "coral"
      ],
      [
        "coral",
        "coral",
        "ruby",
        "emerald"
      ],
      [
        "amethyst",
        "amber",
        "amber",
        "ruby"
      ],
      [
        "coral",
        "emerald",
        "amethyst",
        "amethyst"
      ],
      [
        "ruby",
        "sapphire",
        "emerald",
        "sapphire"
      ],
      [
        "amber",
        "ruby",
        "emerald",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 17
  },
  {
    "id": 45,
    "number": 46,
    "name": "Color Conductor",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "sapphire",
        "ruby",
        "coral",
        "emerald"
      ],
      [
        "sapphire",
        "amethyst",
        "coral",
        "amber"
      ],
      [
        "sapphire",
        "amethyst",
        "amethyst",
        "amethyst"
      ],
      [
        "emerald",
        "emerald",
        "amber",
        "coral"
      ],
      [
        "emerald",
        "ruby",
        "ruby",
        "amber"
      ],
      [
        "amber",
        "sapphire",
        "coral",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 16
  },
  {
    "id": 46,
    "number": 47,
    "name": "Final Flask",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "amethyst",
        "sapphire",
        "ruby"
      ],
      [
        "ruby",
        "amethyst",
        "amethyst",
        "emerald"
      ],
      [
        "ruby",
        "coral",
        "amethyst",
        "sapphire"
      ],
      [
        "emerald",
        "emerald",
        "amber",
        "amber"
      ],
      [
        "coral",
        "coral",
        "amber",
        "ruby"
      ],
      [
        "sapphire",
        "amber",
        "coral",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 17
  },
  {
    "id": 47,
    "number": 48,
    "name": "Brain Blender",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "amethyst",
        "amethyst",
        "sapphire",
        "amethyst"
      ],
      [
        "emerald",
        "emerald",
        "coral",
        "amber"
      ],
      [
        "ruby",
        "sapphire",
        "amber",
        "ruby"
      ],
      [
        "ruby",
        "amber",
        "coral",
        "coral"
      ],
      [
        "emerald",
        "ruby",
        "amethyst",
        "sapphire"
      ],
      [
        "emerald",
        "coral",
        "amber",
        "sapphire"
      ],
      [],
      []
    ],
    "parMoves": 17
  },
  {
    "id": 48,
    "number": 49,
    "name": "Sort Supremacy",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "ruby",
        "sapphire",
        "amber"
      ],
      [
        "ruby",
        "amethyst",
        "coral",
        "amethyst"
      ],
      [
        "ruby",
        "emerald",
        "sapphire",
        "emerald"
      ],
      [
        "amethyst",
        "ruby",
        "amber",
        "amber"
      ],
      [
        "sapphire",
        "coral",
        "sapphire",
        "emerald"
      ],
      [
        "amethyst",
        "amber",
        "coral",
        "coral"
      ],
      [],
      []
    ],
    "parMoves": 19
  },
  {
    "id": 49,
    "number": 50,
    "name": "CrazySort Crown",
    "difficulty": "hard",
    "jarCount": 8,
    "capacity": 4,
    "jars": [
      [
        "emerald",
        "sapphire",
        "ruby",
        "ruby"
      ],
      [
        "sapphire",
        "emerald",
        "amber",
        "coral"
      ],
      [
        "emerald",
        "amethyst",
        "ruby",
        "sapphire"
      ],
      [
        "amber",
        "sapphire",
        "amber",
        "coral"
      ],
      [
        "emerald",
        "amethyst",
        "amethyst",
        "amethyst"
      ],
      [
        "coral",
        "coral",
        "amber",
        "ruby"
      ],
      [],
      []
    ],
    "parMoves": 16
  }
];
