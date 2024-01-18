import React, {Fragment, useEffect, useReducer} from 'react';
import {I18nextProvider, useTranslation} from 'react-i18next';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {LANGUAGE, appAction} from './redux/appSlice';
import {AppState} from './context/appState';
import store, {persistor} from './redux';
import {AppContext, appReducer, initialState} from './context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import i18next from './language';

export interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  //state
  const {t, i18n} = useTranslation();
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const storedLang = store.getState().app.language;

  //func
  const changeLanguage = languageCode => {
    store.dispatch(appAction.updateLanguage(languageCode));
    i18n.changeLanguage(languageCode);
  };

  const changeAppTheme = mode => dispatch({type: 'CHANGE_MODE', data: mode});

  const value: AppState = {
    t,
    changeLanguage,
    appTheme: appState.colorMode,
    changeAppTheme,
    selectedLanguage: i18n.language,
  };

  //effect
  useEffect(() => {
    if (storedLang) {
      i18n.changeLanguage(storedLang);
    } else {
      i18n.changeLanguage(LANGUAGE.EN);
    }
  }, [i18n, storedLang]);

  //render
  return (
    <AppContext.Provider value={value}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider
            initialMetrics={initialWindowMetrics}
            style={styles.safeAreaProvider}>
            <Fragment>
              <GestureHandlerRootView style={styles.container}>
                <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
              </GestureHandlerRootView>
            </Fragment>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaProvider: {
    backgroundColor: 'transparent',
  },
});

export default AppProvider;
