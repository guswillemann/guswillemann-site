import useTranslation from '../../../hook/useTranslation';
import Link from '../../Link';
import * as en from './i18n/en.json';
import * as pt from './i18n/pt.json';
import { NavBoxWrapper } from './styles';

export default function NavBox() {
  const { t } = useTranslation({ en, pt });

  return(
    <NavBoxWrapper as="nav">
      <ul>
        <li>
          <Link href="/">{t('home')}</Link>
        </li>
        <li>
          <Link href="/articles/">{t('articles')}</Link>
        </li>
        <li>
          <Link href="/projects/">{t('projects')}</Link>
        </li>
      </ul>
    </NavBoxWrapper>
  );
}