import useTranslation from '../../../hook/useTranslation';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import { NavBoxWrapper, NavLink } from './styles';

export default function NavBox() {
  const { t } = useTranslation({ en, pt });

  return(
    <NavBoxWrapper as="nav">
      <ul>
        <li>
          <NavLink href="/">{t('home')}</NavLink>
        </li>
        <li>
          <NavLink href="/articles/">{t('articles')}</NavLink>
        </li>
        <li>
          <NavLink href="/projects/">{t('projects')}</NavLink>
        </li>
      </ul>
    </NavBoxWrapper>
  );
}
