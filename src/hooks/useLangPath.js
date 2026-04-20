// src/hooks/useLangPath.js
import { useParams } from 'react-router';

export function useLangPath() {
  const { lang } = useParams();

  // langPath('/about') → '/fr/about'
  // langPath('/')      → '/fr/'
  const langPath = (path) => `/${lang}${path}`;

  return { langPath, lang };
}