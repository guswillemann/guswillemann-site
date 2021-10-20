import clsx from 'clsx';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import MoonIcon from '../../../icons/MoonIcon';
import SunIcon from '../../../icons/SunIcon';
import XIcon from '../../../icons/XIcon';
import { themeCookiesNames } from '../../../theme';
import Button from '../../Button';
import Switch from '../../Switch';
import ColorPalette from './ColorPalette';
import { ThemeBoxWrapper } from './styles';

type InputColor = {
  palette: keyof DefaultTheme['colors'];
  type: string;
  value: string;
};

export default function ThemeBox() {
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
    <ThemeBoxWrapper>
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
    </ThemeBoxWrapper>
  );
}