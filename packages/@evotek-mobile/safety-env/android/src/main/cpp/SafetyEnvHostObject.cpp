#include "SafetyEnvHostObject.h"

std::vector<jsi::PropNameID> SafetyEnvHostObject::getPropertyNames(jsi::Runtime &runtime)
{
  std::vector<jsi::PropNameID> properties;

  properties.push_back(jsi::PropNameID::forUtf8(runtime, "getEnv"));
  properties.push_back(jsi::PropNameID::forUtf8(runtime, "getAllEnv"));

  return properties;
};

jsi::Value SafetyEnvHostObject::get(jsi::Runtime &runtime, const jsi::PropNameID &propName)
{
  auto propNameUtf8 = propName.utf8(runtime);

  if (propNameUtf8 == "getEnv")
  {
    return jsi::Function::createFromHostFunction(
        runtime,
        propName,
        1,
        [](
            jsi::Runtime &jsiRuntime,
            const jsi::Value &,
            const jsi::Value *args, int size)
        {
          if (!args[0].isString())
          {
            throw jsi::JSError(jsiRuntime, "getEnv expects a string argument");
          }

          std::string name = args[0].getString(jsiRuntime).utf8(jsiRuntime);

          std::string result = safetyenv::getEnvValue(name);

          return jsi::Value(jsiRuntime, jsi::String::createFromUtf8(jsiRuntime, result));
        });
  }

  if (propNameUtf8 == "getAllEnv")
  {
    return jsi::Function::createFromHostFunction(
        runtime,
        propName,
        0,
        [](
            jsi::Runtime &jsiRuntime,
            const jsi::Value &,
            const jsi::Value *args, int size)
        {
          std::map<std::string, std::string> result = safetyenv::getAllEnvValues();

          jsi::Object resultObject = jsi::Object(jsiRuntime);

          for (auto const &pair : result)
          {
            resultObject.setProperty(
                jsiRuntime,
                jsi::String::createFromUtf8(jsiRuntime, pair.first),
                jsi::String::createFromUtf8(jsiRuntime, pair.second));
          }

          return jsi::Value(jsiRuntime, resultObject);
        });
  }

  return jsi::Value::undefined();
}
