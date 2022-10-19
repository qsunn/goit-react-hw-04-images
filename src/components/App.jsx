import 'react-toastify/dist/ReactToastify.css';

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { getData } from '../services/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { NothingFound } from './NothingFound/NothingFound';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  useEffect(() => {
    if (query) {
      setStatus(STATUS.PENDING);
      getData(query)
        .then(data => {
          return data.hits?.length
            ? data
            : Promise.reject(
                new Error(`Nothing to found for "${query}" search`)
              );
        })
        .then(data => {
          setImages(data.hits);
          setLastPage(data.lastPage);
          setStatus(STATUS.RESOLVED);
        })
        .catch(error => {
          setError(error.message);
          setStatus(STATUS.REJECTED);
        });
    }
  }, [query]);

  useEffect(() => {
    if (page !== 1) {
      getData(query, page).then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setLastPage(data.lastPage);
      });
    }
  }, [page, query]);

  useEffect(() => {
    if (lastPage !== 1) {
      page >= lastPage ? setShowButton(false) : setShowButton(true);
    }
  }, [lastPage, page]);

  const reset = () => {
    setPage(1);
    setLastPage(1);
    setShowButton(false);
  };

  const toggleModal = (url = '') => setModalImageUrl(url);

  const loadMoreHandler = () => setPage(p => p + 1);

  const onSubmit = query => {
    reset();
    setQuery(query);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />

      {status === 'resolved' && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {status === 'rejected' && <NothingFound message={error} />}

      {status === 'pending' && <Loader />}

      {showButton && <Button loadMoreHandler={loadMoreHandler} />}

      {modalImageUrl && (
        <Modal
          modalImageUrl={modalImageUrl}
          toggleModal={toggleModal}
          query={query}
        />
      )}

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};
