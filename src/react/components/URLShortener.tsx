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
    const url = inputRef.current.value;

    if (url.match(regex)) {
      setError(false);
      addUrl(url);
    } else {
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
        <span className="shortener__error-text">Please add a valid link</span>
      </label>
      <button type="submit" className="button">
        Shorten It!
      </button>
    </form>
  );
};

export default URLShortener;
