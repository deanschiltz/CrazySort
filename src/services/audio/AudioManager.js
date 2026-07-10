import { Audio } from 'expo-av';

/** @type {Record<string, number>} */
const SOUND_FILES = {
  pour: require('@/assets/audio/pour.wav'),
  select: require('@/assets/audio/select.wav'),
  tap: require('@/assets/audio/tap.wav'),
  victory: require('@/assets/audio/victory.wav'),
  undo: require('@/assets/audio/undo.wav'),
  music: require('@/assets/audio/music.wav'),
};

/**
 * Centralized audio playback via Expo AV.
 * Respects sound/music settings from SaveManager.
 */
export class AudioManager {
  constructor() {
    /** @type {boolean} */
    this.soundEnabled = true;
    /** @type {boolean} */
    this.musicEnabled = true;
    /** @type {boolean} */
    this.isReady = false;
    /** @type {Record<string, import('expo-av').Audio.Sound>} */
    this.sounds = {};
    /** @type {import('expo-av').Audio.Sound | null} */
    this.music = null;
    /** @type {Promise<void> | null} */
    this.initPromise = null;
  }

  /**
   * @param {{ soundEnabled?: boolean, musicEnabled?: boolean }} settings
   */
  configure(settings) {
    const prevMusic = this.musicEnabled;
    if (typeof settings.soundEnabled === 'boolean') {
      this.soundEnabled = settings.soundEnabled;
    }
    if (typeof settings.musicEnabled === 'boolean') {
      this.musicEnabled = settings.musicEnabled;
    }

    if (!this.isReady) {
      return;
    }

    if (this.musicEnabled && !prevMusic) {
      this.playMusic();
    } else if (!this.musicEnabled && prevMusic) {
      this.stopMusic();
    }
  }

  /** @returns {Promise<void>} */
  initialize() {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._load();
    return this.initPromise;
  }

  /** @private */
  async _load() {
    if (this.isReady) {
      return;
    }

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        staysActiveInBackground: false,
      });

      const effectKeys = ['pour', 'select', 'tap', 'victory', 'undo'];
      await Promise.all(
        effectKeys.map(async (key) => {
          const { sound } = await Audio.Sound.createAsync(SOUND_FILES[key], {
            shouldPlay: false,
            volume: 0.85,
          });
          this.sounds[key] = sound;
        }),
      );

      const { sound: music } = await Audio.Sound.createAsync(SOUND_FILES.music, {
        isLooping: true,
        volume: 0.28,
        shouldPlay: false,
      });
      this.music = music;
      this.isReady = true;

      if (this.musicEnabled) {
        await this.playMusic();
      }
    } catch (error) {
      console.warn('[AudioManager] Failed to initialize audio.', error);
    }
  }

  /**
   * @param {string} key
   * @private
   */
  async _playEffect(key) {
    if (!this.soundEnabled || !this.isReady) {
      return;
    }

    const sound = this.sounds[key];
    if (!sound) {
      return;
    }

    try {
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.warn(`[AudioManager] Failed to play ${key}.`, error);
    }
  }

  playPour() {
    return this._playEffect('pour');
  }

  playSelect() {
    return this._playEffect('select');
  }

  playTap() {
    return this._playEffect('tap');
  }

  playVictory() {
    return this._playEffect('victory');
  }

  playUndo() {
    return this._playEffect('undo');
  }

  async playMusic() {
    if (!this.musicEnabled || !this.music) {
      return;
    }

    try {
      const status = await this.music.getStatusAsync();
      if (!status.isLoaded) {
        return;
      }
      if (!status.isPlaying) {
        await this.music.playAsync();
      }
    } catch (error) {
      console.warn('[AudioManager] Failed to play music.', error);
    }
  }

  async stopMusic() {
    if (!this.music) {
      return;
    }

    try {
      const status = await this.music.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await this.music.pauseAsync();
      }
    } catch (error) {
      console.warn('[AudioManager] Failed to stop music.', error);
    }
  }

  async unload() {
    await Promise.all(
      Object.values(this.sounds).map((sound) => sound.unloadAsync().catch(() => {})),
    );
    if (this.music) {
      await this.music.unloadAsync().catch(() => {});
    }
    this.sounds = {};
    this.music = null;
    this.isReady = false;
    this.initPromise = null;
  }
}

export const audioManager = new AudioManager();
