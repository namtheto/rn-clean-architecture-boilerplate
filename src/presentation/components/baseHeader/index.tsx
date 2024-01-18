import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {useAppTranslation} from '../../../app/hooks';
import {BaseView} from '../baseView';
import {BaseText} from '../baseText';
import {Spacer} from '../spacer';
import {BaseHeaderProps} from './type';
import {useBaseHeaderStyle} from './styles';
import EdgeInsets from '../../../app/types/EdgeInsets';
import {goBack} from '../../navigation/helper';
import {ChevronLeft} from '../../../../assets/svgs';

export const BaseHeader: React.FC<BaseHeaderProps> = props => {
  //state
  const {
    onPressBack,
    onPressNext,
    modeColor = 'black',
    disablePadding = true,
    leftLabel = 'back',
    leftLabelOption,
    rightLabel = 'log_out',
    rightLabelOption,
    leftLabelDisableTranslate,
    rightLabelDisableTranslate,
    rightDisable = true,
    leftDisable = false,
  } = props;
  const t = useAppTranslation();
  const {colors, styles, vs, fs} = useBaseHeaderStyle();

  //memo
  const renderMode = useMemo(
    () => ({
      black: {
        color: colors.black,
      },
      white: {
        color: colors.white,
      },
    }),
    [colors],
  );

  //func
  const handleLeftPress = () => {
    if (onPressBack) {
      return onPressBack();
    }
    return goBack();
  };

  let leftContent;
  if (typeof leftLabel === 'string' && !leftLabelDisableTranslate) {
    leftContent = t(leftLabel, leftLabelOption);
  } else {
    leftContent = leftLabel;
  }

  let rightContent;
  if (typeof rightLabel === 'string' && !rightLabelDisableTranslate) {
    rightContent = t(rightLabel, rightLabelOption);
  } else {
    rightContent = rightLabel;
  }

  //render
  return (
    <BaseView
      style={styles.container}
      padding={EdgeInsets.symmetric({horizontal: disablePadding ? 0 : vs(25)})}>
      {!leftDisable ? (
        <TouchableOpacity onPress={handleLeftPress}>
          <BaseView row alignItems="center">
            <ChevronLeft color={renderMode[modeColor].color} size={16} />
            <Spacer width={8} />
            <BaseText
              fontSize={fs(16)}
              fontWeight={'600'}
              color={renderMode[modeColor].color}>
              {leftContent}
            </BaseText>
          </BaseView>
        </TouchableOpacity>
      ) : (
        <Spacer height={32} />
      )}
      {!rightDisable ? (
        <TouchableOpacity onPress={onPressNext}>
          <BaseText
            fontSize={fs(16)}
            fontWeight={'bold'}
            color={colors.deepBlue}>
            {rightContent}
          </BaseText>
        </TouchableOpacity>
      ) : (
        <Spacer height={32} />
      )}
    </BaseView>
  );
};
