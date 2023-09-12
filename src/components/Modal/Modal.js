import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { ModalWrapper, ModalContent } from './Modal.styles';

function MyModal({ isOpen, onClose, imageURL }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setModalIsOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          border: 'none',
          background: 'none',
          padding: 0,
        },
      }}
    >
      <ModalWrapper>
        <ModalContent>
          <img src={imageURL} alt=""/>
          <button onClick={closeModal}>Закрыть</button>
        </ModalContent>
      </ModalWrapper>
    </Modal>
  );
}

export default MyModal;
