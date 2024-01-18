import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {
  useInterpolateColor,
  useSharedTransition,
} from '../../../app/hooks/reanimated';
import {RadioButtonProps} from './type';
import {useRadioButtonStyle} from './styles';
import {BaseView} from '../baseView';
import {BaseText} from '../baseText';
import {Spacer} from '../spacer';
import {useAppTranslation} from '../../../app/hooks';
import {IconChecked} from '../../../../assets/svgs';

export const RadioButton = ({
  disable,
  initialValue = false,
  onToggle,
  value,
  size = 30,
  mode = 'check',
  dotSize = size - 10,
  label,
  labelOption,
  style,
  disableTranslate,
}: RadioButtonProps) => {
  // state
  const t = useAppTranslation();
  const {colors, styles, vs} = useRadioButtonStyle();
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue, {duration: 200});

  //memo
  const getMode = useMemo(
    () => ({
      check: {
        style: styles.box,
        child: <IconChecked color={colors.white} size={size} />,
        selectedColor: colors.newPrimary,
        selectedBorder: colors.newPrimary,
      },
      dot: {
        style: styles.dot,
        child: (
          <View
            style={[
              styles.activeDot,
              {
                width: vs(dotSize),
                height: vs(dotSize),
              },
            ]}
          />
        ),
        selectedColor: colors.white,
        selectedBorder: colors.newPrimary,
      },
    }),
    [
      colors.newPrimary,
      colors.white,
      dotSize,
      size,
      styles.activeDot,
      styles.box,
      styles.dot,
      vs,
    ],
  );

  const activeColor = useInterpolateColor(
    progress,
    [0, 1],
    [disable ? colors.colorADADBD : colors.white, getMode[mode]?.selectedColor],
  );
  const selectColor = useInterpolateColor(
    progress,
    [0, 1],
    [colors.colorADADBD, getMode[mode]?.selectedBorder],
  );

  //func
  const onPress = useCallback(() => {
    if (typeof value === 'boolean') {
      if (typeof onToggle === 'function') {
        onToggle && onToggle(!value);
      }
    } else {
      if (typeof onToggle === 'function') {
        onToggle && onToggle(!localValue);
      }
      setLocalValue(v => !v);
    }
  }, [localValue, onToggle, value]);

  // reanimated style
  const outlineReStyle = useAnimatedStyle(() => ({
    backgroundColor: activeColor.value,
    borderColor: selectColor.value,
    overflow: 'hidden',
  }));

  const iconReStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  let content;
  if (typeof label === 'string' && !disableTranslate) {
    content = t(label, labelOption);
  } else {
    content = label;
  }

  // render
  return (
    <TouchableWithoutFeedback
      disabled={disable}
      style={[styles.container, style]}
      onPress={onPress}>
      <BaseView row alignItems="center">
        <Animated.View
          style={[
            outlineReStyle,
            getMode[mode].style,
            {
              width: vs(size),
              height: vs(size),
            },
          ]}>
          <Animated.View style={iconReStyle}>
            {getMode[mode]?.child}
          </Animated.View>
        </Animated.View>
        <Spacer width={8} />
        <BaseText color={colors.black} fontSize={18}>
          {content}
        </BaseText>
      </BaseView>
    </TouchableWithoutFeedback>
  );
};
