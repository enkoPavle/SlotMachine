import React, {useContext, useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import OrientationLocker from 'react-native-orientation-locker';
import backgroundImage from '../../../assets/webroot/images/shared-0-sheet0.png';
import {colors} from '../../utils/colors';
import {StaticServerContext} from '../../context/static-server';

const Game = () => {
  const origin = useContext(StaticServerContext);

  useEffect(() => {
    OrientationLocker.lockToLandscapeLeft();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={backgroundImage}
        resizeMethod="scale"
        resizeMode="contain"
        style={styles.background}
      />
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        cacheMode="LOAD_NO_CACHE"
        source={{
          uri: origin,
        }}
      />
    </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.black,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: -10,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});
