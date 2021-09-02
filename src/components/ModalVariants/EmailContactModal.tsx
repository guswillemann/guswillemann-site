import { FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import useModal from '../../context/Modal';
import XIcon from '../../icons/XIcon';
import Button from '../Button';

const EmailModalWrapper = styled.div`
  @keyframes grow {
    0% { transform: scale(0) };
    100% { transform: scale(1) };
  }
  
  @keyframes shrink {
    0% { transform: scale(1) };
    100% { transform: scale(0) };
  }

  position: relative;
  
  width: clamp(30%, 500px, 100%);
  padding: 2rem;

  justify-self: center;
  align-self: center;
  
  ${({ theme }) => ({
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.box,
    color: theme.colors.text,
    border: `2px solid ${theme.colors.primaryMain}`,
  })};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  
  animation: 300ms ease-in-out shrink;
  
  &.visible {
    animation: 300ms ease-in-out grow;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    width: 100%;
  }

  .label-input {
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 100%;

    ${({ theme }) => ({
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      borderRadius: theme.borderRadius,
    })};

    padding: 1rem;

    input {
      color: inherit;
      background-color: inherit;
      border: none;
      flex: 1;
      width: 1px;
      padding: 0.5rem;
    }
  }

  .label-textarea {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem;

    ${({ theme }) => ({
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      borderRadius: theme.borderRadius,
    })};

    textarea {
      color: inherit;
      background-color: inherit;
      border: none;
      resize: vertical;
      padding: 0.5rem;
      min-height: 15rem;
    }
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;

    width: 2rem;
    height: 2rem;
  }
`;

export default function EmailContactModal() {
  const { isVisible, closeModal, endModal } = useModal();
    
  useEffect(() => {
    function tabPressHandler(e: any) {
      if (e.key === 'Tab') {
        if (e.target.dataset['tabTrap'] === 'start' && e.shiftKey) {
          e.preventDefault();
          const lastTabTrapEl = document.querySelector('[data-tab-trap="end"]') as HTMLButtonElement;
          lastTabTrapEl?.focus();
        }
        if (e.target.dataset['tabTrap'] === 'end' && !e.shiftKey) {
          e.preventDefault();
          const firstTabTrapEl = document.querySelector('[data-tab-trap="start"]') as HTMLButtonElement;
          firstTabTrapEl?.focus();
        }
      }
    }

    if (isVisible) {
      document.getElementById('contact-form-name')?.focus();
      document.addEventListener('keydown', tabPressHandler);
    }

    return () => document.removeEventListener('keydown', tabPressHandler);
  }, [isVisible])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const nameInput = document.getElementById('contact-form-name') as HTMLInputElement;
    const emailInput = document.getElementById('contact-form-email') as HTMLInputElement;
    const messageTextArea = document.getElementById('contact-form-message') as HTMLTextAreaElement;

    console.log({
      name: nameInput.value,
      email: emailInput.value,
      message: messageTextArea.value,
    });
    endModal();
  }
  
  return (
    <EmailModalWrapper className={ isVisible ? 'visible' : ''}>
      <h3>Contato por e-mail</h3>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="contact-form-name">Nome</label>
          <input data-tab-trap="start" id="contact-form-name" type="text" placeholder="Nome" />
        </div>
        <div className="label-input">
          <label htmlFor="contact-form-email">E-mail</label>
          <input id="contact-form-email" type="email" placeholder="email@exemplo.com" />
        </div>
        <div className="label-textarea">
          <label htmlFor="contact-form-message">Mensagem</label>
          <textarea id="contact-form-message" placeholder="mensagem do e-mail" />
        </div>
        <Button
          variant="default"
          type="submit"
        >
          Enviar
        </Button>
      </form>
      <Button
        variant="iconButton"
        onClick={() => closeModal(true)}
        data-tab-trap="end"
        aria-label="fechar formulário de contato por e-mail"
        className="close-btn"
      >
        <XIcon />
      </Button>
    </EmailModalWrapper>
  );
}
