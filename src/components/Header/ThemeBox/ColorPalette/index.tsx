import { DefaultTheme, useTheme } from 'styled-components';
import useTranslation from '../../../../hook/useTranslation';
import { colorNameDict } from '../../../../theme/colorNamesDict';
import ColorInput from '../../../ColorInput';
import { ColorPaletteWrapper } from './styles';

type ColorPaletteProps = {
  paletteName: keyof DefaultTheme['colors'];
  onChangeCallback: any;
}

export default function ColorPalette({ paletteName, onChangeCallback }: ColorPaletteProps) {
  const { colors } = useTheme();
  const { t } = useTranslation({
    en: {
      ...colorNameDict.en,
      colorInput: 'color',
      contrastInput: 'contrast for'
    },
    pt: {
      ...colorNameDict.pt,
      colorInput: 'cor',
      contrastInput: 'contraste para'
    },
  });

  return (
    <ColorPaletteWrapper>
      <span>{t(paletteName)}</span>
      <ColorInput
        name={`color${paletteName}`}
        aria-label={t('colorInput')}
        value={colors[paletteName].color}
        onChange={(e) => onChangeCallback(paletteName, 'color', e.target.value)}
      />
      <ColorInput
        name={`contrast${paletteName}`}
        aria-label={t('contrastInput')}
        value={colors[paletteName].contrast}
        onChange={(e) => onChangeCallback(paletteName, 'contrast', e.target.value)}
      />
    </ColorPaletteWrapper>
  );
}
