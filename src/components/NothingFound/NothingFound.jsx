import s from './NothingFound.module.css';

import { PropTypes } from 'prop-types';

export const NothingFound = ({ message }) => {
  return (
    <div className={s.NothingFound}>
      <p>{message}</p>
    </div>
  );
};

NothingFound.propTypes = { message: PropTypes.string.isRequired };
