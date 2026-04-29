// src/components/LangWrapper/LangWrapper.jsx
import { useEffect, useState } from 'react';
import { useParams, Navigate, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['fr', 'en'];

export default function LangWrapper() {
  const { lang } = useParams();
  const { i18n, ready } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const isValid = SUPPORTED_LANGS.includes(lang);

  useEffect(() => {
    if (isValid && currentLang !== lang) {
      i18n.changeLanguage(lang).then(() => setCurrentLang(lang));
    }
  }, [lang, i18n, isValid, currentLang]);

  if (!isValid) return <Navigate to="/fr" replace />;
  if (!ready || currentLang !== lang) return null;

  return <Outlet />;
}