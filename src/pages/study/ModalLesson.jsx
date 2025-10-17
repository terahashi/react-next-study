////ModalLessonは「開く／閉じるのスイッチ係」
import { useState } from 'react';
import { createPortal } from 'react-dom';

import Modal from '../../components/study/Modal';

const ModalLesson = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <button onClick={openModal}>モーダルを開く</button>

      {modalOpen && createPortal(<Modal onClose={closeModal} />, document.body)}
    </>
  );
};

export default ModalLesson;
