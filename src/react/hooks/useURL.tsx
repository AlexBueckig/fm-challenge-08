import * as React from 'react';

export interface URL {
  url: string;
  shortenedUrl: string;
}

interface State {
  urls: URL[];
  addUrl: (url: string) => void;
}

const URLContext = React.createContext<State>({ urls: [], addUrl: () => {} });

const useURL = () => {
  const context = React.useContext(URLContext);

  if (!context) throw new Error('Component needs to be wrapped inside URLProvider...');

  return context;
};

const getShortenedURL = async (url: string) => {
  const res = await fetch('https://rel.ink/api/links/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  if (res.status === 500) throw Error('server unreachable');
  const json = await res.json();
  return json;
};

const URLProvider: React.FC = props => {
  const [urlList, setUrlList] = React.useState<URL[]>([]);

  const addUrl = async (url: string) => {
    const shortenedUrl = await getShortenedURL(url);
    localStorage.setItem('shortenedUrls', JSON.stringify([...urlList, { url, shortenedUrl }]));
    setUrlList([...urlList, { url, shortenedUrl }]);
  };

  React.useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls'));
    setUrlList(savedUrls || []);
  }, []);

  return <URLContext.Provider value={{ urls: urlList, addUrl }}>{props.children}</URLContext.Provider>;
};

export { useURL, URLProvider };
