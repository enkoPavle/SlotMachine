import React from 'react';
import type {Node} from 'react';
import {PolicyProvider} from './src/context';
import Navigation from './src/navigation';

const App: () => Node = () => (
  <PolicyProvider>
    <Navigation />
  </PolicyProvider>
);

export default App;
