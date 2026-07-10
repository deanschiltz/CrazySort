import { useCallback } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GradientBackground } from '@/components/ui/GradientBackground';
import { THEME } from '@/constants/colors';
import { useSave } from '@/context/SaveContext';

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {boolean} props.value
 * @param {(value: boolean) => void} props.onValueChange
 */
function SettingRow({ label, value, onValueChange }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: THEME.surfaceLight, true: THEME.primaryLight }}
        thumbColor={value ? THEME.primary : THEME.textMuted}
      />
    </View>
  );
}

export function SettingsScreen() {
  const router = useRouter();
  const { saveData, updateSettings } = useSave();

  const toggleSound = useCallback(
    (soundEnabled) => updateSettings({ soundEnabled }),
    [updateSettings],
  );

  const toggleMusic = useCallback(
    (musicEnabled) => updateSettings({ musicEnabled }),
    [updateSettings],
  );

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Settings</Text>

        <View style={styles.card}>
          <SettingRow
            label="Sound Effects"
            value={saveData.settings.soundEnabled}
            onValueChange={toggleSound}
          />
          <View style={styles.divider} />
          <SettingRow
            label="Music"
            value={saveData.settings.musicEnabled}
            onValueChange={toggleMusic}
          />
        </View>

        <Text style={styles.note}>
          Sound and music preferences are saved locally and apply immediately.
        </Text>

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
    gap: 20,
  },
  back: {
    alignSelf: 'flex-start',
  },
  backText: {
    color: THEME.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: THEME.text,
    fontSize: 32,
    fontWeight: '700',
  },
  card: {
    backgroundColor: THEME.surface,
    borderRadius: 18,
    padding: 8,
    borderWidth: 1,
    borderColor: THEME.surfaceLight,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLabel: {
    color: THEME.text,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: THEME.surfaceLight,
    marginHorizontal: 16,
  },
  note: {
    color: THEME.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
