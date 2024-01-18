#import "RCTSafetyEnv.h"
#import "SafetyEnvHostObject.h"

#import <jsi/jsi.h>
#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>

using namespace facebook;

@implementation SafetyEnv
RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install)
{
    RCTBridge *bridge = [RCTBridge currentBridge];
    RCTCxxBridge *cxxBridge = (RCTCxxBridge *)bridge;

    if (cxxBridge == nil)
    {
        return @false;
    }

    auto jsiRuntime = (jsi::Runtime*) cxxBridge.runtime;

    if (jsiRuntime == nil)
    {
        return @false;
    }

    auto &runtime = *jsiRuntime;

    auto safetyEnvHostObject = std::make_shared<SafetyEnvHostObject>();
    auto safetyEnvHostObjectValue = jsi::Object::createFromHostObject(runtime, safetyEnvHostObject);

    runtime.global().setProperty(runtime, "safetyEnv", std::move(safetyEnvHostObjectValue));
    return @true;
}

@end
