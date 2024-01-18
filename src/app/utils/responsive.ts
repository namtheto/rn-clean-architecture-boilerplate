import {Dimensions} from 'react-native';
import {PlatformBase} from './platform';

const {width, height} = Dimensions.get('window');

const [SIZE_BASE_WIDTH_PHONE, SIZE_BASE_HEIGHT_PHONE] = [428, 926];

const isTablet = () => {
  const ratio = width / height;
  return ratio < 1 ? false : ratio >= 1.6;
};

const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
//Default guideline sizes are based on standard ~5" screen mobile device
const guidBaseWidthPhone = Number(SIZE_BASE_WIDTH_PHONE);
const guidBaseHeightPhone = Number(SIZE_BASE_HEIGHT_PHONE);

const scale = (size: number) => (shortDimension / guidBaseWidthPhone) * size;

const verticalScale = (size: number) =>
  (longDimension / guidBaseHeightPhone) * size;

const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

const fontScale = (size: number) => {
  const scaleValue = isTablet() ? 1.2 : 1;
  return moderateVerticalScale(size, scaleValue);
};

const isSmallDevice = height < 600;
const isMediumDevice = height < 700;
const isIPad = height > 900 || width > 900;

const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const rangeHeightDiff = screenHeight - windowHeight > verticalScale(50);

const heightDiff = PlatformBase.isAndroid
  ? rangeHeightDiff
    ? verticalScale(50)
    : screenHeight - windowHeight
  : 0;

export {
  isSmallDevice,
  isMediumDevice,
  heightDiff,
  isIPad,
  scale as s,
  verticalScale as vs,
  moderateScale as ms,
  moderateVerticalScale as mvs,
  fontScale as fs,
};
