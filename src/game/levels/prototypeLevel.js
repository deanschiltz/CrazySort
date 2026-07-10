/**
 * Stage 1 prototype level.
 * Inspired by classic liquid-sort puzzle mechanics, but original layout.
 * Layers listed top-to-bottom (index 0 = top, pours first).
 *
 * @type {import('@/game/levels/levelTypes').LevelDefinition}
 */
export const prototypeLevel = {
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
};
