import { useRef, useCallback } from 'react';

export default function useModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => {
    const modal = modalRef.current;
    if (modal && modal.showModal) {
      modal.showModal();
    }
  }, []);

  const closeModal = useCallback(() => {
    const modal = modalRef.current;
    if (modal && modal.close) {
      modal.close();
    }
  }, []);

  return { modalRef, openModal, closeModal };
}
