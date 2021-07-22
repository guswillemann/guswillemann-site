import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export default function Logo() {
  const { primaryMain, primaryDetails } = useContext(ThemeContext).colors;

  return (
    <svg width="200" height="153" viewBox="0 0 200 153" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.2167 1.332L55.7311 113.875L89.8466 0.826634L110.108 0.688831L63.0415 151.819L48.9621 151.911L0 1.46981L20.2167 1.332Z" fill={primaryMain} />
      <path d="M110.108 0.643173L145.623 113.784L179.738 0.137803L200 0L152.933 151.957L138.854 152.049L89.8916 0.826817L110.108 0.643173Z" fill={primaryDetails} />
    </svg>
  );
}