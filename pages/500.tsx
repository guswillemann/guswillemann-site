import useTranslation from '../src/hook/useTranslation';

export default function PageNotFound() {
  const { t } = useTranslation({
    en: { message: 'Server-side error' },
    pt: { message: 'Falha no servidor' },
  });

  return (
    <h2 style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}>
      500 | {t('message')}
    </h2>
  );
}