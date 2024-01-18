import React, {useCallback, useMemo, useState} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {
  useInterpolateColor,
  useSharedTransition,
} from '../../../app/hooks/reanimated';
import {CheckboxProps} from './type';
import {useCheckboxStyle} from './styles';
import {TouchableWithoutFeedback} from 'react-native';
import {BaseView} from '../baseView';
import {BaseText} from '../baseText';
import {Spacer} from '../spacer';
import {useAppTranslation} from '../../../app/hooks';
import {IconChecked} from '../../../../assets/svgs';

export const CheckboxButton = ({
  disable,
  initialValue = false,
  onToggle,
  value,
  size = 25,
  mode = 'primary',
  label,
  labelOption,
  style,
  disableTranslate,
}: CheckboxProps) => {
  // state
  const t = useAppTranslation();
  const {colors, styles, vs} = useCheckboxStyle();
  const [localValue, setLocalValue] = useState<boolean>(initialValue);

  //memo
  const getMode = useMemo(
    () => ({
      primary: {
        style: styles.primaryBox,
        icon: colors.white,
        selectedColor: colors.newPrimary,
        selectedBorder: colors.newPrimary,
      },
      secondary: {
        style: styles.secondaryBox,
        icon: colors.colorADADBD,
        selectedColor: colors.white,
        selectedBorder: colors.colorADADBD,
      },
    }),
    [
      colors.colorADADBD,
      colors.newPrimary,
      colors.white,
      styles.primaryBox,
      styles.secondaryBox,
    ],
  );
  const progress = useSharedTransition(value ?? localValue, {duration: 200});
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
            <IconChecked color={getMode[mode].icon} size={size} />
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
