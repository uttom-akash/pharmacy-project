import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App style={{ 'padding': '0', 'margin': 0 }} />, document.getElementById('root'));
serviceWorker.unregister();
