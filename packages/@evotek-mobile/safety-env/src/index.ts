import { NativeModules, Platform } from 'react-native';
import type { IGetEnv } from './types';

declare namespace global {
  const safetyEnv: IGetEnv;
}

const LINKING_ERROR =
  `The package 'react-native-safety-env' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const INSTALL_JSI_ERROR = 'Install react-native-safety-env error';

const SafetyEnvModule = NativeModules.SafetyEnv
  ? NativeModules.SafetyEnv
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export class SafetyEnv {
  private static instance: SafetyEnv;

  private constructor() {
    const installSuccess = SafetyEnvModule.install();

    if (!installSuccess) {
      throw new Error(INSTALL_JSI_ERROR);
    }
  }

  public static getInstance(): SafetyEnv {
    if (!SafetyEnv.instance) {
      SafetyEnv.instance = new SafetyEnv();
    }

    return SafetyEnv.instance;
  }

  public getEnv(key: string, withDefault?: string): string | null {
    return global.safetyEnv.getEnv(key) || withDefault || null;
  }

  public getAllEnv(): { [key: string]: string } {
    return global.safetyEnv.getAllEnv() || [];
  }
}

const safetyEnv = SafetyEnv.getInstance();

export default safetyEnv;
