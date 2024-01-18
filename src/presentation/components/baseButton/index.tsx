import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {BaseText} from '../baseText';
import {useAppTranslation} from '../../../app/hooks';
import {BaseButtonProps} from './type';
import {useButtonStyle} from './styles';

const BaseButton: React.FC<BaseButtonProps> = props => {
  const {
    onPress,
    style,
    disabled,
    mode = 'primary',
    shadow,
    label,
    labelOption,
    disableTranslate,
    flex,
  } = props;
  const t = useAppTranslation();
  const {colors, styles, fs} = useButtonStyle();

  //memo
  const getMode = useMemo(
    () => ({
      primary: {
        style: styles.containerMain,
        textColor: colors.white,
        opacity: disabled ? 0.5 : 1,
      },
      secondary: {
        style: styles.containerSecondary,
        textColor: colors.newPrimary,
        opacity: disabled ? 0.5 : 1,
      },
    }),
    [
      colors.newPrimary,
      colors.white,
      disabled,
      styles.containerMain,
      styles.containerSecondary,
    ],
  );

  let content;
  if (typeof label === 'string' && !disableTranslate) {
    content = t(label, labelOption);
  } else {
    content = label;
  }

  return (
    <TouchableOpacity
      {...{onPress}}
      style={[
        getMode[mode].style,
        {opacity: getMode[mode].opacity},
        flex && styles.flex,
        shadow && styles.shadowCard,
        style,
      ]}
      disabled={disabled}>
      <BaseText
        fontSize={fs(16)}
        fontWeight={'bold'}
        color={getMode[mode].textColor}>
        {content}
      </BaseText>
    </TouchableOpacity>
  );
};

export default BaseButton;
