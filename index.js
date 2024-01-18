/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {startNetworkLogging} from 'react-native-network-logger';
import App from './src/app/App';

startNetworkLogging();
AppRegistry.registerComponent(appName, () => App);
