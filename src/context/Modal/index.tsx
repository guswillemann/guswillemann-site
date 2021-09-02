import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

type ModalContextValue = {
  activeModal: (modalVariant: ReactNode, escapeFocus: string) => void;
  closeModal: (isEscapeFocus?: boolean) => void;
  endModal: () => void;
  isVisible: boolean;
};

export const ModalContext = createContext({} as ModalContextValue);

const ModalContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  position: fixed;
  inset: 0;
  z-index: 1000;

  background-color: rgba(0,0,0,0.8);
  opacity: 0;
  pointer-events: none;

  transition: opacity 300ms ease-in-out;
  
  &.visible {
    opacity: 1;
    pointer-events: initial;
  }
`;

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalContent, setModalContext] = useState(null as ReactNode);
  const [isVisible, setIsVisible] = useState(false);
  const escapeCloseFocus= useRef<string>();

  useEffect(() => {
    function escapeCloseModal (e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal(true);
    }

    if (isVisible) document.addEventListener('keydown', escapeCloseModal);
    return () => document.removeEventListener('keydown', escapeCloseModal);
  }, [isVisible, escapeCloseFocus.current])

  function activeModal(modalVariant: ReactNode, escapeFocus: string) {
    setModalContext(modalVariant);
    escapeCloseFocus.current = escapeFocus;
    setIsVisible(true);
  }

  function closeModal(isEscapeFocus?: boolean) {
    if (isEscapeFocus) {
      const escapeFocusEl = document.querySelector(`[data-tab-trap-escape=${escapeCloseFocus.current}]`) as HTMLButtonElement;
      escapeFocusEl.focus();
    }
    setIsVisible(false);
  }

  function endModal() {
    setModalContext(null);
    closeModal(true);
  }

  return (
    <ModalContext.Provider value={{
      activeModal,
      closeModal,
      endModal,
      isVisible,
    }}>
      {children}
      <ModalContainer
        id="modal-container"
        onClick={(e: any) => {if (e.target.id === "modal-container") closeModal()}}
        className={isVisible ? 'visible' : ''}
      >
        {modalContent}
      </ModalContainer>
    </ModalContext.Provider>
  );
}

export default function useModal() {
  return useContext(ModalContext);
}