#ifndef SAFETY_ENV_H
#define SAFETY_ENV_H

#include "SafetyEnv-Generated.h"

#include <string>
#include <map>

namespace safetyenv
{
  std::string getEnvValue(std::string envKey);
  std::map<std::string, std::string> getAllEnvValues();
}

#endif /* SAFETY_ENV_H */
