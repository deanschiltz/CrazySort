import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { LIQUID_COLORS, THEME } from '@/constants/colors';

const CONFETTI_COLORS = [
  THEME.primary,
  THEME.secondary,
  THEME.warning,
  THEME.accent,
  LIQUID_COLORS.emerald,
  LIQUID_COLORS.sapphire,
];

/**
 * Lightweight confetti burst for the victory overlay.
 * @param {Object} props
 * @param {boolean} props.active
 */
export function ConfettiBurst({ active }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      progress.value = 0;
      return;
    }
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1400,
      easing: Easing.out(Easing.quad),
    });
  }, [active, progress]);

  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        startX: (index % 8) * 12 - 42 + (index % 3) * 4,
        drift: ((index % 5) - 2) * 18,
        delay: (index % 6) * 0.04,
        size: 5 + (index % 3) * 2,
        rotation: (index % 7) * 24,
      })),
    [],
  );

  if (!active) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} piece={piece} progress={progress} />
      ))}
    </View>
  );
}

/**
 * @param {Object} props
 * @param {{ id: number, color: string, startX: number, drift: number, delay: number, size: number, rotation: number }} props.piece
 * @param {import('react-native-reanimated').SharedValue<number>} props.progress
 */
function ConfettiPiece({ piece, progress }) {
  const style = useAnimatedStyle(() => {
    const raw = Math.max(0, Math.min(1, (progress.value - piece.delay) / (1 - piece.delay)));
    const fall = raw * 220;

    return {
      opacity: 1 - raw * 0.85,
      transform: [
        { translateX: piece.startX + piece.drift * raw },
        { translateY: -40 + fall },
        { rotate: `${piece.rotation + raw * 180}deg` },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.piece,
        {
          backgroundColor: piece.color,
          width: piece.size,
          height: piece.size * 1.6,
          borderRadius: 2,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    overflow: 'hidden',
  },
  piece: {
    position: 'absolute',
    top: '28%',
  },
});
