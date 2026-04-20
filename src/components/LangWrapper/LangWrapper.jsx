// src/components/LangWrapper/LangWrapper.jsx
import { useEffect } from 'react';
import { useParams, Navigate, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LANGS = ['fr', 'en'];

export default function LangWrapper() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  const isValid = SUPPORTED_LANGS.includes(lang);

  useEffect(() => {
    if (isValid && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n, isValid]);

  if (!isValid) return <Navigate to="/fr" replace />;

  return <Outlet />;
}