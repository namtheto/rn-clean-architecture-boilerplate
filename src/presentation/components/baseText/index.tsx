import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import {FONT_FAMILY} from '../../../app/utils/constant';
import {fs} from '../../../app/utils/responsive';
import {useAppTranslation} from '../../../app/hooks';

export interface BaseTextProps extends TextProps {
  color?: string;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | '100'
    | '200'
    | '300'
    | undefined;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  disableTranslate?: boolean;
  txOptions?: any;
}

export const BaseText: React.FC<BaseTextProps> = props => {
  const t = useAppTranslation();
  const {
    color,
    fontSize,
    fontWeight,
    fontStyle,
    children,
    textAlign,
    style,
    disableTranslate = false,
    txOptions,
    ...rest
  } = props;

  const getFontWeight = useMemo(() => {
    let wh = '-Regular';
    switch (fontWeight) {
      case 'bold':
        wh = '-Bold';
        break;
      case '500':
        wh = '-Medium';
        break;
      case '600':
        wh = '-Medium';
        break;
      case '700':
        wh = '-Bold';
        break;
      case '800':
        wh = '-Bold';
        break;
      default:
        break;
    }
    return `${FONT_FAMILY}${wh}`;
  }, [fontWeight]);

  const textStyle: StyleProp<TextStyle> = useMemo(() => {
    const flatStyle = StyleSheet.flatten(style);
    return StyleSheet.flatten([
      {
        color: color || flatStyle?.color || 'black',
        fontSize: fs(fontSize || 12) || flatStyle?.fontSize,
        fontFamily: getFontWeight,
        textAlign: textAlign || flatStyle?.textAlign,
        fontStyle: fontStyle || flatStyle?.fontStyle,
        fontWeight: fontWeight || flatStyle?.fontWeight,
      },
      style,
    ]);
  }, [style, color, fontSize, getFontWeight, textAlign, fontStyle, fontWeight]);

  let content;
  if (typeof children === 'string' && !disableTranslate) {
    content = t(children, txOptions);
  } else {
    content = children;
  }

  return (
    <Text {...rest} style={textStyle}>
      {content}
    </Text>
  );
};
