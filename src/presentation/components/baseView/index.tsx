import {vs} from '../../../app/utils/responsive';
import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import EdgeInsets from '../../../app/types/EdgeInsets';

export interface BaseViewProps extends ViewProps {
  flex?: number;
  row?: boolean;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  width?: number | string;
  height?: number | string;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  borderRadius?: number;
  backgroundColor?: string;
  safeInsets?: 'top' | 'bottom' | 'both' | 'none';
  visible?: boolean;
}

export const BaseView: React.FC<BaseViewProps> = ({
  children,
  style,
  flex,
  row,
  margin,
  padding,
  width,
  height,
  alignItems,
  justifyContent,
  borderRadius,
  backgroundColor,
  safeInsets = 'none',
  visible = true,
  ...rest
}) => {
  const styleProps = StyleSheet.flatten(style);
  const insets = useSafeAreaInsets();

  const getFlex = useMemo(() => {
    if (flex) {
      return flex;
    }
    if (styleProps?.flex) {
      return styleProps.flex;
    }
    return undefined;
  }, [flex, styleProps]);

  const getMargin = useMemo(() => {
    if (margin) {
      const {top, bottom, left, right} = margin;
      return {
        marginTop: top,
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
      };
    }
    return undefined;
  }, [margin]);

  const getPadding = useMemo(() => {
    if (padding) {
      const {top, bottom, left, right} = padding;
      return {
        paddingTop: top,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
      };
    }

    if (safeInsets === 'top') {
      return {paddingTop: insets.top};
    }

    if (safeInsets === 'bottom') {
      return {paddingBottom: insets.bottom};
    }

    if (safeInsets === 'both') {
      return {paddingTop: insets.top, paddingBottom: insets.bottom};
    }

    return undefined;
  }, [insets.bottom, insets.top, padding, safeInsets]);

  const getWidth = useMemo(() => {
    if (width) {
      if (typeof width === 'number') {
        return vs(width);
      }
      return width;
    }
    if (styleProps?.width) {
      return styleProps.width;
    }
    return undefined;
  }, [width, styleProps]);

  const getHeight = useMemo(() => {
    if (height) {
      if (typeof height === 'number') {
        return vs(height);
      }
      return height;
    }
    if (styleProps?.height) {
      return styleProps.height;
    }
    return undefined;
  }, [height, styleProps]);

  const getStyle: StyleProp<any> = StyleSheet.flatten([
    {
      flexDirection: row ? 'row' : 'column',
    },
    getFlex && {flex: getFlex},
    getWidth && {width: getWidth},
    getHeight && {height: getHeight},
    alignItems && {alignItems: alignItems},
    justifyContent && {justifyContent: justifyContent},
    borderRadius && {borderRadius: borderRadius},
    backgroundColor && {backgroundColor: backgroundColor},
    getMargin && getMargin,
    getPadding && getPadding,
    style,
  ]);

  if (!visible) {
    return null;
  }

  return (
    <View style={getStyle} {...rest}>
      {children}
    </View>
  );
};
