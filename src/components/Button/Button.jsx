import s from './Button.module.css';

import { PropTypes } from 'prop-types';

export const Button = ({ loadMoreHandler }) => {
  return (
    <button type="button" className={s.Button} onClick={loadMoreHandler}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMoreHandler: PropTypes.func.isRequired,
};
