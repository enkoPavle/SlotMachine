import React, {createContext, useEffect, useMemo, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import {SETTINGS_LINK, API_TOKEN} from '@env';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAgreeButtonShow, setIsAgreeButtonShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {isConnected} = useNetInfo();

  const setIsTermsAgreed = () => setIsAgreed(true);

  const getData = () => {
    setIsLoading(true);

    fetch(SETTINGS_LINK, {
      headers: {
        Authorization: 'Bearer ' + API_TOKEN,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setIsAgreeButtonShow(data.show_button);
          setIsLoaded(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const value = useMemo(() => {
    let visibleView;

    if (isLoading) visibleView = 'terms';
    else if (!isLoaded || (isLoaded && isAgreed)) visibleView = 'game';
    else visibleView = 'terms';

    return {
      visibleView,
      isAgreeButtonShow,
      setIsTermsAgreed,
    };
  }, [isLoading, isLoaded, isAgreeButtonShow, isAgreed]);

  useEffect(() => {
    if (!isLoading) SplashScreen.hide();
  }, [isLoading]);

  useEffect(() => {
    if (isLoaded) return;
    else getData();
  }, [isConnected]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
