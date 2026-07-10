import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';
import { SaveProvider, useSave } from '@/context/SaveContext';
import { AudioProvider } from '@/context/AudioContext';
import { APP_NAME } from '@/constants/app';
import { THEME } from '@/constants/colors';
import { ANIMATION_DURATIONS } from '@/game/animations/constants';

const SCREEN_TRANSITION = {
  animation: 'fade',
  animationDuration: ANIMATION_DURATIONS.screen,
};

function NavigationStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME.background },
        ...SCREEN_TRANSITION,
      }}
    >
      <Stack.Screen name="index" options={{ title: APP_NAME }} />
      <Stack.Screen name="game" options={{ title: 'Play' }} />
      <Stack.Screen name="levels" options={{ title: 'Levels' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      <Stack.Screen name="statistics" options={{ title: 'Statistics' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

function AppRoot() {
  const { isLoading } = useSave();

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={THEME.primary} />
      </View>
    );
  }

  return <NavigationStack />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SaveProvider>
        <AudioProvider>
          <AppRoot />
        </AudioProvider>
      </SaveProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.background,
  },
});
