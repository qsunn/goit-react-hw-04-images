import s from './Modal.module.css';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

import { Loader } from 'components/Loader/Loader';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ modalImageUrl, toggleModal, query }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleKeydown = e => e.code === 'Escape' && toggleModal();
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [toggleModal]);

  const handleBackdropClick = e =>
    e.currentTarget === e.target && toggleModal();

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img
          src={modalImageUrl}
          alt={query}
          onLoad={() => setLoaded(true)}
          className={s[loaded ? 'loaded' : 'loading']}
        />
        {!loaded && <Loader />}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalImageUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
