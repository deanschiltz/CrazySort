import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

/**
 * Small burst of sparkles at the top of a jar when liquid lands.
 * @param {Object} props
 * @param {boolean} props.active
 * @param {string} props.color
 * @param {number} props.width
 */
export function SparkleBurst({ active, color, width }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      progress.value = 0;
      return;
    }
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  }, [active, progress]);

  const particles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        angle: (index / 8) * Math.PI * 2,
        distance: 10 + (index % 3) * 8,
        size: 3 + (index % 2) * 2,
        delay: index * 18,
      })),
    [],
  );

  if (!active) {
    return null;
  }

  return (
    <View style={[styles.container, { width }]} pointerEvents="none">
      {particles.map((particle) => (
        <SparkleParticle
          key={particle.id}
          particle={particle}
          color={color}
          progress={progress}
        />
      ))}
    </View>
  );
}

/**
 * @param {Object} props
 * @param {{ id: number, angle: number, distance: number, size: number, delay: number }} props.particle
 * @param {string} props.color
 * @param {import('react-native-reanimated').SharedValue<number>} props.progress
 */
function SparkleParticle({ particle, color, progress }) {
  const style = useAnimatedStyle(() => {
    const t = progress.value;
    const travel = particle.distance * t;
    const x = Math.cos(particle.angle) * travel;
    const y = -Math.abs(Math.sin(particle.angle)) * travel - t * 14;

    return {
      opacity: 1 - t,
      transform: [
        { translateX: x },
        { translateY: y },
        { scale: 1 - t * 0.35 },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.sparkle,
        {
          backgroundColor: color,
          width: particle.size,
          height: particle.size,
          borderRadius: particle.size / 2,
          left: '50%',
          marginLeft: -particle.size / 2,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 4,
    left: 0,
    height: 24,
    zIndex: 4,
  },
  sparkle: {
    position: 'absolute',
    top: 0,
  },
});
