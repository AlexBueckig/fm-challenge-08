import * as React from 'react';
import UrlList from './UrlList';
import URLShortener from './URLShortener';

const App: React.FC = () => (
  <>
    <URLShortener />
    <UrlList />
  </>
);

export default App;
