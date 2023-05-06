import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import ButtonShadow from '../../components/ui/button';
import OrientationLocker from 'react-native-orientation-locker';
import {WebView} from 'react-native-webview';
import {TERMS_AND_CONDITIONS_LINK} from '@env';

const Terms = ({navigation}) => {
  const webViewRef = useRef(null);
  const [isRead, setIsRead] = useState(false);

  const onScroll = event => {
    if (isRead) return;

    const {contentSize, contentInset, contentOffset, layoutMeasurement} =
      event.nativeEvent;
    const current = contentOffset.y + layoutMeasurement.height;
    const total = (contentSize.height - contentInset.bottom) * 0.95;
    const isScrolledToBottom = current >= total;

    if (isScrolledToBottom) setIsRead(true);
  };

  const onAccept = () => {
    navigation.navigate('Game');
  };

  useEffect(() => {
    OrientationLocker.lockToPortrait();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webview}>
        <WebView
          ref={webViewRef}
          onScroll={onScroll}
          originWhitelist={['*']}
          source={{uri: TERMS_AND_CONDITIONS_LINK}}
        />
      </View>
      <ButtonShadow
        title={'Accept'}
        containerStyle={styles.buttonContainer}
        onPress={onAccept}
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
