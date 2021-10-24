import useModal from '../../../context/Modal';
import useTranslation from '../../../hook/useTranslation';
import GitHubIcon from '../../../icons/GitHubIcon';
import LetterIcon from '../../../icons/LetterIcon';
import LinkedinIcon from '../../../icons/LinkedinIcon';
import Button from '../../Button';
import Link from '../../Link';
import EmailContactModal from '../../ModalVariants/EmailContactModal';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import { SocialBoxWrapper } from './styles';


export default function SocialBox() {
  const { activeModal } = useModal();
  const { t } = useTranslation({ en, pt });

  function handleOpenEmail() {
    activeModal(<EmailContactModal />, 'contactForm');
  }

  return (
    <SocialBoxWrapper>
      <ul>
        <li>
          <Link
            href="https://github.com/guswillemann"
            aria-label={t('github')}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/in/gustavo-willemann"
            aria-label={t('linkedin')}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedinIcon />
          </Link>
        </li>
        <li>
          <Button
            variant="iconButton"
            onClick={handleOpenEmail}
            aria-label={t('mail')}
            data-tab-trap-escape="contactForm"
          >
            <LetterIcon />
          </Button>
        </li>
      </ul>
    </SocialBoxWrapper>
  );
}