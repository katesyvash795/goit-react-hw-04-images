import React, { useState, useEffect } from 'react';
import { fetchImages } from './api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (query && page) {
        setLoader(true);
        try {
          const data = await fetchImages(query, page);
          const { hits, totalHits } = data;
          setImages((prevImages) => [...prevImages, ...hits]);
          setTotalHits(totalHits);
        } catch (error) {
          console.error(error);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearchInputChange = (query) => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageURL('');
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setShowModal(true);
    setSelectedImageURL(image.largeImageURL);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchInputChange} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loader && <Loader />}
      {images.length > 0 && images.length < totalHits && (
        <Button onClick={loadMoreImages} show={!isLoading} />
      )}
      {showModal && selectedImageURL && (
        <Modal isOpen={showModal} imageURL={selectedImageURL} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
