import React, {createContext, useEffect, useMemo, useState} from 'react';
import RNFS from 'react-native-fs';
import Server, {
  extractBundledAssets,
} from '@dr.pogodin/react-native-static-server';

export const StaticServerContext = createContext();
const fileDir = RNFS.DocumentDirectoryPath + '/webroot';

export const StaticServerProvider = ({children}) => {
  const [origin, setOrigin] = useState('');
  const value = useMemo(() => origin, [origin]);

  useEffect(() => {
    let server = new Server({fileDir, stopInBackground: true});

    (async () => {
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
    <StaticServerContext.Provider value={value}>
      {children}
    </StaticServerContext.Provider>
  );
};
