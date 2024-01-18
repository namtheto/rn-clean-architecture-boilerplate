import {Platform} from 'react-native';

class PBase {
  readonly platform = Platform.OS;
  readonly isIOS = Platform.OS === 'ios';
  readonly isAndroid = Platform.OS === 'android';
  readonly OS = Platform.OS;
  readonly version = Platform.Version;
}

export const PlatformBase = new PBase();
