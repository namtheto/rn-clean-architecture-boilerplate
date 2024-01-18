require 'json'

class SafetyEnvGenerationUtils
  def initialize; end

  @@GENERATD_ENV_SOURCE = false

  def generate_podspec
    if @@GENERATD_ENV_SOURCE
      puts '[Safety Env] Skip generating podspec'
      return
    end

    package = JSON.parse(File.read(File.join(__dir__, '../../package.json')))

    # Generate the podspec
    podspec = {
      'name' => 'SafetyEnv-Generated',
      'version' => package['version'],
      'summary' => 'Temporary pod to generate the env file',
      'homepage' => package['homepage'],
      'license' => 'Unlicense',
      'authors' => package['author'],
      'source' => { git: '' },
      'header_mappings_dir' => './',
      'platforms' => { ios: '10.0' },
      'source_files' => '**/*.{h,mm,cpp}',
      'compiler_flags' => '-Wno-nullability-completeness -std=c++17',
      'dependencies': {}
    }

    podspec_dir = File.join($SAFETY_ENV_GENERATED_DIR, 'SafetyEnv-Generated.podspec.json')

    puts "[Safety Env] Generating podspec at #{podspec_dir}"

    # Write the podspec file
    File.open(podspec_dir, 'w') do |file|
      file.write(podspec.to_json)
      file.fsync
    end

    @@GENERATD_ENV_SOURCE = true
  end

  def read_dot_env_file!(rootPath)
    root = "#{rootPath}/.."
    defaultEnvFile = '.env'

    # Get the build env
    buildEnv = ENV['BUILD_ENV'] || nil

    defaultEnvFile = ".env.#{buildEnv}" unless buildEnv.nil?

    begin
      dotenv_patern = /^([A-Z0-9_]+)=(.*)$/
      path = File.expand_path(File.join(root, defaultEnvFile.to_s))

      puts "[Safety Env] Using env file: #{path}"

      abort("Missing #{defaultEnvFile} file at path: #{path}") unless File.exist?(path)

      File.read(path).split("\n").inject({}) do |h, line|
        match = line.match(dotenv_patern)

        next h if line.nil? || line.strip.empty?
        next h if line.match(/^\s*#/)

        abort("Invalid line in #{defaultEnvFile} file at path: #{path}: #{line}") if match.nil?

        key, value = match.captures

        value = value.to_s.gsub(/"/, '')
        key = key.to_s.sub(/SENSE_/, '')

        h.merge(key => value)
      end
    rescue StandardError => e
      abort("Error reading #{defaultEnvFile} file at path: #{path}: #{e}")
      {}
    end
  end
end
