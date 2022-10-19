import s from './ImageGalleryItem.module.css';

import { Component } from 'react';
import { PropTypes } from 'prop-types';

export class ImageGalleryItem extends Component {
  render() {
    const { src, toggleModal } = this.props;
    return (
      <li className={s.ImageGalleryItem} onClick={toggleModal}>
        <img src={src} alt="img" className={s['ImageGalleryItem-image']} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
