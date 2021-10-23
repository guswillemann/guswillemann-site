import { useRouter } from 'next/router';
import { useCallback } from 'react';
import getObjAttribute from '../utils/getObjAttribute';

type LocaleOptions = 'en' | 'pt';

type LocaleObj = {
  [key: string]: LocaleObj | string;
};

type Translations = { [key in LocaleOptions]?: LocaleObj };

export default function useTranslation(translations: Translations) {
  const router = useRouter();
  const { locale, defaultLocale = 'en' } = router;

  const translate = useCallback((key: string) => {
    return getObjAttribute<string>(translations[locale as LocaleOptions], key) ??
           getObjAttribute<string>(translations[defaultLocale as LocaleOptions], key) ??
           key.split('.').pop() ?? '';
  }, [locale, defaultLocale, translations]);

  const toggleLocale = () => {
    const { pathname, asPath, query } = router;
    if (locale === 'en') router.push({ pathname, query }, asPath, { locale: 'pt' });
    else router.push({ pathname, query }, asPath, { locale: 'en' });
  };

  return {
    t: translate,
    toggleLocale,
    locale,
  };
}
