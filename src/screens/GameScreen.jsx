import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameBoard } from '@/components/GameBoard';
import { GameHeader, GameToolbar } from '@/components/game/GameToolbar';
import { PauseModal, VictoryOverlay } from '@/components/game/GameModals';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { useAudio } from '@/context/AudioContext';
import { useSave } from '@/context/SaveContext';
import { useGameEngine } from '@/hooks/useGameEngine';
import { levelManager } from '@/game/managers/LevelManager';
import { navigateHomeInstant } from '@/navigation/navigateHome';
import { ROUTES } from '@/navigation/routes';
import { calculateStars, coinsForStars } from '@/utils/stars';
import { triggerHaptic } from '@/utils/haptics';

export function GameScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const {
    saveData,
    saveLevelInProgress,
    clearLevelInProgress,
    recordLevelComplete,
    consumeHint,
    refundHint,
    recordGameStarted,
  } = useSave();
  const { playPour, playSelect, playVictory, playUndo } = useAudio();

  const levelNumber = Number(params.level) || saveData.currentLevel || 1;
  const level = levelManager.getLevel(levelNumber) ?? levelManager.getLevel(1);

  const savedSnapshot = useMemo(() => {
    if (
      saveData.levelInProgress &&
      saveData.levelInProgress.levelNumber === level.number
    ) {
      return saveData.levelInProgress.snapshot;
    }
    return undefined;
  }, [saveData.levelInProgress, level.number]);

  const gameFeedback = useMemo(
    () => ({
      onSelect: () => {
        playSelect();
        triggerHaptic('light');
      },
      onPour: () => {
        playPour();
        triggerHaptic('medium');
      },
    }),
    [playPour, playSelect],
  );

  const {
    snapshot,
    hintState,
    canUndo,
    activePour,
    pourProgress,
    handleJarTap,
    undo,
    reset,
    requestHint,
  } = useGameEngine(level, savedSnapshot, gameFeedback);

  const [isPaused, setIsPaused] = useState(false);
  const [victoryResult, setVictoryResult] = useState(null);
  const hasRecordedVictory = useRef(false);
  const hasRecordedStart = useRef(false);

  useEffect(() => {
    hasRecordedVictory.current = false;
    hasRecordedStart.current = false;
    setVictoryResult(null);
  }, [level.number]);

  const jarSize = useMemo(() => {
    const columns = Math.min(level.jarCount, 5);
    const horizontalPadding = 48;
    const gaps = (columns - 1) * 16;
    const available = width - horizontalPadding - gaps;
    return Math.min(72, Math.floor(available / columns));
  }, [level.jarCount, width]);

  useEffect(() => {
    if (snapshot.isComplete) {
      return;
    }

    const timeout = setTimeout(() => {
      saveLevelInProgress(level.number, snapshot);
    }, 400);

    return () => clearTimeout(timeout);
  }, [snapshot, level.number, saveLevelInProgress]);

  useEffect(() => {
    if (!snapshot.isComplete || hasRecordedVictory.current) {
      return;
    }

    hasRecordedVictory.current = true;
    playVictory();
    triggerHaptic('success');
    recordLevelComplete(level.number, snapshot.moveCount, level.parMoves).then(
      setVictoryResult,
    );
  }, [
    snapshot.isComplete,
    snapshot.moveCount,
    level.number,
    level.parMoves,
    recordLevelComplete,
    playVictory,
  ]);

  useEffect(() => {
    if (hasRecordedStart.current) {
      return;
    }
    hasRecordedStart.current = true;
    recordGameStarted();
  }, [recordGameStarted]);

  const handleUndo = useCallback(() => {
    const didUndo = undo();
    if (didUndo) {
      playUndo();
      triggerHaptic('light');
    }
  }, [undo, playUndo]);

  const handleHint = useCallback(async () => {
    const consumed = await consumeHint();
    if (!consumed) {
      Alert.alert('No Hints', 'You have no hints remaining.');
      return;
    }

    const found = requestHint();
    if (!found) {
      await refundHint();
      Alert.alert('No Moves', 'No valid pours available right now.');
    }
  }, [consumeHint, refundHint, requestHint]);

  const handleRestart = useCallback(() => {
    reset();
    clearLevelInProgress();
    hasRecordedVictory.current = false;
    setVictoryResult(null);
  }, [reset, clearLevelInProgress]);

  const handleMainMenu = useCallback(() => {
    navigateHomeInstant(navigation);
  }, [navigation]);

  const nextLevel = levelManager.getNextLevel(level.number);
  const hasNextLevel = Boolean(nextLevel);

  const handleContinue = useCallback(() => {
    clearLevelInProgress();

    if (nextLevel) {
      router.replace({
        pathname: ROUTES.game,
        params: { level: String(nextLevel.number) },
      });
      return;
    }

    navigateHomeInstant(navigation);
  }, [clearLevelInProgress, nextLevel, router, navigation]);

  const handleLevelSelect = useCallback(() => {
    clearLevelInProgress();
    router.push(ROUTES.levels);
  }, [clearLevelInProgress, router]);

  const handleVictoryMainMenu = useCallback(() => {
    clearLevelInProgress();
    navigateHomeInstant(navigation);
  }, [clearLevelInProgress, navigation]);

  const victoryStars =
    victoryResult?.stars ??
    calculateStars(snapshot.moveCount, level.parMoves ?? 20);
  const victoryCoins =
    victoryResult?.coinsEarned ?? coinsForStars(victoryStars);

  if (!level) {
    return null;
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <GameHeader
          levelLabel={`${level.number}`}
          levelName={level.name}
          moveCount={snapshot.moveCount}
          onPause={() => setIsPaused(true)}
        />

        <View style={styles.boardContainer}>
          <GameBoard
            jars={snapshot.jars}
            selectedJarIndex={snapshot.selectedJarIndex}
            hintState={hintState}
            activePour={activePour}
            pourProgress={pourProgress}
            onJarPress={handleJarTap}
            jarSize={jarSize}
          />
        </View>

        <GameToolbar
          canUndo={canUndo}
          hintsRemaining={saveData.hintsRemaining}
          onUndo={handleUndo}
          onRestart={handleRestart}
          onHint={handleHint}
        />
      </SafeAreaView>

      <PauseModal
        visible={isPaused}
        onResume={() => setIsPaused(false)}
        onRestart={() => {
          setIsPaused(false);
          handleRestart();
        }}
        onMainMenu={handleMainMenu}
      />

      <VictoryOverlay
        visible={snapshot.isComplete}
        levelName={level.name}
        moves={snapshot.moveCount}
        parMoves={level.parMoves ?? 20}
        stars={victoryStars}
        coinsEarned={victoryCoins}
        isNewBest={victoryResult?.isNewBest ?? false}
        hasNextLevel={hasNextLevel}
        onContinue={handleContinue}
        onReplay={handleRestart}
        onLevelSelect={handleLevelSelect}
        onMainMenu={handleVictoryMainMenu}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
