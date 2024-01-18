const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [path.resolve('./')],
        alias: {
          '@root': './src',
          '@app': './src/app',
          '@assets': './src/presentation/assets',
          '@components': './src/presentation/components',
          '@features': './src/presentation/features',
          '@navigation': './src/presentation/navigation',
          '@services': './src/data/services',
        },
      },
    ],
  ],
};
