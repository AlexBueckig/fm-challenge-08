import * as React from 'react';
import { URL } from '../hooks/useURL';

interface Props {
  url: URL;
}

const URLCard: React.FC<Props> = ({ url }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    if (inputRef) {
      inputRef.current.disabled = false;
      inputRef.current.select();
      const copy = document.execCommand('copy', true);
      inputRef.current.selectionEnd = 0;
      inputRef.current.disabled = true;
      setCopied(copy);
    }
  };

  return (
    <div className="urlCard">
      <p className="urlCard__url">{url.url}</p>
      <input className="urlCard__short" ref={inputRef} defaultValue={url.shortenedUrl} disabled />
      <button
        onClick={copyToClipboard}
        className={`button button--url ${copied ? 'button--copied' : ''}`}
        aria-label="copy url to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default URLCard;
