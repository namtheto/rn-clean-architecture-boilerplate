#include "SafetyEnv.h"
#include "SafetyEnvHostObject.h"

#include <jni.h>
#include <jsi/jsi.h>

using namespace facebook;

void installSafetyEnvHostObject(jsi::Runtime &runtime)
{
  auto safetyEnvHostObject = std::make_shared<SafetyEnvHostObject>();
  auto safetyEnvHostObjectValue = jsi::Object::createFromHostObject(runtime, safetyEnvHostObject);
  runtime.global().setProperty(runtime, "safetyEnv", std::move(safetyEnvHostObjectValue));
};

extern "C" JNIEXPORT void JNICALL
Java_com_reactnativesafetyenv_SafetyEnvModule_nativeInstall(JNIEnv *env, jclass type, jlong jsiPtr)
{
  auto runtime = reinterpret_cast<jsi::Runtime *>(jsiPtr);
  installSafetyEnvHostObject(*runtime);
}
