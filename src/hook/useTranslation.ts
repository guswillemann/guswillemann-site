import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
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
    const localeObj = { locale: '' };
    
    if (locale === 'en') localeObj.locale = 'pt';
    else localeObj.locale = 'en'
    
    router.push({ pathname, query }, asPath, localeObj);
    setCookie(null, 'NEXT_LOCALE', localeObj.locale, {
      path: '/',
      maxAge: 60*60*24*7,
    });
  };

  return {
    t: translate,
    toggleLocale,
    locale,
  };
}
