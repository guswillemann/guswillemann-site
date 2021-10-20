import { DefaultTheme, useTheme } from 'styled-components';
import { colorNameDict } from '../../../../theme/colorNamesDict';
import ColorInput from '../../../ColorInput';
import { ColorPaletteWrapper } from './styles';

type ColorPaletteProps = {
  paletteName: keyof DefaultTheme['colors'];
  onChangeCallback: any;
}

export default function ColorPalette({ paletteName, onChangeCallback }: ColorPaletteProps) {
  const { colors } = useTheme();

  const language = 'ptBr';

  return (
    <ColorPaletteWrapper>
      <span>{colorNameDict[language][paletteName]}</span>
      <ColorInput
        name={colorNameDict[language][paletteName]}
        value={colors[paletteName].color}
        onChange={(e) => onChangeCallback(paletteName, 'color', e.target.value)}
      />
      <ColorInput
        name={`contraste para ${colorNameDict[language][paletteName]}`}
        value={colors[paletteName].contrast}
        onChange={(e) => onChangeCallback(paletteName, 'contrast', e.target.value)}
      />
    </ColorPaletteWrapper>
  );
}