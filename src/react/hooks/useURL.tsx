import * as React from 'react';

export interface URL {
  url: string;
  shortenedUrl: string;
}

interface State {
  urls: URL[];
  addUrl: (url: URL) => void;
}

const URLContext = React.createContext<State>({ urls: [], addUrl: () => {} });

const useURL = () => React.useContext(URLContext);

const URLProvider: React.FC = props => {
  const [urlList, setUrlList] = React.useState<URL[]>([]);

  const addUrl = (url: URL) => {
    localStorage.setItem('shortenedUrls', JSON.stringify([...urlList, url]));
    setUrlList([...urlList, url]);
  };

  React.useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls'));
    setUrlList(savedUrls || []);
  }, []);

  return <URLContext.Provider value={{ urls: urlList, addUrl }}>{props.children}</URLContext.Provider>;
};

export { useURL, URLProvider };
