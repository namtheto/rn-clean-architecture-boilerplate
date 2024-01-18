# frozen_string_literal: true

require_relative './safety_env_generation_utils'

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

$SAFETY_ENV_GENERATED_DIR = 'build/cpp/generated'
$CURRENT_DIR = '.'

def prepair!
  # Clean the generated directory
  Pod::Executable.execute_command('rm', ['-rf', $SAFETY_ENV_GENERATED_DIR], true)

  # Create the output directory
  Pod::Executable.execute_command('mkdir', ['-p', $SAFETY_ENV_GENERATED_DIR], true)
end

def use_safety_env!
  dotenv = SafetyEnvGenerationUtils.new.read_dot_env_file!($CURRENT_DIR)
  prepair!

  # Header source content
  header = <<~HEADER
    // DO NOT EDIT, it was generated from the .env file
    #ifndef SAFETYENV_GENERATED_H
    #define SAFETYENV_GENERATED_H

    #include <string>
    #include <map>

    class SafetyEnv_Generated {
      public:
        static std::map<std::string, std::string> getEnvMap();
    };

    #endif // SAFETYENV_GENERATED_H
  HEADER

  # Source content
  source = <<~SOURCE
    // DO NOT EDIT, it was generated from the .env file
    #include "SafetyEnv-Generated.h"

    std::map<std::string, std::string> SafetyEnv_Generated::getEnvMap()#{' '}
    {
      std::map<std::string, std::string> envMap;

      #{
        dotenv.map do |key, value|
          "envMap[\"#{key}\"] = \"#{value}\";"
        end.join("\n  ")
      }

      return envMap;
    }
  SOURCE

  # Write the header source file
  File.open($SAFETY_ENV_GENERATED_DIR + '/SafetyEnv-Generated.h', 'w') do |file|
    file.write(header.to_s)
    file.fsync
  end

  # Write the source file
  File.open($SAFETY_ENV_GENERATED_DIR + '/SafetyEnv-Generated.mm', 'w') do |file|
    file.write(source.to_s)
    file.fsync
  end

  puts "[Safety Env] Generated source file at path: #{$SAFETY_ENV_GENERATED_DIR}"

  SafetyEnvGenerationUtils.new.generate_podspec

  pod 'SafetyEnv-Generated', path: $SAFETY_ENV_GENERATED_DIR, modular_headers: true
end
