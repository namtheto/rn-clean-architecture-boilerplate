import React, {useMemo} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {vs} from '../../../app/utils/responsive';

export interface SpacerProps {
  width?: number;
  height?: number;
}

export const Spacer = (props: SpacerProps) => {
  const {height = 0, width = 0} = props;

  // style
  const actualStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: typeof width === 'number' ? vs(width) : width,
      height: typeof height === 'number' ? vs(height) : height,
    }),
    [height, width],
  );

  // render
  return <View style={actualStyle} />;
};
