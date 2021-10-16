import styled from 'styled-components';
import useModal from '../../context/Modal';
import GitHubIcon from '../../icons/GitHubIcon';
import LetterIcon from '../../icons/LetterIcon';
import LinkedinIcon from '../../icons/LinkedinIcon';
import Box from '../Box';
import Button from '../Button';
import Link from '../Link';
import Logo from '../Logo';
import EmailContactModal from '../ModalVariants/EmailContactModal';
import ThemePicker from '../ThemePicker';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .logo-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    p {
      margin-top: 1rem;
      font-size: 2rem;
    }
  }

  .nav-box {
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      text-align: center;
    }
  }

  .social-links {
    ul {
      list-style: none;
      display: flex;
      gap: 2rem;
      justify-content: center;
      align-items: center;
    }  

    li {
      border-radius: ${({ theme }) => theme.borderRadius};

      width: 3.5rem;
      height: 3.5rem;
    }
  }
`;

export default function HeaderBar() {
  const { activeModal } = useModal();

  function handleOpenEmail() {
    activeModal(<EmailContactModal />, 'contactForm');
  }

  return (
    <Header>
      <Box className="logo-box">
        <Logo />
        <p>Gustavo Willemann</p>
      </Box>
      <Box className="social-links">
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
      </Box>
      <Box className="theme-box">
        <ThemePicker />
      </Box>
      <Box as="nav" className="nav-box">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/artigos/">Artigos</Link>
          </li>
          <li>
            <Link href="/projetos/">Projetos</Link>
          </li>
        </ul>
      </Box>
    </Header>
  );
}