import clsx from 'clsx';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect, useState } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import useTranslation from '../../../hook/useTranslation';
import MoonIcon from '../../../icons/MoonIcon';
import SunIcon from '../../../icons/SunIcon';
import XIcon from '../../../icons/XIcon';
import { themeCookiesNames } from '../../../theme';
import Button from '../../Button';
import Switch from '../../Switch';
import ColorPalette from './ColorPalette';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import { ThemeBoxWrapper } from './styles';


type InputColor = {
  palette: keyof DefaultTheme['colors'];
  type: string;
  value: string;
};

export default function ThemeBox() {
  const { t, toggleLocale, locale } = useTranslation({ en, pt });
  const { controls, ...theme } = useTheme();
  const { activeColorsPreset, toggleTheme, updateColors } = controls;
  
  const [inputColor, setInputColor] = useState<InputColor | null>(null);
  const [hasThemeChanges, setHasThemeChanges] = useState(false);

  const [isCustomizing, setIsCustomizing] = useState(false);
  const isLightTheme = theme.mode === 'light';

  const handleColorChange = (
    palette: keyof DefaultTheme['colors'], type: string, value: string
  ) => {
    setInputColor({
      palette,
      type,
      value,
    });
  };

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

  const toggleCustomization = () => {
    setIsCustomizing(!isCustomizing);
  };

  const handleResetTheme = () => {
    setInputColor(null);
    activeColorsPreset(theme.mode);
    destroyCookie(null, themeCookiesNames[theme.mode], {
      path: '/'
    });
  };

  const handleSaveTheme = () => {
    setHasThemeChanges(false);
    setCookie(null, themeCookiesNames[theme.mode], JSON.stringify(theme.colors), {
      path: '/',
      maxAge: 60*60*24*7,
    });
  };

  return (
    <ThemeBoxWrapper>
      <div className="dark-light-toggle">
        <Button
          aria-label={t('options.languageBtn')}
          className="language-toggle"
          onClick={toggleLocale}
          variant="textOnly"
        >
          {locale}
        </Button>
        <Switch
          aria-label={t('options.themeSwitch')}
          stateOneIcon={<SunIcon />}
          stateTwoIcon={<MoonIcon />}
          currentState={isLightTheme}
          onClick={toggleTheme}
        />
        <Button
          aria-label={t('options.plusBtn')}
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
        <p>{t('options.customColor.description')}</p>
        <div className="color-palette-label">
          <span>{t('options.customColor.paletteLabel.name')}</span>
          <span>{t('options.customColor.paletteLabel.inputs')}</span>
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
            {t('options.customColor.resetBtn')}
          </Button>
          <Button
            variant="textOnly"
            onClick={handleSaveTheme}
            disabled={!hasThemeChanges}
          >
            {t('options.customColor.saveBtn')}
          </Button>
        </div>
      </div>
    </ThemeBoxWrapper>
  );
}