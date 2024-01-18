import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useAppColors} from '../../../app/hooks';
import {reset} from '../../navigation/helper';
import {SCREENS_NAME} from '../../navigation/routing';

const SplashScreen = () => {
  //state
  const colors = useAppColors();

  //func
  const init = useCallback(async () => {
    const [timer] = await Promise.all([
      setTimeout(() => {
        reset(SCREENS_NAME.LOGIN_SCREEN);
        Promise.resolve();
      }, 3000),
    ]);

    return () => clearTimeout(timer);
  }, []);

  //effect
  useEffect(() => {
    init();
  }, [init]);

  //render
  return (
    <View style={[styles.container]}>
      <ActivityIndicator color={colors.bluePrimary} size={48} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
});

export default SplashScreen;
