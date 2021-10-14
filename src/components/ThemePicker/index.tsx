import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styled, { DefaultTheme, useTheme } from 'styled-components';
import MoonIcon from '../../icons/MoonIcon';
import SunIcon from '../../icons/SunIcon';
import XIcon from '../../icons/XIcon';
import Button from '../Button';
import ColorInput from '../ColorInput';

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

    div {
      display: grid;
      grid-template-columns: 3rem 3rem;

      button {
        width: 100%;
      }
    }

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
      max-height: 30rem;
      visibility: initial;
    }
  }

  .color-palette-label {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .color-palette {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 3rem 3rem;
    margin-top: 0.5rem;
  }
`;

type ThemePickerProps = {
  theme: DefaultTheme;
  updateColor: (newColors: DefaultTheme['colors']) => void;
  activeColorsPreset: (presetName: DefaultTheme['currentActive']) => void;
};

export default function ThemePicker({ theme, updateColor, activeColorsPreset }: ThemePickerProps) {
  const [inputColors, setInputColors] = useState(theme.colors);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const isDarkTheme = theme.currentActive === 'dark';
  const isLightTheme = theme.currentActive === 'light';

  function handleColorChange(palette: keyof DefaultTheme['colors'], type: string, value: string) {
    setInputColors({
      ...theme.colors,
      [palette]: {
        ...theme.colors[palette],
        [type]: value,
      },
    });
  }

  function toggleCustomization() {
    setIsCustomizing(!isCustomizing);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => updateColor(inputColors), 200);
    return () => clearTimeout(timeoutId);
  }, [inputColors]);

  return (
    <ThemePickerWrapper>
      <div className="dark-light-toggle">
        <span>Tema: </span>
        <div>
          <Button
            variant="iconButton"
            onClick={() => activeColorsPreset('light')}
            toggleable={{ isActive: isLightTheme, oneWay: true }}
          >
            <SunIcon />
          </Button>
          <Button
            variant="iconButton"
            onClick={() => activeColorsPreset('dark')}
            toggleable={{ isActive: isDarkTheme, oneWay: true }}
          >
            <MoonIcon />
          </Button>
        </div>
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
      </div>
    </ThemePickerWrapper>
  );
}