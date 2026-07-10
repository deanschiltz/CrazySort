import { Pressable, StyleSheet, Text, View } from 'react-native';
import { THEME } from '@/constants/colors';

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {() => void} props.onPress
 * @param {'primary' | 'secondary' | 'ghost'} [props.variant]
 */
export function GameButton({ label, onPress, variant = 'primary' }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, variant === 'ghost' && styles.ghostLabel]}>
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {import('react').ReactNode} props.children
 */
export function ScreenContainer({ title, subtitle, children }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: THEME.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: THEME.textMuted,
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },
  button: {
    borderRadius: 14,
    paddingHorizontal: 22,
    paddingVertical: 12,
    minWidth: 110,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: THEME.primary,
  },
  secondary: {
    backgroundColor: THEME.secondary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  label: {
    color: THEME.text,
    fontSize: 15,
    fontWeight: '600',
  },
  ghostLabel: {
    color: THEME.textMuted,
  },
});
