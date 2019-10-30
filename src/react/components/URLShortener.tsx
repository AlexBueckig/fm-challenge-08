import * as React from 'react';
import { useURL } from '../hooks/useURL';

var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
var regex = new RegExp(expression);

const URLShortener: React.FC = () => {
  const [error, setError] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { addUrl } = useURL();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (inputRef.current.value.match(regex)) {
      setError(false);
      const res = await fetch('https://rel.ink/api/links/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: inputRef.current.value })
      });
      if (res.status === 500) throw Error('server unreachable');
      const json = await res.json();
      addUrl({ url: json.url, shortenedUrl: `https://rel.ink/${json.hashid}` });
    } else {
      console.log('url invalid...');
      setError(true);
    }
  };

  return (
    <form className={`shortener ${error ? 'shortener--error' : ''}`} onSubmit={onSubmit}>
      <label htmlFor="input-shortener" className="shortener__label">
        <input
          id="input-shortener"
          className="shortener__input"
          ref={inputRef}
          type="text"
          aria-label="url input"
          placeholder="Shorten a link here..."
        />
        <p className="shortener__error-text">Please add a valid link</p>
      </label>
      <button type="submit" className="button">
        Shorten It!
      </button>
    </form>
  );
};

export default URLShortener;
