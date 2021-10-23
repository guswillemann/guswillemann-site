import clsx from 'clsx';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import useModal from '../../../context/Modal';
import useTranslation from '../../../hook/useTranslation';
import XIcon from '../../../icons/XIcon';
import Button from '../../Button';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import EmailModalWrapper from './styles';
import SuccessFeedBack, { animationDuration } from './SucessFeedBack';


const formStates = {
  default: 'default',
  sending: 'sending',
  success: 'success',
};

export default function EmailContactModal() {
  const { t } = useTranslation({ en, pt });
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
      <h3>{t('header')}</h3>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label htmlFor="contact-form-name">{t('form.name')}</label>
          <input
            name="name"
            data-tab-trap="start"
            id="contact-form-name"
            type="text"
            placeholder={t('form.name')}
            onChange={handleFormChange}
            value={formValues.name}
          />
        </div>
        <div className="label-input">
          <label htmlFor="contact-form-email">{t('form.emailLabel')}</label>
          <input
            name="email"
            id="contact-form-email"
            type="email"
            placeholder={t('form.emailPlaceholder')}
            onChange={handleFormChange}
            value={formValues.email}
          />
        </div>
        <div className="label-textarea">
          <label htmlFor="contact-form-message">{t('form.messageLabel')}</label>
          <textarea
            name="message"
            id="contact-form-message"
            placeholder={t('form.messagePlaceholder')}
            onChange={handleFormChange}
            value={formValues.message}
          />
        </div>
        <Button
          variant="submit"
          type="submit"
          disabled={!isValidForm || formState !== formStates.default}
        >
          {t('form.submitBtn')}
        </Button>
        {formState === formStates.default && error && <p className="error-message">{t('form.errorMessage')}</p>}
      </form>
      <Button
        variant="iconButton"
        onClick={() => closeModal(true)}
        data-tab-trap="end"
        aria-label={t('form.closeBtn')}
        className="close-btn"
      >
        <XIcon />
      </Button>
      {formState === formStates.success && <SuccessFeedBack />}
    </EmailModalWrapper>
  );
}
