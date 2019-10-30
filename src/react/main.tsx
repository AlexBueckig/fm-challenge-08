import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { URLProvider } from './hooks/useURL';

ReactDOM.render(
  <URLProvider>
    <App />
  </URLProvider>,
  document.getElementById('react-root')
);
