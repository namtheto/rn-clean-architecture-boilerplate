#include "SafetyEnv.h"

namespace safetyenv
{
  std::string getEnvValue(std::string envKey)
  {
    // Get non-destructive copy of envMap
    std::map<std::string, std::string> envMap = SafetyEnv_Generated::getEnvMap();

    // Check if envKey exists in envMap
    if (envMap.find(envKey) != envMap.end())
    {
      // Return envValue
      return envMap[envKey];
    }
    else
    {
      // Return empty string
      return "";
    }
  }

  std::map<std::string, std::string> getAllEnvValues()
  {
    // Get non-destructive copy of envMap
    std::map<std::string, std::string> envMap = SafetyEnv_Generated::getEnvMap();

    // Return envMap
    return envMap;
  }
}
