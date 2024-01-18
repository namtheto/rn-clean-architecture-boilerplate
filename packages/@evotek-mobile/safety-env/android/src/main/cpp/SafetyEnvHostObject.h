#ifndef SAFETY_HOST_OBJECT_H
#define SAFETY_HOST_OBJECT_H

#pragma once

#include "SafetyEnv.h"
#include <jsi/jsi.h>

using namespace facebook;

class JSI_EXPORT SafetyEnvHostObject : public jsi::HostObject
{
public:
  jsi::Value get(jsi::Runtime &runtime, const jsi::PropNameID &propName) override;
  std::vector<jsi::PropNameID> getPropertyNames(jsi::Runtime &runtime) override;
};

#endif
