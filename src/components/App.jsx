import 'react-toastify/dist/ReactToastify.css';

import { PureComponent } from 'react';
import { ToastContainer } from 'react-toastify';

import { getData } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { NothingFound } from './NothingFound/NothingFound';

export class App extends PureComponent {
  state = {
    images: [],
    page: 1,
    search: '',
    status: 'idle',
    error: '',
    showButton: false,
    modalImageUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;

    if (prevState.page !== page && page !== 1) {
      getData(search, page).then(data => {
        this.setState({ images: [...prevState.images, ...data.hits] });
        page >= data.pages && this.toggleButton();
      });
    }

    if (prevState.search !== search) {
      this.reset();
      this.setState({ status: 'pending' });
      getData(search)
        .then(data => {
          return data.hits?.length
            ? data
            : Promise.reject(
                new Error(`Nothing to found for "${search}" search`)
              );
        })
        .then(data => {
          this.setState({ images: data.hits, status: 'resolved' });
          this.state.page < data.pages && this.toggleButton();
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
  }

  onSubmit = search => this.setState({ search: search });

  loadMoreHandler = () => this.setState({ page: this.state.page + 1 });

  toggleButton = () => this.setState({ showButton: !this.state.showButton });

  toggleLoader = () => this.setState({ status: 'pending' });

  toggleModal = (url = '') => this.setState({ modalImageUrl: url });

  reset = () => this.setState({ page: 1, showButton: false });

  render() {
    const { images, search, status, error, showButton, modalImageUrl } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />

        {status === 'resolved' && (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {status === 'rejected' && <NothingFound message={error} />}

        {status === 'pending' && <Loader />}

        {showButton && <Button loadMoreHandler={this.loadMoreHandler} />}

        {modalImageUrl && (
          <Modal toggleModal={this.toggleModal}>
            <img src={modalImageUrl} alt={search} />
          </Modal>
        )}

        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    );
  }
}
