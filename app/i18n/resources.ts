import type { ResourceLoader } from 'next-i18next/proxy'
export const supportedLngs = ['en', 'vi'] as const
export const fallbackLng = 'vi'
export const defaultNS = 'common'
export const ns = [
  'common',
  'auth',
] as const
type SupportedLanguage = (typeof supportedLngs)[number]
type Namespace = (typeof ns)[number]
const localeLoaders: Record<
  SupportedLanguage,
  Record<Namespace, () => Promise<unknown>>
> = {
  en: {
    common: () => import('./locales/en/common.json'),
    auth: () => import('./locales/en/auth.json'),
  },
  vi: {
    common: () => import('./locales/vi/common.json'),
    auth: () => import('./locales/vi/auth.json'),
  },
}
export const resourceLoader: ResourceLoader = async (
  language,
  namespace,
) => {
  const languageLoaders = localeLoaders[language as SupportedLanguage]
  const loader = languageLoaders?.[namespace as Namespace]
  if (!loader) {
    throw new Error(
      `Unsupported i18n resource request: ${language}/${namespace}`,
    )
  }
  return loader()
}
