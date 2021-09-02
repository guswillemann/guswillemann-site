import { InputHTMLAttributes, useEffect, useState } from 'react';
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

  .theme-box {
    .theme-palette {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    p {
      margin-bottom: 1rem;
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
      gap: 1rem;
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

const ThemeColorInputWrapper = styled.div<{ selectedColor: string }>`
  display: inline-block;
  background-color: ${({ selectedColor }) => selectedColor};
  border: none;
  width: 3rem;
  height: 3rem;

  border: 2px ridge white;
  
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
`;

type ThemeColorInputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
}

function ThemeColorInput(props: ThemeColorInputProps) {
  return (
    <ThemeColorInputWrapper selectedColor={props.value}>
      <input aria-label={`Selecione a cor do ${props.name}`} {...props} />
    </ThemeColorInputWrapper>
  );
}

export default function HeaderBar({ theme, updateColor }: any) {
  const { activeModal } = useModal();

  const [inputColors, setInputColors] = useState(theme.colors);

  function handleColorChange(color: string, value: string) {
    setInputColors({
      ...inputColors,
      [color]: value,
    })
  }

  function handleOpenEmail() {
    activeModal(<EmailContactModal />, 'contactForm');
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => updateColor(inputColors), 200);
    return () => clearTimeout(timeoutId);
  }, [inputColors]);

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
        <p>Tema</p>
        <div className="theme-palette">
          <ThemeColorInput
            name="background"
            type="color"
            value={theme.colors.background}
            onChange={(e) => handleColorChange('background', e.target.value)}
          />
          <ThemeColorInput
            name="box"
            type="color"
            value={theme.colors.box}
            onChange={(e) => handleColorChange('box', e.target.value)}
          />
          <ThemeColorInput
            name="text"
            type="color"
            value={theme.colors.text}
            onChange={(e) => handleColorChange('text', e.target.value)}
          />
          <ThemeColorInput
            name="primaryMain"
            type="color"
            value={theme.colors.primaryMain}
            onChange={(e) => handleColorChange('primaryMain', e.target.value)}
          />
          <ThemeColorInput
            name="primaryDetails"
            type="color"
            value={theme.colors.primaryDetails}
            onChange={(e) => handleColorChange('primaryDetails', e.target.value)}
          />
        </div>
      </Box>
      <Box className="nav-box">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/sobre/">Sobre</Link>
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