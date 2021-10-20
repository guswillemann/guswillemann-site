import { css, DefaultTheme, FlattenInterpolation, FlattenSimpleInterpolation, ThemeProps } from 'styled-components';

type CSSInterpolation = FlattenSimpleInterpolation | FlattenInterpolation<ThemeProps<DefaultTheme>>;

type BreakpointsCSS = {
  xs?: CSSInterpolation;
  sm?: CSSInterpolation;
  md?: CSSInterpolation;
  lg?: CSSInterpolation;
  xl?: CSSInterpolation;
  xxl?: CSSInterpolation;
};

const breakpointsMap = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
};

type BreakpointsObjEntry = [keyof BreakpointsCSS, CSSInterpolation];

export default function atMediaBreakpoints(BreakpointsObj: BreakpointsCSS) {
  const breakpointsEntries = Object.entries(BreakpointsObj) as BreakpointsObjEntry[];

  return breakpointsEntries.map(([breakpoint, cssValue]) => css`
    @media screen and (min-width: ${breakpointsMap[breakpoint]}) {
      ${cssValue}
    }
  `)
}
