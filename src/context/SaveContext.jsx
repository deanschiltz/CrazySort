import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { saveManager } from '@/services/storage/SaveManager';

/** @type {import('react').Context<null | {
 *   saveData: import('@/services/storage/saveSchema').SaveData,
 *   isLoading: boolean,
 *   refresh: () => Promise<void>,
 *   updateSave: (patch: Partial<import('@/services/storage/saveSchema').SaveData>) => Promise<import('@/services/storage/saveSchema').SaveData>,
 *   updateSettings: (settings: Partial<import('@/services/storage/saveSchema').SaveSettings>) => Promise<void>,
 *   saveLevelInProgress: (levelNumber: number, snapshot: import('@/game/engine/GameEngine').GameSnapshot) => Promise<void>,
 *   clearLevelInProgress: () => Promise<void>,
 *   recordLevelComplete: (levelNumber: number, moves: number, parMoves?: number) => Promise<{
 *     stars: number,
 *     coinsEarned: number,
 *     isNewBest: boolean,
 *     unlockedLevel: number,
 *   }>,
 *   consumeHint: () => Promise<boolean>,
 * }>} */
const SaveContext = createContext(null);

/**
 * Provides save data and persistence actions to the app tree.
 * @param {import('react').PropsWithChildren} props
 */
export function SaveProvider({ children }) {
  const [saveData, setSaveData] = useState(() => saveManager.getData());
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await saveManager.load();
    setSaveData(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const updateSave = useCallback(async (patch) => {
    const data = await saveManager.update(patch);
    setSaveData(data);
    return data;
  }, []);

  const updateSettings = useCallback(async (settings) => {
    const data = await saveManager.updateSettings(settings);
    setSaveData(data);
  }, []);

  const saveLevelInProgress = useCallback(async (levelNumber, snapshot) => {
    const data = await saveManager.saveLevelInProgress(levelNumber, snapshot);
    setSaveData(data);
  }, []);

  const clearLevelInProgress = useCallback(async () => {
    const data = await saveManager.clearLevelInProgress();
    setSaveData(data);
  }, []);

  const recordLevelComplete = useCallback(async (levelNumber, moves, parMoves) => {
    const result = await saveManager.recordLevelComplete(levelNumber, moves, parMoves);
    setSaveData(saveManager.getData());
    return result;
  }, []);

  const consumeHint = useCallback(async () => {
    const current = saveManager.getData();
    if (current.hintsRemaining <= 0) {
      return false;
    }
    const data = await saveManager.consumeHint();
    setSaveData(data);
    return true;
  }, []);

  const refundHint = useCallback(async () => {
    const data = await saveManager.refundHint();
    setSaveData(data);
  }, []);

  const recordGameStarted = useCallback(async () => {
    const data = await saveManager.recordGameStarted();
    setSaveData(data);
  }, []);

  const value = useMemo(
    () => ({
      saveData,
      isLoading,
      refresh,
      updateSave,
      updateSettings,
      saveLevelInProgress,
      clearLevelInProgress,
      recordLevelComplete,
      consumeHint,
      refundHint,
      recordGameStarted,
    }),
    [
      saveData,
      isLoading,
      refresh,
      updateSave,
      updateSettings,
      saveLevelInProgress,
      clearLevelInProgress,
      recordLevelComplete,
      consumeHint,
      refundHint,
      recordGameStarted,
    ],
  );

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>;
}

/** @returns {NonNullable<import('react').ContextType<typeof SaveContext>>} */
export function useSave() {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error('useSave must be used within SaveProvider');
  }
  return context;
}
