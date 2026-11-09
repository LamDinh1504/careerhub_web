import { initServerI18next, getT, getResources, generateI18nStaticParams } from 'next-i18next/server'
import { I18nProvider } from 'next-i18next/client'
import i18nConfig from '../../i18n.config'
import Layout from '@/components/layout/Layout'
import { LanguageProvider } from '@/context/LanguageContext'

initServerI18next(i18nConfig)

export async function generateStaticParams() {
  return generateI18nStaticParams().map(({ lng }) => ({
    lng: lng,
  }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params
  const { i18n } = await getT(undefined, { lng: lng })
  const resources = getResources(i18n)

  return (
    <I18nProvider language={lng} resources={resources}>
      <LanguageProvider lng={lng}>
        <Layout>{children}</Layout>
      </LanguageProvider>
    </I18nProvider>
  )
}