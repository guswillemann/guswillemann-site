/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  trailingSlash: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'en',
    localeDetection: true,
  }
}