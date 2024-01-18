import React from 'react';
import {StatusBar} from 'react-native';
import RootNavigation from '../presentation/navigation';
import AppProvider from './AppProvider';
import {TOOL_DEBUG_MODE} from './utils/constant';
import NetworkInspector from '../presentation/components/networkLogger';
import {
  GlobalAlert,
  GlobalModalPopup,
  LoadingOverlay,
} from '../presentation/components';
import FloatingActionButton from '../presentation/components/floatingButton';

const App = () => {
  //render
  return (
    <AppProvider>
      <StatusBar translucent barStyle={'dark-content'} />
      <RootNavigation />
      <NetworkInspector />
      <GlobalModalPopup />
      <GlobalAlert />
      <LoadingOverlay />
      {TOOL_DEBUG_MODE.trim() === 'ON' && <FloatingActionButton />}
    </AppProvider>
  );
};

export default App;
