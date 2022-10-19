import s from './ImageGalleryItem.module.css';
import { PropTypes } from 'prop-types';

export const ImageGalleryItem = ({ src, toggleModal }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={toggleModal}>
      <img src={src} alt="img" className={s['ImageGalleryItem-image']} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
