import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '@/constants/colors';

/**
 * Full-screen gradient background used across all screens.
 * @param {import('react').PropsWithChildren<{ style?: import('react-native').StyleProp<import('react-native').ViewStyle> }>} props
 */
export function GradientBackground({ children, style }) {
  return (
    <LinearGradient
      colors={[THEME.background, THEME.backgroundGradientEnd]}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
