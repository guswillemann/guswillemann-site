import useModal from '../../../context/Modal';
import GitHubIcon from '../../../icons/GitHubIcon';
import LetterIcon from '../../../icons/LetterIcon';
import LinkedinIcon from '../../../icons/LinkedinIcon';
import Button from '../../Button';
import EmailContactModal from '../../ModalVariants/EmailContactModal';
import { SocialBoxWrapper } from './styles';

export default function SocialBox() {
  const { activeModal } = useModal();

  function handleOpenEmail() {
    activeModal(<EmailContactModal />, 'contactForm');
  }

  return (
    <SocialBoxWrapper>
      <ul>
        <li>
          <Button
            asAnchor
            href="https://github.com/guswillemann"
            variant="iconButton"
            aria-label="link para o github"
          >
            <GitHubIcon />
          </Button>
        </li>
        <li>
          <Button
            asAnchor
            href="https://www.linkedin.com/in/gustavo-willemann"
            variant="iconButton"
            aria-label="link para o linkedin"
          >
            <LinkedinIcon />
          </Button>
        </li>
        <li>
          <Button
            variant="iconButton"
            onClick={handleOpenEmail}
            aria-label="abrir formulário de contato por e-mail"
            data-tab-trap-escape="contactForm"
          >
            <LetterIcon />
          </Button>
        </li>
      </ul>
    </SocialBoxWrapper>
  );
}