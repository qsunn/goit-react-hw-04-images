import s from './Modal.module.css';

import { Component } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => e.code === 'Escape' && this.props.toggleModal();

  handleBackdropClick = e =>
    e.currentTarget === e.target && this.props.toggleModal();

  render() {
    const { children } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
