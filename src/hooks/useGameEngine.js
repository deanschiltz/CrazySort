import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ANIMATION_DURATIONS } from '@/game/animations/constants';
import { GameEngine } from '@/game/engine/GameEngine';

/**
 * @typedef {Object} ActivePour
 * @property {number} sourceIndex
 * @property {number} destIndex
 * @property {number} amount
 * @property {string} color
 * @property {import('@/game/engine/GameEngine').GameSnapshot} beforeSnapshot
 */

/**
 * React hook that bridges the GameEngine to component state.
 * @param {import('@/game/levels/levelTypes').LevelDefinition} level
 * @param {import('@/game/engine/GameEngine').GameSnapshot} [initialSnapshot]
 * @param {{
 *   onSelect?: () => void,
 *   onPour?: () => void,
 * }} [feedback]
 */
export function useGameEngine(level, initialSnapshot, feedback) {
  // Capture resume snapshot only when entering a level — not on every autosave
  // or when completion clears levelInProgress (which would otherwise reset the board).
  const bootstrapRef = useRef({ levelNumber: null, snapshot: undefined });

  if (bootstrapRef.current.levelNumber !== level.number) {
    bootstrapRef.current = {
      levelNumber: level.number,
      snapshot: initialSnapshot,
    };
  }

  const engine = useMemo(
    () => new GameEngine(level, bootstrapRef.current.snapshot),
    [level.number, level],
  );
  const [snapshot, setSnapshot] = useState(() => engine.getSnapshot());
  const [hintState, setHintState] = useState(() => engine.getHintState());
  const [canUndo, setCanUndo] = useState(() => engine.canUndo());
  const [activePour, setActivePour] = useState(
    /** @type {ActivePour | null} */ (null),
  );
  const pourProgress = useSharedValue(0);
  const isPouringRef = useRef(false);
  const feedbackRef = useRef(feedback);
  feedbackRef.current = feedback;

  const clearPour = useCallback(() => {
    isPouringRef.current = false;
    setActivePour(null);
  }, []);

  useEffect(() => {
    setSnapshot(engine.getSnapshot());
    setHintState(engine.getHintState());
    setCanUndo(engine.canUndo());

    return engine.subscribe((nextSnapshot) => {
      setSnapshot(nextSnapshot);
      setHintState(engine.getHintState());
      setCanUndo(engine.canUndo());
    });
  }, [engine]);

  const handleJarTap = useCallback(
    (jarIndex) => {
      if (isPouringRef.current) {
        return { action: 'ignored' };
      }

      const result = engine.handleJarTap(jarIndex);

      if (result.action === 'selected') {
        feedbackRef.current?.onSelect?.();
      }

      if (result.action === 'poured' && result.beforeSnapshot) {
        feedbackRef.current?.onPour?.();
        isPouringRef.current = true;
        setActivePour({
          sourceIndex: result.sourceIndex,
          destIndex: result.destIndex,
          amount: result.pourAmount,
          color: result.color,
          beforeSnapshot: result.beforeSnapshot,
        });

        pourProgress.value = 0;
        pourProgress.value = withTiming(
          1,
          {
            duration: ANIMATION_DURATIONS.pour,
            easing: Easing.out(Easing.quad),
          },
          (finished) => {
            if (finished) {
              runOnJS(clearPour)();
            }
          },
        );
      }

      return result;
    },
    [engine, pourProgress, clearPour],
  );

  const undo = useCallback(() => {
    if (isPouringRef.current) {
      return false;
    }
    return engine.undo();
  }, [engine]);

  const reset = useCallback(() => {
    isPouringRef.current = false;
    setActivePour(null);
    pourProgress.value = 0;
    engine.reset();
  }, [engine, pourProgress]);

  const requestHint = useCallback(() => engine.requestHint(), [engine]);

  return {
    snapshot,
    hintState,
    canUndo,
    activePour,
    pourProgress,
    isPouring: activePour !== null,
    handleJarTap,
    undo,
    reset,
    requestHint,
    engine,
  };
}
