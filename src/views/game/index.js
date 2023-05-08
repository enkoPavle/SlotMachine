import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import RNFS from 'react-native-fs';
import {WebView} from 'react-native-webview';
import OrientationLocker from 'react-native-orientation-locker';
import Server, {
  extractBundledAssets,
} from '@dr.pogodin/react-native-static-server';
import backgroundImage from '../../../assets/webroot/images/shared-0-sheet0.png';
import {colors} from '../../utils/colors';

const fileDir = RNFS.DocumentDirectoryPath + '/webroot';

const Game = ({navigation}) => {
  const [origin, setOrigin] = useState('');

  const start = async server => {
    const result = await server?.start();
    if (result && server) {
      setOrigin(result);
    }
  };

  useEffect(() => {
    OrientationLocker.lockToLandscapeLeft();
  }, [navigation]);

  useEffect(() => {
    let server = new Server({fileDir, stopInBackground: true});

    start(server);

    (async () => {
      if (Platform.OS === 'android') {
        let extract = true;
        try {
          const versionD = await RNFS.readFile(`${fileDir}/version.xml`);
          const versionA = await RNFS.readFileAssets('webroot/version.xml');

          if (versionA === versionD) {
            extract = false;
          } else {
            await RNFS.unlink(fileDir);
          }
        } catch {
          console.log('extract error');
        }
        if (extract) {
          await extractBundledAssets(fileDir, 'webroot');
        }
      }

      const result = await server?.start();
      if (result && server) {
        setOrigin(result);
      }
    })();

    return () => {
      (async () => {
        setOrigin('');
        server?.stop();
        server = null;
      })();
    };
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
        source={{uri: origin}}
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
