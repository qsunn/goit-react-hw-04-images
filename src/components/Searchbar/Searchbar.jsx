import s from './Searchbar.module.css';

import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const changeHandler = e => setQuery(e.target.value);

  const submitHandler = e => {
    e.preventDefault();
    query.trim() ? onSubmit(query) : toast.error('Enter something to search');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={submitHandler}>
        <button type="submit" className={s['SearchForm-button']}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>

        <input
          onChange={changeHandler}
          className={s['SearchForm-input']}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
