import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { JARS_PER_ROW } from '@/constants/game';
import { Jar } from '@/components/Jar';

/**
 * @param {number} jarIndex
 * @param {ReturnType<import('@/game/models/Jar').Jar['toJSON']>[]} jars
 * @param {import('@/game/animations/pourTypes').ActivePour | null} activePour
 */
function getDisplayJar(jarIndex, jars, activePour) {
  if (!activePour) {
    return jars[jarIndex];
  }

  const beforeJar = activePour.beforeSnapshot.jars[jarIndex];

  if (jarIndex === activePour.sourceIndex) {
    return {
      ...beforeJar,
      layers: beforeJar.layers.slice(activePour.amount),
    };
  }

  if (jarIndex === activePour.destIndex) {
    return jars[jarIndex];
  }

  return jars[jarIndex];
}

/**
 * @param {import('@/game/animations/pourTypes').ActivePour | null} activePour
 * @param {number} jarIndex
 */
function getPourEffect(activePour, jarIndex) {
  if (!activePour) {
    return null;
  }

  if (jarIndex === activePour.sourceIndex) {
    return {
      role: 'source',
      amount: activePour.amount,
      color: activePour.color,
      layerCountBefore:
        activePour.beforeSnapshot.jars[activePour.sourceIndex].layers.length,
    };
  }

  if (jarIndex === activePour.destIndex) {
    return {
      role: 'dest',
      amount: activePour.amount,
      color: activePour.color,
      layerCountBefore:
        activePour.beforeSnapshot.jars[activePour.destIndex].layers.length,
    };
  }

  return null;
}

/**
 * @param {Object} props
 * @param {ReturnType<import('@/game/models/Jar').Jar['toJSON']>[]} props.jars
 * @param {number | null} props.selectedJarIndex
 * @param {{ sourceIndex: number | null, destIndex: number | null }} props.hintState
 * @param {import('@/game/animations/pourTypes').ActivePour | null} props.activePour
 * @param {import('react-native-reanimated').SharedValue<number>} props.pourProgress
 * @param {(index: number) => void} props.onJarPress
 * @param {number} [props.jarSize]
 */
function GameBoardComponent({
  jars,
  selectedJarIndex,
  hintState,
  activePour,
  pourProgress,
  onJarPress,
  jarSize = 64,
}) {
  const rows = [];

  for (let index = 0; index < jars.length; index += JARS_PER_ROW) {
    rows.push(jars.slice(index, index + JARS_PER_ROW));
  }

  return (
    <View style={styles.board} pointerEvents={activePour ? 'none' : 'auto'}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((_jar, columnIndex) => {
            const jarIndex = rowIndex * JARS_PER_ROW + columnIndex;
            const displayJar = getDisplayJar(jarIndex, jars, activePour);
            const pourEffect = getPourEffect(activePour, jarIndex);

            return (
              <Jar
                key={`jar-${jarIndex}`}
                jarIndex={jarIndex}
                jar={displayJar}
                size={jarSize}
                isSelected={selectedJarIndex === jarIndex && !activePour}
                isHinted={
                  hintState.sourceIndex === jarIndex ||
                  hintState.destIndex === jarIndex
                }
                pourEffect={
                  pourEffect ? { ...pourEffect, progress: pourProgress } : null
                }
                onPress={() => onJarPress(jarIndex)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

export const GameBoard = memo(GameBoardComponent);

const styles = StyleSheet.create({
  board: {
    alignItems: 'center',
    gap: 20,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
});
