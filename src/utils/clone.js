/**
 * Deep-clone a value using JSON serialization.
 * Suitable for plain game state objects and arrays.
 * @template T
 * @param {T} value
 * @returns {T}
 */
export function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}
