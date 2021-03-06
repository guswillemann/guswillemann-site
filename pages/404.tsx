import useTranslation from '../src/hook/useTranslation';

export default function PageNotFound() {
  const { t } = useTranslation({
    en: { message: 'Page not found' },
    pt: { message: 'Página não encontrada' },
  });

  return (
    <h2 style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}>
      404 | {t('message')}
    </h2>
  );
}