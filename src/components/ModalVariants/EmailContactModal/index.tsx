import clsx from 'clsx';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import useModal from '../../../context/Modal';
import XIcon from '../../../icons/XIcon';
import Button from '../../Button';
import SuccessFeedBack, { animationDuration } from './SucessFeedBack';

const EmailModalWrapper = styled.div`
  @keyframes grow {
    0% { transform: scale(0.65) };
    100% { transform: scale(1) };
  }
  
  @keyframes shrink {
    0% { transform: scale(1) };
    100% { transform: scale(0.65) };
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

  &.success {
    transition: transform ${animationDuration * (1/4)}ms ease-in-out;
    transition-delay: ${animationDuration * (3/4)}ms;
    transform: scale(0);
  }

  .error-message  {
    color: ${({ theme }) => theme.colors.error};
    text-align: center;
  }
`;

const formStates = {
  default: 'default',
  sending: 'sending',
  success: 'success',
}

export default function EmailContactModal() {
  const { isVisible, closeModal, endModal } = useModal();
  const [formState, setFormState] = useState(formStates.default);
  const [error, setError] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  })

  const isValidForm = Boolean(formValues.name && formValues.email && formValues.message)

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

  function handleFormChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormValues((old) => ({
      ...old,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState(formStates.sending);

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues),
    }).then((res) => {
      if (res.status === 200) {
        setFormState(formStates.success);
        return;
      }

      throw new Error('Failed to send the e-mail');
    }).catch(() => {
      console.log('catch')
      setFormState(formStates.default);
      setError(true)
    });
  }

  useEffect(() => {
    if(formState !== 'success') return

    const endModalTimeout = setTimeout(endModal, animationDuration) //end modal after success animation

    return () => clearTimeout(endModalTimeout)
  }, [formState])
  
  return (
    <EmailModalWrapper className={clsx({
      visible: isVisible,
      success: formState === formStates.success,
    })}>
      <h3>Contato por e-mail</h3>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="contact-form-name">Nome</label>
          <input
            name="name"
            data-tab-trap="start"
            id="contact-form-name"
            type="text"
            placeholder="Nome"
            onChange={handleFormChange}
            value={formValues.name}
          />
        </div>
        <div className="label-input">
          <label htmlFor="contact-form-email">E-mail</label>
          <input
            name="email"
            id="contact-form-email"
            type="email"
            placeholder="email@exemplo.com"
            onChange={handleFormChange}
            value={formValues.email}
          />
        </div>
        <div className="label-textarea">
          <label htmlFor="contact-form-message">Mensagem</label>
          <textarea
            name="message"
            id="contact-form-message"
            placeholder="mensagem do e-mail"
            onChange={handleFormChange}
            value={formValues.message}
          />
        </div>
        <Button
          variant="submit"
          type="submit"
          disabled={!isValidForm || formState !== formStates.default}
        >
          Enviar
        </Button>
        {formState === formStates.default && error && <p className="error-message">Falha no envio do e-mail</p>}
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
      {formState === formStates.success && <SuccessFeedBack />}
    </EmailModalWrapper>
  );
}
