# @evotek-mobile/safety-env

Native JSI module for React Native to get environment variables safely.

* **@evotek-mobile/safety-env** is a JSI module for React Native to get environment variables safely.

## Features

* **Fully synchronous** - No need to wait for the environment variables to be loaded.
* **Safe** - No need to worry about the environment variables being exposed to the JavaScript layer.
* **Super fast** - It is native C++ code, so it is super fast.

## Installation

```sh
npm install @evotek-mobile/safety-env
```

or with **yarn**

```sh
yarn add @evotek-mobile/safety-env
```

### Extra steps for iOS

1. Open `ios/Podfile` and add the following line:

```ruby
...
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'
require_relative '../node_modules/@evotek-mobile/safety-env/scripts/ios/safety_env' # <-- Add this line

...
use_react_native!(
  ...
)

use_safety_env! # <-- Add this line after use_react_native!
```

2. Run `pod install` in the `ios` directory.

```sh
cd ios
pod install
```

## Usage

```ts
import safetyEnv from '@evotek-mobile/safety-env';

...

const TST = safetyEnv.getEnv('TST');
```

## Note

1. You must have .env file in the root directory of your project.

2. You can customize by use the environment variable `BUILD_ENV` to type the environment name.
For example, if you want to use the `.env.staging` file, you can set the `BUILD_ENV` to `staging`,

```sh
BUILD_ENV=staging react-native run-ios
```

or

```sh
BUILD_ENV=staging react-native run-android
```

3. If you want to export the environment variable from the `.env` file to the Gradle build, you can add the following line to the `android/app/build.gradle` file.

```gradle
apply plugin: "com.android.application"
apply from: project(':react-native-safety-env').projectDir.getPath() + "/safety_env.gradle" // <-- Add this line
...
```

Now you can use the environment variable in the `android/app/build.gradle` file by using the `${SAFETY_ENV_<enviroment name>` syntax. Example:

```gradle
...
defaultConfig {
    ...
    manifestPlaceholders = [
        SAFETY_ENV_TST: "${SAFETY_ENV_TST}",
        SAFETY_ENV_PRD: "${SAFETY_ENV_PRD}",
    ]
}
...
```

4. If you want to export the environment variable from the `.env` file to the Xcode build, you can do the following.

* Open xcworkspace file in Xcode.
* Select the project in the left panel.
* Right click on the project and select `New File...`.
* Search for `Configuration File` and select `Configuration Config File`.
* Name the file `Config.xcconfig`.
* Add the following line to the `Config.xcconfig` file.

```xccconfig
...
#include? "SafetyEnvTemp.xcconfig"
...
```

* Choose `Product > Scheme > Edit Scheme...` in the menu bar.
* Expand the `Build` section.
* Click the `+` button in the `Pre-actions` section.
* Select `New Run Script Action`.
* Add the following line to the `Shell` field.

```sh
"${SRCROOT}/../node_modules/@evotek-mobile/safety-env/scripts/ios/build_xcconfig.rb" "${SRCROOT}/.." "${SRCROOT}"
```

* Click the `Done` button.
* Open `.gitignore` file and add the following line.

```ignore
...
# SafetyEnvTemp.xcconfig
ios/SafetyEnvTemp.xcconfig
...
```

Now you can use the environment variable in the Xcode build by using the `$(SAFETY_ENV_<environment name>)` syntax.

## Limitations

As the library is using JSI, it is not possible to use remote debugging like Chrome DevTools. You can use [Flipper](https://fbflipper.com/) instead or use terminal to debug.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
