import { Platform, StyleSheet, Text, View } from 'react-native';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { THEME } from '@/constants/colors';

/**
 * @param {Object} props
 * @param {boolean} props.canUndo
 * @param {number} props.hintsRemaining
 * @param {() => void} props.onUndo
 * @param {() => void} props.onRestart
 * @param {() => void} props.onHint
 */
export function GameToolbar({
  canUndo,
  hintsRemaining,
  onUndo,
  onRestart,
  onHint,
}) {
  return (
    <View style={styles.toolbar}>
      <AnimatedButton
        label="Undo"
        variant="ghost"
        disabled={!canUndo}
        onPress={onUndo}
      />
      <AnimatedButton label="Restart" variant="ghost" onPress={onRestart} />
      <AnimatedButton
        label={`Hint (${hintsRemaining})`}
        variant="secondary"
        disabled={hintsRemaining <= 0}
        onPress={onHint}
      />
    </View>
  );
}

/**
 * @param {Object} props
 * @param {string} props.levelLabel
 * @param {string} [props.levelName]
 * @param {number} props.moveCount
 * @param {() => void} props.onPause
 */
export function GameHeader({ levelLabel, levelName, moveCount, onPause }) {
  return (
    <View style={styles.header}>
      <View style={[styles.headerSide, styles.headerSideLeft]}>
        <Text style={styles.headerLabel}>Level</Text>
        <Text style={styles.headerValue}>{levelLabel}</Text>
        {levelName ? (
          <Text style={styles.headerName} numberOfLines={1}>
            {levelName}
          </Text>
        ) : null}
      </View>

      <View style={styles.headerCenter}>
        <Text style={styles.moves}>{moveCount} moves</Text>
      </View>

      <View style={[styles.headerSide, styles.headerSideRight]}>
        <AnimatedButton label="Pause" variant="ghost" compact onPress={onPause} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: Platform.OS === 'web' ? 4 : 0,
  },
  headerSide: {
    flex: 1,
  },
  headerSideLeft: {
    alignItems: 'flex-start',
  },
  headerSideRight: {
    alignItems: 'flex-end',
    paddingRight: Platform.OS === 'web' ? 8 : 0,
  },
  headerLabel: {
    color: THEME.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  headerValue: {
    color: THEME.text,
    fontSize: 18,
    fontWeight: '700',
  },
  headerName: {
    color: THEME.textMuted,
    fontSize: 11,
    fontWeight: '500',
    maxWidth: 120,
  },
  headerCenter: {
    alignItems: 'center',
    paddingHorizontal: 8,
    minWidth: 96,
  },
  moves: {
    color: THEME.secondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
