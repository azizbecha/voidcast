// lib/getServerT.ts
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import path from 'path';
import { cookies } from 'next/headers';

export async function getServerT() {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('i18next')?.value || 'en';

  const i18n = i18next.createInstance();

  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .init({
      lng: locale,
      fallbackLng: 'en',
      backend: {
        loadPath: path.resolve('./public/locales/{{lng}}/translation.json'),
      },
    });

  return i18n.t.bind(i18n);
}
