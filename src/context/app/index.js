import React, {createContext, useEffect, useMemo, useState} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import {SETTINGS_LINK, API_TOKEN} from '@env';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAgreeButtonShow, setIsAgreeButtonShow] = useState(false);
  const {isConnected} = useNetInfo();

  const setIsTermsAgreed = () => setIsAgreed(true);

  const value = useMemo(() => {
    let visibleView;

    if (!isLoaded || (isLoaded && isAgreed)) visibleView = 'game';
    else visibleView = 'terms';

    return {
      visibleView,
      isAgreed,
      isLoaded,
      isAgreeButtonShow,
      isConnected,
      setIsTermsAgreed,
    };
  }, [isConnected, isLoaded, isAgreeButtonShow, isAgreed]);

  useEffect(() => {
    if (!isConnected || isLoaded) return;

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
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [isConnected]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
