import React from 'react';
import type {Node} from 'react';
import {StaticServerProvider} from './src/context/static-server';
import {PolicyProvider} from './src/context/policy';
import Navigation from './src/navigation';

const App: () => Node = () => (
  <StaticServerProvider>
    <PolicyProvider>
      <Navigation />
    </PolicyProvider>
  </StaticServerProvider>
);

export default App;
