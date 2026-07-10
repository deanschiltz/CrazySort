import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ANIMATION_SPRING } from '@/game/animations/constants';
import { useAudio } from '@/context/AudioContext';
import { THEME } from '@/constants/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {() => void} props.onPress
 * @param {'primary' | 'secondary' | 'ghost' | 'accent'} [props.variant]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.large]
 * @param {boolean} [props.compact]
 * @param {boolean} [props.sound]
 */
export function AnimatedButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  large = false,
  compact = false,
  sound = true,
}) {
  const { playTap } = useAudio();
  const scale = useSharedValue(1);

  const handlePress = () => {
    if (!disabled) {
      if (sound) {
        playTap();
      }
      onPress?.();
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={handlePress}
      onPressIn={() => {
        scale.value = withSpring(0.95, ANIMATION_SPRING.button);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, ANIMATION_SPRING.button);
      }}
      style={[
        styles.button,
        styles[variant],
        large && styles.large,
        compact && styles.compact,
        disabled && styles.disabled,
        animatedStyle,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'ghost' && styles.ghostLabel,
          disabled && styles.disabledLabel,
        ]}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    minWidth: 120,
    alignItems: 'center',
  },
  large: {
    paddingVertical: 18,
    minWidth: 220,
    borderRadius: 18,
  },
  compact: {
    minWidth: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  primary: {
    backgroundColor: THEME.primary,
  },
  secondary: {
    backgroundColor: THEME.secondary,
  },
  accent: {
    backgroundColor: THEME.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: THEME.surfaceLight,
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    color: THEME.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  ghostLabel: {
    color: THEME.textMuted,
  },
  disabledLabel: {
    color: THEME.textMuted,
  },
});
