import React from 'react';
import { MemoryRouter } from 'react-router-dom'

import Navigation from './components/navigation/Navigation';
import Route from './components/navigation/Route'

function App() {
  return (
    <MemoryRouter >
      <div className="App" >
        <Navigation />
        <Route />
      </div>
    </MemoryRouter>
  );
}

export default App;
