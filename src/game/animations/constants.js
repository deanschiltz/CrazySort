/** Animation timing constants for CrazySort. */
export const ANIMATION_DURATIONS = {
  pour: 300,
  selection: 220,
  liquid: 300,
  victory: 500,
  button: 150,
  screen: 120,
  modal: 320,
};

export const ANIMATION_SPRING = {
  selection: { damping: 24, stiffness: 120, mass: 0.9 },
  button: { damping: 12, stiffness: 220 },
  victory: { damping: 10, stiffness: 120 },
};
