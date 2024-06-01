import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.unregister();
