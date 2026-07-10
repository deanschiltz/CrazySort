import { CommonActions } from '@react-navigation/native';

/**
 * Jump to the main menu immediately with no transition flash.
 * @param {import('@react-navigation/native').NavigationProp<Record<string, object | undefined>>} navigation
 */
export function navigateHomeInstant(navigation) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'index' }],
    }),
  );
}
