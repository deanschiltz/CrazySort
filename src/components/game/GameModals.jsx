import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { ConfettiBurst } from '@/components/game/ConfettiBurst';
import { THEME } from '@/constants/colors';

/**
 * In-screen pause overlay (not RN Modal — avoids dismiss flash on navigate).
 * @param {Object} props
 * @param {boolean} props.visible
 * @param {() => void} props.onResume
 * @param {() => void} props.onRestart
 * @param {() => void} props.onMainMenu
 */
export function PauseModal({ visible, onResume, onRestart, onMainMenu }) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onResume} />
      <View style={styles.card}>
        <Text style={styles.title}>Paused</Text>
        <Text style={styles.subtitle}>Take a breather — the jars will wait.</Text>
        <View style={styles.actions}>
          <AnimatedButton label="Resume" onPress={onResume} large />
          <AnimatedButton
            label="Restart"
            variant="ghost"
            onPress={onRestart}
            large
          />
          <AnimatedButton
            label="Main Menu"
            variant="ghost"
            onPress={onMainMenu}
            large
          />
        </View>
      </View>
    </View>
  );
}

/**
 * @param {Object} props
 * @param {boolean} props.visible
 * @param {string} props.levelName
 * @param {number} props.moves
 * @param {number} props.parMoves
 * @param {number} props.stars
 * @param {number} props.coinsEarned
 * @param {boolean} props.isNewBest
 * @param {boolean} props.hasNextLevel
 * @param {() => void} props.onContinue
 * @param {() => void} props.onReplay
 * @param {() => void} [props.onLevelSelect]
 * @param {() => void} [props.onMainMenu]
 */
export function VictoryOverlay({
  visible,
  levelName,
  moves,
  parMoves,
  stars,
  coinsEarned,
  isNewBest,
  hasNextLevel,
  onContinue,
  onReplay,
  onLevelSelect,
  onMainMenu,
}) {
  if (!visible) {
    return null;
  }

  const starDisplay = [1, 2, 3].map((value) => (
    <Animated.Text
      key={value}
      entering={ZoomIn.delay(200 + value * 120).springify().damping(14)}
      style={[styles.star, value <= stars ? styles.starFilled : styles.starEmpty]}
    >
      ★
    </Animated.Text>
  ));

  return (
    <Animated.View entering={FadeIn.duration(220)} style={styles.overlay}>
      <ConfettiBurst active={visible} />
      <Animated.View entering={FadeInDown.duration(360).springify()} style={styles.victoryCard}>
        <Animated.Text entering={ZoomIn.delay(80).springify()} style={styles.victoryEmoji}>
          ✨
        </Animated.Text>
        <Text style={styles.victoryTitle}>Level Complete!</Text>
        <Text style={styles.victoryLevelName}>{levelName}</Text>
        <View style={styles.starRow}>{starDisplay}</View>
        <Text style={styles.victoryText}>
          {moves} moves · par {parMoves}
        </Text>
        {isNewBest ? <Text style={styles.newBest}>New best!</Text> : null}
        <View style={styles.rewardRow}>
          <Text style={styles.rewardLabel}>Coins earned</Text>
          <Text style={styles.rewardValue}>+{coinsEarned}</Text>
        </View>
        <View style={styles.victoryActions}>
          <AnimatedButton
            label={hasNextLevel ? 'Next Level' : 'Continue'}
            onPress={onContinue}
            large
          />
          <AnimatedButton label="Replay" variant="ghost" onPress={onReplay} large />
          {onLevelSelect ? (
            <AnimatedButton
              label="Level Select"
              variant="ghost"
              onPress={onLevelSelect}
              large
            />
          ) : null}
          {onMainMenu ? (
            <AnimatedButton
              label="Main Menu"
              variant="ghost"
              onPress={onMainMenu}
              large
            />
          ) : null}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 27, 46, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 50,
  },
  card: {
    backgroundColor: THEME.surface,
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
    gap: 12,
    width: '100%',
    maxWidth: 320,
  },
  title: {
    color: THEME.text,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: THEME.textMuted,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  actions: {
    gap: 10,
    alignItems: 'center',
  },
  victoryCard: {
    backgroundColor: THEME.surface,
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    gap: 10,
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
    zIndex: 2,
  },
  victoryEmoji: {
    fontSize: 44,
  },
  victoryTitle: {
    color: THEME.text,
    fontSize: 24,
    fontWeight: '700',
  },
  victoryLevelName: {
    color: THEME.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  starRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4,
  },
  star: {
    fontSize: 32,
  },
  starFilled: {
    color: THEME.warning,
  },
  starEmpty: {
    color: THEME.surfaceLight,
  },
  victoryText: {
    color: THEME.textMuted,
    fontSize: 15,
  },
  newBest: {
    color: THEME.success,
    fontSize: 14,
    fontWeight: '700',
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: THEME.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  rewardLabel: {
    color: THEME.textMuted,
    fontSize: 14,
  },
  rewardValue: {
    color: THEME.warning,
    fontSize: 18,
    fontWeight: '700',
  },
  victoryActions: {
    gap: 10,
    width: '100%',
    alignItems: 'center',
  },
});
