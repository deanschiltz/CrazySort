import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { audioManager } from '@/services/audio/AudioManager';
import { useSave } from '@/context/SaveContext';

/** @type {import('react').Context<null | {
 *   playPour: () => void,
 *   playSelect: () => void,
 *   playTap: () => void,
 *   playVictory: () => void,
 *   playUndo: () => void,
 * }>} */
const AudioContext = createContext(null);

/** @param {import('react').PropsWithChildren} props */
export function AudioProvider({ children }) {
  const { saveData, isLoading } = useSave();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    audioManager.initialize();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    audioManager.configure(saveData.settings);
  }, [isLoading, saveData.settings.soundEnabled, saveData.settings.musicEnabled]);

  const playPour = useCallback(() => {
    audioManager.playPour();
  }, []);

  const playSelect = useCallback(() => {
    audioManager.playSelect();
  }, []);

  const playTap = useCallback(() => {
    audioManager.playTap();
  }, []);

  const playVictory = useCallback(() => {
    audioManager.playVictory();
  }, []);

  const playUndo = useCallback(() => {
    audioManager.playUndo();
  }, []);

  const value = useMemo(
    () => ({
      playPour,
      playSelect,
      playTap,
      playVictory,
      playUndo,
    }),
    [playPour, playSelect, playTap, playVictory, playUndo],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

/** @returns {NonNullable<import('react').ContextType<typeof AudioContext>>} */
export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
