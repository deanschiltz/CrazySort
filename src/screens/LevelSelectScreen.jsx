import { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { THEME } from '@/constants/colors';
import { useSave } from '@/context/SaveContext';
import { levelManager } from '@/game/managers/LevelManager';
import { ROUTES } from '@/navigation/routes';

export function LevelSelectScreen() {
  const router = useRouter();
  const { saveData } = useSave();
  const totalLevels = levelManager.getTotalLevels();

  const levels = levelManager.getAllLevels().map((definition) => {
    const number = definition.number;
    const unlocked = number <= saveData.unlockedLevel;
    const stars = saveData.starsEarned[String(number)] ?? 0;
    const bestMoves = saveData.bestMoves[String(number)];

    return {
      number,
      name: definition.name,
      difficulty: definition.difficulty,
      unlocked,
      stars,
      bestMoves,
    };
  });

  const totalStars = Object.values(saveData.starsEarned).reduce(
    (sum, value) => sum + value,
    0,
  );

  const handleSelect = useCallback(
    (level) => {
      if (!level.unlocked) {
        return;
      }
      router.push({ pathname: ROUTES.game, params: { level: String(level.number) } });
    },
    [router],
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Level Select</Text>
        <Text style={styles.subtitle}>
          {saveData.unlockedLevel} of {totalLevels} unlocked · {totalStars} stars
        </Text>

        <FlatList
          data={levels}
          keyExtractor={(item) => String(item.number)}
          numColumns={5}
          removeClippedSubviews
          initialNumToRender={25}
          maxToRenderPerBatch={25}
          windowSize={7}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleSelect(item)}
              style={[styles.levelCell, !item.unlocked && styles.levelLocked]}
            >
              <Text
                style={[
                  styles.levelNumber,
                  !item.unlocked && styles.levelNumberLocked,
                ]}
              >
                {item.unlocked ? item.number : '🔒'}
              </Text>
              {item.stars > 0 ? (
                <Text style={styles.stars}>{'★'.repeat(item.stars)}</Text>
              ) : null}
            </Pressable>
          )}
        />

        <AnimatedButton label="Back to Menu" variant="ghost" onPress={() => router.back()} large />
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  back: {
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  backText: {
    color: THEME.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: THEME.text,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: THEME.textMuted,
    fontSize: 14,
    marginBottom: 8,
  },
  grid: {
    paddingBottom: 12,
    gap: 10,
  },
  row: {
    gap: 10,
    justifyContent: 'center',
  },
  levelCell: {
    width: 58,
    height: 64,
    borderRadius: 14,
    backgroundColor: THEME.surface,
    borderWidth: 1,
    borderColor: THEME.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  levelLocked: {
    borderColor: THEME.surfaceLight,
    opacity: 0.55,
  },
  levelNumber: {
    color: THEME.text,
    fontSize: 17,
    fontWeight: '700',
  },
  levelNumberLocked: {
    fontSize: 14,
  },
  stars: {
    color: THEME.warning,
    fontSize: 8,
  },
});
