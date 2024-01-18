package com.reactnativesafetyenv;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = SafetyEnvModule.NAME)
public class SafetyEnvModule extends ReactContextBaseJavaModule {
  public static final String NAME = "SafetyEnv";

  static {
    try {
      // Used to load the 'safetyenv' library on application startup.
      System.loadLibrary("safetyenv");
    } catch (Exception ignored) {
      Log.e("SafetyEnv", "Failed to load native library");
    }
  }

  public SafetyEnvModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  private static native void nativeInstall(long jsiPtr);

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean install() {
    JavaScriptContextHolder jsContext = getReactApplicationContext().getJavaScriptContextHolder();
    try{
      if (jsContext.get() != 0) {
        Log.d("SafetyEnv", "Installing SafetyEnv");
        nativeInstall(jsContext.get());
        Log.d("SafetyEnv", "Installed SafetyEnv");
        return true;
      }

      return false;
    } catch (Exception e) {
      Log.e("SafetyEnv", "Failed to install SafetyEnv", e);
      return false;
    }
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
