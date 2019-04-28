import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<Root />, document.getElementById('root'));
serviceWorker.unregister();
