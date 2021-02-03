import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import Store from 'electron-store';

export const db = new Store();

ReactDOM.render(<App />, document.getElementById('root'));