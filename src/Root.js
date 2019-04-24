import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import './Root.css'

import background from './assets/background.jpg'

import Navigation from './components/navigation/Navigation';
import Route from './components/navigation/Route'

export default () => {
  return (
    <MemoryRouter>
      <div className="root">
        <img src={background} alt="background" className="background-pic" />
        <div className="content">
          <Navigation />
          <Route />
        </div>
      </div>
    </MemoryRouter>
  );
}

