import s from './Searchbar.module.css';

import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  changeHandler = e => this.setState({ search: e.target.value });

  submitHandler = e => {
    e.preventDefault();
    const search = this.state.search;
    search.trim()
      ? this.props.onSubmit(search)
      : toast.error('Enter something to search');
  };

  render() {
    const { search } = this.state;
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.submitHandler}>
          <button type="submit" className={s['SearchForm-button']}>
            <span className={s['SearchForm-button-label']}>Search</span>
          </button>

          <input
            onChange={this.changeHandler}
            className={s['SearchForm-input']}
            type="text"
            value={search}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};