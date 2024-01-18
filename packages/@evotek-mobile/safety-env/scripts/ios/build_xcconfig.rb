#!/usr/bin/env ruby
# frozen_string_literal: true

require_relative './safety_env_generation_utils'

root_env_dir = ARGV[0]
output_dir = ARGV[1]

abort('Missing root env dir') if root_env_dir.nil?

dotenv = SafetyEnvGenerationUtils.new.read_dot_env_file!(root_env_dir)

xcconfig = <<~XCCONFIG
  \/\/ DO NOT EDIT, it was generated from the .env file
  #{dotenv.map { |key, value| "SAFETY_ENV_#{key}=#{value.gsub(%r{//}, '/$()/')}" }.join("\n")}
XCCONFIG

File.open(File.join(output_dir, 'SafetyEnvTemp.xcconfig'), 'w') do |file|
  file.write(xcconfig)
  file.fsync
end
