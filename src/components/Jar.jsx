import { memo, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, {
  ClipPath,
  Defs,
  G,
  LinearGradient,
  Rect,
  Stop,
} from 'react-native-svg';
import { ANIMATION_SPRING } from '@/game/animations/constants';
import { SparkleBurst } from '@/components/game/SparkleBurst';
import { LIQUID_COLORS, THEME } from '@/constants/colors';

/** @typedef {import('@/game/models/Jar').Jar} JarModel */

/**
 * @param {Object} props
 * @param {number} props.jarIndex
 * @param {ReturnType<JarModel['toJSON']>} props.jar
 * @param {boolean} props.isSelected
 * @param {boolean} props.isHinted
 * @param {number} props.size
 * @param {() => void} props.onPress
 * @param {Object | null} [props.pourEffect]
 */
function JarComponent({
  jarIndex,
  jar,
  isSelected,
  isHinted,
  size,
  onPress,
  pourEffect = null,
}) {
  const width = size;
  const height = size * 1.55;
  const layerHeight = height / jar.capacity;
  const borderRadius = width * 0.22;
  const innerRadius = borderRadius - 1;
  const inset = 4;
  const liquidWidth = width - inset * 2;

  const pourColor =
    pourEffect && LIQUID_COLORS[pourEffect.color]
      ? LIQUID_COLORS[pourEffect.color]
      : THEME.primary;

  const pourMetrics = useMemo(() => {
    if (!pourEffect) {
      return null;
    }

    const { layerCountBefore, amount, role } = pourEffect;
    const blockHeight = amount * layerHeight - 1;
    const remainingCount = layerCountBefore - amount;

    if (role === 'source') {
      // Align with the top of the remaining liquid already shown in the SVG.
      const top = (jar.capacity - remainingCount) * layerHeight + 1;
      return { top, blockHeight };
    }

    const top = (jar.capacity - layerCountBefore - amount) * layerHeight + 1;
    return { top, blockHeight };
  }, [pourEffect, jar.capacity, layerHeight]);

  const svgIds = useMemo(
    () => ({
      clip: `jar-${jarIndex}-clip`,
      shine: `jar-${jarIndex}-shine`,
      shadow: `jar-${jarIndex}-shadow`,
      liquidShine: `jar-${jarIndex}-liquid-shine`,
    }),
    [jarIndex],
  );

  const lift = useSharedValue(0);
  const scale = useSharedValue(1);
  const [sparkleActive, setSparkleActive] = useState(false);

  useAnimatedReaction(
    () => (pourEffect?.role === 'dest' ? pourEffect.progress.value : -1),
    (value, previous) => {
      if (value >= 0.9 && (previous ?? -1) < 0.9) {
        runOnJS(setSparkleActive)(true);
      }
    },
  );

  useEffect(() => {
    if (!pourEffect) {
      setSparkleActive(false);
    }
  }, [pourEffect]);

  useEffect(() => {
    if (pourEffect) {
      lift.value = 0;
      scale.value = 1;
      return;
    }
    lift.value = withSpring(isSelected ? -4 : 0, ANIMATION_SPRING.selection);
    scale.value = withSpring(isSelected ? 1.02 : 1, ANIMATION_SPRING.selection);
  }, [isSelected, lift, scale, pourEffect]);

  const animatedWrapperStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: pourEffect ? 0 : lift.value }, { scale: pourEffect ? 1 : scale.value }],
  }));

  const sourcePourStyle = useAnimatedStyle(() => {
    if (!pourEffect || pourEffect.role !== 'source' || !pourMetrics) {
      return { opacity: 0 };
    }

    const t = pourEffect.progress.value;
    const drain = interpolate(t, [0, 0.75], [0, 1], Extrapolation.CLAMP);

    return {
      opacity: interpolate(drain, [0, 0.55, 0.9, 1], [1, 1, 0.2, 0], Extrapolation.CLAMP),
      transform: [{ translateY: -drain * pourMetrics.blockHeight }],
    };
  });

  const destPourStyle = useAnimatedStyle(() => {
    if (!pourEffect || pourEffect.role !== 'dest' || !pourMetrics) {
      return { opacity: 0 };
    }

    const t = pourEffect.progress.value;
    const fill = interpolate(t, [0.08, 0.92], [0, 1], Extrapolation.CLAMP);

    return {
      opacity: interpolate(fill, [0, 0.12, 1], [0, 1, 1], Extrapolation.CLAMP),
      transform: [{ translateY: -(1 - fill) * pourMetrics.blockHeight }],
    };
  });

  const visibleLayers =
    pourEffect?.role === 'dest'
      ? jar.layers.slice(pourEffect.amount)
      : jar.layers;

  const borderColor = isSelected
    ? THEME.jarSelected
    : isHinted
      ? THEME.secondary
      : THEME.jarBorder;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        { width, height: height + 12 },
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Jar with ${jar.layers.length} layers`}
    >
      <Animated.View
        style={[
          styles.jarWrapper,
          {
            width,
            height,
            borderRadius,
            borderColor,
            shadowColor: isSelected ? THEME.primary : THEME.jarShadow,
          },
          isHinted && styles.jarHinted,
          animatedWrapperStyle,
        ]}
      >
        <SparkleBurst active={sparkleActive} color={pourColor} width={width} />
        <Svg width={width} height={height} style={styles.layer}>
          <Defs>
            <ClipPath id={svgIds.clip}>
              <Rect
                x={1}
                y={1}
                width={width - 2}
                height={height - 2}
                rx={innerRadius}
              />
            </ClipPath>
            <LinearGradient id={svgIds.shine} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.42" />
              <Stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0.14" />
              <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </LinearGradient>
            <LinearGradient id={svgIds.shadow} x1="1" y1="0" x2="0" y2="0">
              <Stop offset="0" stopColor="#000000" stopOpacity="0.28" />
              <Stop offset="0.45" stopColor="#000000" stopOpacity="0.08" />
              <Stop offset="1" stopColor="#000000" stopOpacity="0" />
            </LinearGradient>
            <LinearGradient id={svgIds.liquidShine} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.18" />
              <Stop offset="0.4" stopColor="#FFFFFF" stopOpacity="0.04" />
              <Stop offset="1" stopColor="#000000" stopOpacity="0.06" />
            </LinearGradient>
          </Defs>

          <Rect
            x={1}
            y={1}
            width={width - 2}
            height={height - 2}
            rx={innerRadius}
            fill={THEME.jarGlass}
          />

          <G clipPath={`url(#${svgIds.clip})`}>
            {visibleLayers.map((colorKey, index) => {
              const emptySlots = jar.capacity - visibleLayers.length;
              const y = (emptySlots + index) * layerHeight + 1;
              const color = LIQUID_COLORS[colorKey] ?? THEME.primary;
              const isTopLayer = index === 0;

              return (
                <G key={`${colorKey}-${index}-${visibleLayers.length}`}>
                  <Rect
                    x={inset}
                    y={y}
                    width={liquidWidth}
                    height={layerHeight - 1}
                    fill={color}
                    rx={isTopLayer ? 3 : 0}
                  />
                  {isTopLayer ? (
                    <Rect
                      x={inset + 2}
                      y={y + 1}
                      width={liquidWidth - 4}
                      height={Math.max(2, layerHeight * 0.22)}
                      fill="#FFFFFF"
                      opacity={0.22}
                      rx={2}
                    />
                  ) : null}
                </G>
              );
            })}
            <Rect
              x={1}
              y={1}
              width={width - 2}
              height={height - 2}
              fill={`url(#${svgIds.liquidShine})`}
            />
          </G>
        </Svg>

        {pourEffect && pourMetrics ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pourLiquid,
              {
                left: inset,
                width: liquidWidth,
                top: pourMetrics.top,
                height: pourMetrics.blockHeight,
                backgroundColor: pourColor,
              },
              pourEffect.role === 'source' ? sourcePourStyle : destPourStyle,
            ]}
          />
        ) : null}

        <Svg width={width} height={height} style={styles.layer} pointerEvents="none">
          <Defs>
            <LinearGradient id={`${svgIds.shine}-top`} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.42" />
              <Stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0.14" />
              <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </LinearGradient>
            <LinearGradient id={`${svgIds.shadow}-top`} x1="1" y1="0" x2="0" y2="0">
              <Stop offset="0" stopColor="#000000" stopOpacity="0.28" />
              <Stop offset="0.45" stopColor="#000000" stopOpacity="0.08" />
              <Stop offset="1" stopColor="#000000" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect
            x={2}
            y={2}
            width={width * 0.32}
            height={height - 4}
            rx={innerRadius - 1}
            fill={`url(#${svgIds.shine}-top)`}
          />
          <Rect
            x={width * 0.72}
            y={2}
            width={width * 0.26}
            height={height - 4}
            rx={innerRadius - 1}
            fill={`url(#${svgIds.shadow}-top)`}
          />
          <Rect
            x={inset}
            y={3}
            width={liquidWidth}
            height={2.5}
            rx={1.25}
            fill="#FFFFFF"
            opacity={0.28}
          />
          <Rect
            x={1}
            y={1}
            width={width - 2}
            height={height - 2}
            rx={innerRadius}
            fill="none"
            stroke={THEME.jarHighlight}
            strokeWidth={0.75}
            opacity={0.45}
          />
        </Svg>
      </Animated.View>
    </Pressable>
  );
}

export const Jar = memo(JarComponent);

const styles = StyleSheet.create({
  pressable: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pressed: {
    opacity: 0.9,
  },
  jarWrapper: {
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.18)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  jarHinted: {
    shadowColor: THEME.secondary,
    shadowOpacity: 0.55,
    shadowRadius: 10,
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  pourLiquid: {
    position: 'absolute',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    zIndex: 2,
  },
});
