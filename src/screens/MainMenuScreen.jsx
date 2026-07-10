import { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { APP_NAME, APP_TAGLINE } from '@/constants/app';
import { THEME } from '@/constants/colors';
import { useSave } from '@/context/SaveContext';
import { levelManager } from '@/game/managers/LevelManager';
import { ROUTES } from '@/navigation/routes';

export function MainMenuScreen() {
  const router = useRouter();
  const { saveData, isLoading } = useSave();

  const handlePlay = useCallback(() => {
    const inProgress = saveData.levelInProgress;
    if (inProgress && !inProgress.snapshot.isComplete) {
      router.push({
        pathname: ROUTES.game,
        params: { level: String(inProgress.levelNumber) },
      });
      return;
    }

    const totalLevels = levelManager.getTotalLevels();
    const frontierLevel = Math.min(saveData.unlockedLevel, totalLevels);
    router.push({
      pathname: ROUTES.game,
      params: { level: String(frontierLevel) },
    });
  }, [router, saveData]);

  if (isLoading) {
    return (
      <GradientBackground>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={THEME.primary} />
        </View>
      </GradientBackground>
    );
  }

  const hasResume =
    saveData.levelInProgress !== null && !saveData.levelInProgress.snapshot.isComplete;

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.hero}>
          <Text style={styles.logo}>{APP_NAME}</Text>
          <Text style={styles.tagline}>{APP_TAGLINE}</Text>
          {saveData.coins > 0 ? (
            <View style={styles.coinBadge}>
              <Text style={styles.coinText}>🪙 {saveData.coins}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.menu}>
          <AnimatedButton
            label={hasResume ? 'Resume' : 'Play'}
            onPress={handlePlay}
            large
          />
          <AnimatedButton
            label="Level Select"
            variant="secondary"
            onPress={() => router.push(ROUTES.levels)}
            large
          />
          <AnimatedButton
            label="Settings"
            variant="ghost"
            onPress={() => router.push(ROUTES.settings)}
            large
          />
          <AnimatedButton
            label="Statistics"
            variant="ghost"
            onPress={() => router.push(ROUTES.statistics)}
            large
          />
        </View>

        <Text style={styles.footer}>
          Level {saveData.unlockedLevel} unlocked · {saveData.hintsRemaining} hints
        </Text>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    marginTop: 40,
    gap: 10,
  },
  logo: {
    color: THEME.text,
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tagline: {
    color: THEME.textMuted,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  coinBadge: {
    marginTop: 12,
    backgroundColor: THEME.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
  },
  coinText: {
    color: THEME.warning,
    fontSize: 15,
    fontWeight: '700',
  },
  menu: {
    gap: 14,
    alignItems: 'center',
  },
  footer: {
    color: THEME.textMuted,
    fontSize: 13,
    textAlign: 'center',
  },
});
