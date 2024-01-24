import React, {Component, useEffect} from 'react';
import {useWindowDimensions} from 'react-native';

import {
  AnimationCallback,
  Easing,
  ExtrapolationType,
  interpolate,
  interpolateColor,
  measure,
  SharedValue,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * Interpolate number
 */
export const useInterpolate = (
  progress: SharedValue<number>,
  input: number[],
  output: number[],
  type?: ExtrapolationType,
) => useDerivedValue(() => interpolate(progress.value, input, output, type));

/**
 * Interpolate color
 */
export const useInterpolateColor = (
  progress: SharedValue<number>,
  input: number[],
  output: string[],
  colorSpace?: 'RGB' | 'HSV' | undefined,
) => {
  'worklet';

  return useDerivedValue(() =>
    interpolateColor(progress.value, input, output, colorSpace),
  );
};

/**
 * Linear interpolation between x and y using a to weight between them
 */
export const useMix = (progress: SharedValue<number>, x: number, y: number) => {
  'worklet';

  return useDerivedValue(() => x + progress.value * (y - x));
};

/**
 * Convert number to radian
 */
export const useRadian = (value: SharedValue<number>) =>
  useDerivedValue(() => {
    'worklet';

    return `${value.value}deg`;
  });

/**
 * Return view inside screen or not
 */
export function useInsideView<T extends Component>(
  wrapHeight: number | undefined = undefined,
): [React.RefObject<T>, SharedValue<boolean>] {
  const {height} = useWindowDimensions();

  const {top} = useSafeAreaInsets();

  const ref = useAnimatedRef<T>();

  const toggle = useSharedValue(0);

  const rectBottom = useSharedValue(0);

  const rectTop = useSharedValue(0);

  const visible = useDerivedValue(() => {
    return rectTop.value <= (wrapHeight || height) && rectBottom.value >= 0;
  });

  useDerivedValue(() => {
    const measured = measure(ref);

    if (!measured) {
      return;
    }

    rectTop.value = measured.pageY - top;

    rectBottom.value = measured.pageY + measured.height - top;

    toggle.value = toggle.value === 1 ? 0 : 1;
  });

  return [ref, visible];
}

type Vector = {
  x: number;
  y: number;
};

/**
 * Create Animated Shared Value Vector
 */
export const useVector = ({x, y}: Vector) => {
  const ox = useSharedValue(x);

  const oy = useSharedValue(y);

  return [ox, oy];
};

type UseTimingParams = {
  toValue?: number;
  from?: number;
  config?: WithTimingConfig;
  callback?: AnimationCallback;
  delay?: number;
};

export const useTiming = ({
  callback,
  config,
  from = 0,
  toValue = 1,
  delay = 0,
}: UseTimingParams = {}) => {
  const progress = useSharedValue(from);

  // effect
  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(
        toValue,
        Object.assign(
          {
            duration: 500,
            easing: Easing.bezier(0.33, 0.01, 0, 1),
          },
          config,
        ),
        callback,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // result
  return progress;
};

type UseSpringParams = {
  toValue?: number;
  from?: number;
  config?: WithSpringConfig;
  callback?: AnimationCallback;
  delay?: number;
};

export const useSpring = ({
  callback,
  config,
  from = 0,
  toValue = 1,
  delay = 0,
}: UseSpringParams = {}) => {
  const progress = useSharedValue(from);

  // effect
  useEffect(() => {
    progress.value = withDelay(delay, withSpring(toValue, config, callback));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // result
  return progress;
};

export const sharedBin = (value: boolean): 0 | 1 => {
  'worklet';
  return value ? 1 : 0;
};

export const useSharedTransition = (
  state: boolean | number,
  config?: WithTimingConfig,
) => {
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = typeof state === 'boolean' ? sharedBin(state) : state;
  }, [state, value]);

  return useDerivedValue(() =>
    withTiming(
      value.value,
      Object.assign(
        {duration: 500, easing: Easing.bezier(0.33, 0.01, 0, 1)},
        config,
      ),
    ),
  );
};
