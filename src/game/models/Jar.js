import { DEFAULT_JAR_CAPACITY } from '@/constants/game';

/**
 * Represents a glass jar containing stacked liquid layers.
 * Layers use LIFO ordering — index 0 is the top (pours first).
 */
export class Jar {
  /**
   * @param {string[]} [layers] Liquid color keys top-to-bottom (index 0 = top).
   * @param {number} [capacity] Maximum layers the jar can hold.
   */
  constructor(layers = [], capacity = DEFAULT_JAR_CAPACITY) {
    /** @type {string[]} */
    this.layers = [...layers];
    /** @type {number} */
    this.capacity = capacity;
  }

  /** @returns {boolean} */
  isEmpty() {
    return this.layers.length === 0;
  }

  /** @returns {boolean} */
  isFull() {
    return this.layers.length >= this.capacity;
  }

  /** @returns {number} */
  get fillLevel() {
    return this.layers.length;
  }

  /** @returns {number} */
  get availableSpace() {
    return this.capacity - this.layers.length;
  }

  /** @returns {string | null} Top liquid color key, or null if empty. */
  get topColor() {
    if (this.isEmpty()) {
      return null;
    }
    return this.layers[0];
  }

  /**
   * Count consecutive same-color layers from the top (LIFO head).
   * @returns {number}
   */
  getTopRunLength() {
    if (this.isEmpty()) {
      return 0;
    }

    const topColor = this.topColor;
    let count = 0;

    for (let index = 0; index < this.layers.length; index += 1) {
      if (this.layers[index] !== topColor) {
        break;
      }
      count += 1;
    }

    return count;
  }

  /**
   * Whether every layer in a non-empty jar shares the same color.
   * @returns {boolean}
   */
  isUniform() {
    if (this.isEmpty()) {
      return true;
    }

    const firstColor = this.layers[0];
    return this.layers.every((layer) => layer === firstColor);
  }

  /**
   * Whether the jar is solved: empty or full with a single color.
   * @returns {boolean}
   */
  isSolved() {
    if (this.isEmpty()) {
      return true;
    }

    return this.isFull() && this.isUniform();
  }

  /** @returns {Jar} */
  clone() {
    return new Jar(this.layers, this.capacity);
  }

  /**
   * Serialize jar state for snapshots and persistence.
   * @returns {{ layers: string[], capacity: number }}
   */
  toJSON() {
    return {
      layers: [...this.layers],
      capacity: this.capacity,
    };
  }

  /**
   * @param {{ layers: string[], capacity?: number }} data
   * @returns {Jar}
   */
  static fromJSON(data) {
    return new Jar(data.layers, data.capacity ?? DEFAULT_JAR_CAPACITY);
  }
}
