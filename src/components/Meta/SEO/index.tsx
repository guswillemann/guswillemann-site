import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from '../../../hook/useTranslation';

type SEOProps = { pageTitle?: string };

export default function SEO({ pageTitle }: SEOProps) {
  const router = useRouter();
  const { t } = useTranslation({
    en: { description: "Gustavo Willemann's portfolio"},
    pt: { description: 'Portfólio de Gustavo Willemann'},
  });
  
  const { locale } = router;

  const baseTitle = 'Gustavo Willemann';
  const title = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;
  const baseUrl = 'https://gustavowillemann.com/';
  const imagePath = `${baseUrl}img/website-cards/${(locale || 'en')}-card.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={t('description')} />
      <link rel="icon" href="/logo.svg" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={t('description')} />
      <meta property="og:image" content={imagePath} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={baseUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={t('description')} />
      <meta property="twitter:image" content={imagePath} />
    </Head>
  );
}
