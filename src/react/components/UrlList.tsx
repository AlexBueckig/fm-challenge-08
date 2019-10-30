import * as React from 'react';
import { useURL } from '../hooks/useURL';
import URLCard from './URLCard';

interface Props {}

const UrlList: React.FC<Props> = () => {
  const { urls } = useURL();
  return <>{urls && urls.map(url => <URLCard key={url.shortenedUrl} url={url} />)}</>;
};

export default UrlList;
