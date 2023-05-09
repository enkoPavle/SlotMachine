import React, {useContext, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ButtonShadow from '../../components/ui/button';
import OrientationLocker from 'react-native-orientation-locker';
import {WebView} from 'react-native-webview';
import {COSMOLOT_LINK} from '@env';
import {PolicyContext} from '../../context/policy';

const Terms = () => {
  const webViewRef = useRef(null);
  const [isRead, setIsRead] = useState(false);
  const {setIsAgree} = useContext(PolicyContext);

  const onScroll = event => {
    if (isRead) return;

    const {contentSize, contentInset, contentOffset, layoutMeasurement} =
      event.nativeEvent;
    const current = contentOffset.y + layoutMeasurement.height;
    const total = (contentSize.height - contentInset.bottom) * 0.95;
    const isScrolledToBottom = current >= total;

    if (isScrolledToBottom) setIsRead(true);
  };

  useEffect(() => {
    OrientationLocker.lockToPortrait();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webview}>
        <WebView
          ref={webViewRef}
          onScroll={onScroll}
          originWhitelist={['*']}
          source={{uri: COSMOLOT_LINK}}
        />
      </View>
      <ButtonShadow
        title={'Accept'}
        containerStyle={styles.buttonContainer}
        onPress={setIsAgree}
        disabled={!isRead}
      />
    </SafeAreaView>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
  },
});
