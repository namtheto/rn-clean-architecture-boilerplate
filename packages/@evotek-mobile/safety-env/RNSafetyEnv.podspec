require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = 'RNSafetyEnv'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.authors      = package['author']

  s.platforms    = { ios: '10.0' }
  s.source       = { git: 'https://git.evotek.vn/evotek-mobile/base-sources/react-native/rn-core/safety_env.git', tag: "#{s.version}" }

  s.source_files = 'ios/**/*.{h,m,mm}', 'cpp/**/*.{h,cpp}'

  s.dependency 'React-Core'

  # Don't install the dependencies when we run `pod install` in the old architecture.
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1'
    s.compiler_flags = folly_compiler_flags + ' -DRCT_NEW_ARCH_ENABLED=1'
    s.pod_target_xcconfig = {
      'HEADER_SEARCH_PATHS' => '"$(PODS_ROOT)/boost"',
      'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17'
    }

    s.dependency 'React-Codegen'
    s.dependency 'RCT-Folly'
    s.dependency 'RCTRequired'
    s.dependency 'RCTTypeSafety'
    s.dependency 'ReactCommon/turbomodule/core'
  end
end
