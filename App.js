import React from 'react';
import type {Node} from 'react';
import {StaticServerProvider} from './src/context/static-server';
import {AppProvider} from './src/context/app';
import Navigation from './src/navigation';

const App: () => Node = () => (
  <StaticServerProvider>
    <AppProvider>
      <Navigation />
    </AppProvider>
  </StaticServerProvider>
);

export default App;
