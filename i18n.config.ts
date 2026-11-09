import { defineConfig } from 'next-i18next/proxy'

import {
  defaultNS,
  fallbackLng,
  ns,
  resourceLoader,
  supportedLngs,
} from './app/i18n/resources'

const i18nConfig = defineConfig({
  supportedLngs: [...supportedLngs],
  fallbackLng,
  defaultNS,
  ns: [...ns],
  hideDefaultLocale: true,
  resourceLoader,
})

export default i18nConfig;