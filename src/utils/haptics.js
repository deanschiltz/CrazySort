import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

/**
 * Light haptic feedback for gameplay events.
 * No-ops on web and when haptics are unavailable.
 * @param {'light' | 'medium' | 'success' | 'warning'} style
 */
export function triggerHaptic(style = 'light') {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    switch (style) {
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'success':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case 'warning':
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      default:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  } catch {
    // Haptics unavailable — ignore.
  }
}
