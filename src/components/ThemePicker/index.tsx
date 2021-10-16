import clsx from 'clsx';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import MoonIcon from '../../icons/MoonIcon';
import SunIcon from '../../icons/SunIcon';
import XIcon from '../../icons/XIcon';
import { themeCookiesNames } from '../../theme';
import Button from '../Button';
import ColorInput from '../ColorInput';
import Switch from '../Switch';

type ColorPaletteProps = {
  paletteName: keyof DefaultTheme['colors'];
  onChangeCallback: any;
}

function ColorPalette({ paletteName, onChangeCallback }: ColorPaletteProps) {
  const { colors } = useTheme();

  const colorNameDict = {
    background: 'Background',
    box: 'Box',
    primary: 'Primária',
    secondary: 'Secundária',
    success: 'Sucesso',
    error: 'Erro',
  }

  return (
    <div className="color-palette">
      <span>{colorNameDict[paletteName]}</span>
      <ColorInput
        name={colorNameDict[paletteName]}
        value={colors[paletteName].color}
        onChange={(e) => onChangeCallback(paletteName, 'color', e.target.value)}
      />
      <ColorInput
        name={`contraste para ${colorNameDict[paletteName]}`}
        value={colors[paletteName].contrast}
        onChange={(e) => onChangeCallback(paletteName, 'contrast', e.target.value)}
      />
    </div>
  );
}

const ThemePickerWrapper = styled.div`
  .dark-light-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .plus-theme {
      width: 3rem;
      padding: 0.75rem;
      
      svg {
        transform: rotate(45deg);
      }
    }
  }
  
  .palettes-container {
    overflow: hidden;
    max-height: 0;
    transition: all 300ms ease-out;
    visibility: hidden;
    
    &.customizing {
      margin-top: 2rem;
      max-height: 33rem;
      visibility: initial;
    }
  }

  .color-palette-label {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .color-palette {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 3rem 3rem;
    margin-top: 0.5rem;
  }

  .customization-controls {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
`;

type InputColor = {
  palette: keyof DefaultTheme['colors'];
  type: string;
  value: string;
};

export default function ThemePicker() {
  const { controls, ...theme } = useTheme();
  const { activeColorsPreset, toggleTheme, updateColors } = controls;
  
  const [inputColor, setInputColor] = useState<InputColor | null>(null);
  const [hasThemeChanges, setHasThemeChanges] = useState(false);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const isLightTheme = theme.mode === 'light';

  function handleColorChange(palette: keyof DefaultTheme['colors'], type: string, value: string) {
    setInputColor({
      palette,
      type,
      value,
    });
  }

  useEffect(() => {
    if (!inputColor) return;

    const colorsPaletteObj = {
      ...theme.colors,
      [inputColor.palette]: {
        ...theme.colors[inputColor.palette],
        [inputColor.type]: inputColor.value,
      },
    };

    const timeoutCallback = () => {
      updateColors(colorsPaletteObj);
      setInputColor(null);
      setHasThemeChanges(true);
    }
    
    const timeoutId = setTimeout(timeoutCallback, 200);
    return () => clearTimeout(timeoutId);
  }, [theme, inputColor, setInputColor, setHasThemeChanges]);

  function toggleCustomization() {
    setIsCustomizing(!isCustomizing);
  }

  function handleResetTheme() {
    setInputColor(null);
    activeColorsPreset(theme.mode);
    destroyCookie(null, themeCookiesNames[theme.mode]);
  }

  function handleSaveTheme() {
    setHasThemeChanges(false);
    setCookie(null, themeCookiesNames[theme.mode], JSON.stringify(theme.colors));
  }

  return (
    <ThemePickerWrapper>
      <div className="dark-light-toggle">
        <span>Tema: </span>
        <Switch
          name="alternar modo do tema"
          stateOneIcon={<SunIcon />}
          stateTwoIcon={<MoonIcon />}
          currentState={isLightTheme}
          onClick={toggleTheme}
        />
        <Button
          className="plus-theme"
          variant="iconButton"
          onClick={toggleCustomization}
          toggleable={{ isActive: isCustomizing }}
        >
          <XIcon />
        </Button>
      </div>
      <div className={clsx({
        'palettes-container': true,
        'customizing': isCustomizing,
      })}>
        <p>Customize as cores do tema selecionado.</p>
        <div className="color-palette-label">
          <span>Nome</span>
          <span>Cor / Texto</span>
        </div>
        {Object.keys(theme.colors).map((color) => (
          <ColorPalette
            key={color}
            paletteName={color as keyof DefaultTheme['colors']}
            onChangeCallback={handleColorChange}
          />
        ))}
        <div className="customization-controls">
          <Button
            variant="textOnly"
            onClick={handleResetTheme}
          >
            Redefinir
          </Button>
          <Button
            variant="textOnly"
            onClick={handleSaveTheme}
            disabled={!hasThemeChanges}
          >
            Salvar
          </Button>
        </div>
      </div>
    </ThemePickerWrapper>
  );
}