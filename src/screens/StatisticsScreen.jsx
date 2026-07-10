import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { THEME } from '@/constants/colors';
import { useSave } from '@/context/SaveContext';
import { levelManager } from '@/game/managers/LevelManager';

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string | number} props.value
 */
function StatRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function StatisticsScreen() {
  const router = useRouter();
  const { saveData } = useSave();
  const { statistics } = saveData;
  const totalLevels = levelManager.getTotalLevels();

  const totalStars = useMemo(
    () => Object.values(saveData.starsEarned).reduce((sum, value) => sum + value, 0),
    [saveData.starsEarned],
  );

  const maxStars = totalLevels * 3;
  const levelsWithStars = Object.keys(saveData.starsEarned).length;
  const averageMoves =
    statistics.levelsCompleted > 0
      ? Math.round(statistics.totalMoves / statistics.levelsCompleted)
      : 0;
  const threeStarCount = Object.values(saveData.starsEarned).filter(
    (stars) => stars === 3,
  ).length;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.subtitle}>Your CrazySort journey so far</Text>

        <View style={styles.card}>
          <StatRow label="Levels Unlocked" value={`${saveData.unlockedLevel} / ${totalLevels}`} />
          <StatRow label="Levels Completed" value={statistics.levelsCompleted} />
          <StatRow label="Total Stars" value={`${totalStars} / ${maxStars}`} />
          <StatRow label="Perfect (3★) Levels" value={threeStarCount} />
          <StatRow label="Average Moves" value={averageMoves || '—'} />
          <StatRow label="Total Moves" value={statistics.totalMoves} />
          <StatRow label="Games Played" value={statistics.gamesPlayed} />
          <StatRow label="Hints Used" value={statistics.hintsUsed} />
          <StatRow label="Coins" value={saveData.coins} />
          <StatRow label="Hints Remaining" value={saveData.hintsRemaining} />
        </View>

        {levelsWithStars > 0 ? (
          <Text style={styles.footnote}>
            {levelsWithStars} level{levelsWithStars === 1 ? '' : 's'} rated so far
          </Text>
        ) : null}

        <AnimatedButton label="Back to Menu" variant="ghost" onPress={() => router.back()} large />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  title: {
    color: THEME.text,
    fontSize: 32,
    fontWeight: '700',
  },
  subtitle: {
    color: THEME.textMuted,
    fontSize: 15,
    marginBottom: 8,
  },
  card: {
    backgroundColor: THEME.surface,
    borderRadius: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  rowLabel: {
    color: THEME.textMuted,
    fontSize: 15,
  },
  rowValue: {
    color: THEME.text,
    fontSize: 16,
    fontWeight: '700',
  },
  footnote: {
    color: THEME.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
});
