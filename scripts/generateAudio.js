/**
 * Generates lightweight WAV assets for CrazySort.
 * Run: node scripts/generateAudio.js
 */

const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 22050;
const OUT_DIR = path.join(__dirname, '../src/assets/audio');

function writeWav(filePath, samples) {
  const numSamples = samples.length;
  const buffer = Buffer.alloc(44 + numSamples * 2);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples * 2, 40);

  for (let i = 0; i < numSamples; i += 1) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.floor(clamped * 32767), 44 + i * 2);
  }

  fs.writeFileSync(filePath, buffer);
}

function envelope(index, total, attack = 0.02, release = 0.12) {
  const attackSamples = SAMPLE_RATE * attack;
  const releaseSamples = SAMPLE_RATE * release;
  const fadeIn = Math.min(1, index / attackSamples);
  const fadeOut = Math.min(1, (total - index) / releaseSamples);
  return fadeIn * fadeOut;
}

function tone(frequency, duration, volume = 0.25) {
  const total = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(total);
  for (let i = 0; i < total; i += 1) {
    const t = i / SAMPLE_RATE;
    samples[i] =
      Math.sin(2 * Math.PI * frequency * t) * envelope(i, total) * volume;
  }
  return samples;
}

function noiseBurst(duration, volume = 0.18) {
  const total = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(total);
  for (let i = 0; i < total; i += 1) {
    const t = i / total;
    const freq = 900 - t * 500;
    samples[i] =
      Math.sin(2 * Math.PI * freq * (i / SAMPLE_RATE) + Math.random() * 0.4) *
      envelope(i, total, 0.005, 0.08) *
      volume;
  }
  return samples;
}

function concat(...chunks) {
  return chunks.flat();
}

function silence(duration) {
  return new Array(Math.floor(SAMPLE_RATE * duration)).fill(0);
}

function ambientLoop(duration) {
  const total = Math.floor(SAMPLE_RATE * duration);
  const samples = new Array(total);
  for (let i = 0; i < total; i += 1) {
    const t = i / SAMPLE_RATE;
    const wave =
      Math.sin(2 * Math.PI * 110 * t) * 0.08 +
      Math.sin(2 * Math.PI * 165 * t) * 0.05 +
      Math.sin(2 * Math.PI * 220 * t + Math.sin(t * 0.5)) * 0.04;
    samples[i] = wave * 0.55;
  }
  return samples;
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

writeWav(path.join(OUT_DIR, 'pour.wav'), noiseBurst(0.18, 0.22));
writeWav(path.join(OUT_DIR, 'select.wav'), tone(640, 0.07, 0.2));
writeWav(path.join(OUT_DIR, 'tap.wav'), tone(880, 0.05, 0.18));
writeWav(
  path.join(OUT_DIR, 'victory.wav'),
  concat(
    tone(523, 0.12, 0.22),
    silence(0.02),
    tone(659, 0.12, 0.22),
    silence(0.02),
    tone(784, 0.2, 0.24),
  ),
);
writeWav(path.join(OUT_DIR, 'undo.wav'), tone(420, 0.08, 0.16));
writeWav(path.join(OUT_DIR, 'music.wav'), ambientLoop(8));

console.log(`Wrote audio assets to ${OUT_DIR}`);
