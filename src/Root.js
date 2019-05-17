import React from 'react';
import { MemoryRouter, BrowserRouter, HashRouter } from 'react-router-dom'
import './Root.css'

import Navigation from './client/components/navigation/Navigation';
import Route from './client/components/navigation/Route'
import Footer from './client/components/unitComp/footer/Footer'
export default () => {
  return (
    <BrowserRouter>
      <div className="root">
        <Navigation />
        <div className="content">
        <Route />
        </div>
        <Footer />
        </div>
    </BrowserRouter>
  );
}

