/**
 * FinPay Africa — Contact Form Section
 *
 * Layout:
 *  - Full-bleed section with a cycling background image slideshow
 *    (African fintech & life scenes — paths configured below, easy to swap)
 *  - A frosted-glass form panel floated center-right over the imagery
 *  - Subject tabs (General / Partnership / Investor) that pre-fill fields
 *  - Controlled form with validation and a success state
 *  - No external form library — vanilla React useState
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Send } from 'lucide-react';
import styles from './ContactForm.module.css';

/* ─────────────────────────────────────────────────────────────────────────
   BACKGROUND IMAGES
   Replace these Unsplash URLs with your own hosted images.
   Ideal imagery: African city skylines, people using phones to pay,
   diaspora moments, fintech offices, African market scenes.
───────────────────────────────────────────────────────────────────────── */
const BG_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1600&q=80',
    alt: 'African city skyline at dusk',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80',
    alt: 'Person using mobile payment',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=1600&q=80',
    alt: 'African entrepreneur with phone',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80',
    alt: 'Business handshake in Africa',
    credit: 'Unsplash',
  },
  {
    url: 'https://images.unsplash.com/photo-1565728744382-61accd4aa148?w=1600&q=80',
    alt: 'Vibrant African market scene',
    credit: 'Unsplash',
  },
];

const SLIDE_DURATION = 5000; // ms per slide
const FADE_DURATION  = 900;  // ms for cross-fade

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  message: '',
};

/* ── Tiny validator ── */
function validate(fields, subject) {
  const errors = {};
  if (!fields.firstName.trim())  errors.firstName = 'First name is required';
  if (!fields.lastName.trim())   errors.lastName  = 'Last name is required';
  if (!fields.email.trim())      errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Enter a valid email address';
  if (!fields.message.trim())    errors.message = 'Please write a message';
  if (subject === 'partnership' && !fields.organization.trim())
    errors.organization = 'Organization name is required for partnership requests';
  return errors;
}

/* ── Background Slideshow ── */
function Slideshow() {
  const [current, setCurrent]   = useState(0);
  const [next, setNext]         = useState(null);
  const [fading, setFading]     = useState(false);
  const timerRef = useRef(null);

  const advance = useCallback(() => {
    const nextIdx = (current + 1) % BG_IMAGES.length;
    setNext(nextIdx);
    setFading(true);
    setTimeout(() => {
      setCurrent(nextIdx);
      setNext(null);
      setFading(false);
    }, FADE_DURATION);
  }, [current]);

  useEffect(() => {
    timerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => clearTimeout(timerRef.current);
  }, [advance]);

  return (
    <div className={styles.slideshow} aria-hidden="true">
      {/* Current image */}
      <div
        className={styles.slide}
        style={{ backgroundImage: `url(${BG_IMAGES[current].url})` }}
      />
      {/* Next image fading in */}
      {next !== null && (
        <div
          className={`${styles.slide} ${styles.slideNext} ${fading ? styles.slideFading : ''}`}
          style={{ backgroundImage: `url(${BG_IMAGES[next].url})` }}
        />
      )}
      {/* Dark + crimson vignette overlay */}
      <div className={styles.slideOverlay} />

      {/* Slide dots */}
      <div className={styles.dots}>
        {BG_IMAGES.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main ContactForm component ── */
export default function ContactForm() {
  const { t } = useTranslation('contact');
  const [subject, setSubject]   = useState('general');
  const [fields, setFields]     = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const subjects = t('form.subjects', { returnObjects: true });
  const subjectsArray = Array.isArray(subjects) ? subjects : [];
  const currentSubjectObj = subjectsArray.find((s) => s.key === subject);

  const validationMessages = t('form.validation', { returnObjects: true });
  const labels = t('form.labels', { returnObjects: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(fields, subject);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(INITIAL_FORM).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(fields, subject);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // ── Replace this block with your real API call / form service ──
    // e.g. fetch('/api/contact', { method: 'POST', body: JSON.stringify({subject, ...fields}) })
    await new Promise((res) => setTimeout(res, 1600)); // mock delay
    // ───────────────────────────────────────────────────────────────

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFields(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <section id="contact-form" className={styles.section}>
      {/* Sliding background */}
      <Slideshow />

      {/* Frosted form panel */}
      <div className={styles.panel}>
        {/* Panel header */}
        <div className={styles.panelHeader}>
          <div className={styles.panelEyebrow}>{t('form.header.eyebrow')}</div>
          <h2 className={styles.panelTitle}>{t('form.header.title')}</h2>
        </div>

        {/* Subject tabs */}
        <div className={styles.tabs} role="tablist" aria-label="Select inquiry type">
          {subjectsArray.map((s) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={subject === s.key}
              onClick={() => setSubject(s.key)}
              className={`${styles.tab} ${subject === s.key ? styles.tabActive : ''}`}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Form or success */}
        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon} aria-hidden="true">
              <CheckCircle size={32} strokeWidth={2.5} />
            </div>
            <h3 className={styles.successTitle}>{t('form.success.title')}</h3>
            <p className={styles.successBody}>
              {t('form.success.message')}
            </p>
            <button onClick={handleReset} className={styles.successBtn} type="button">
              {t('form.success.button')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className={styles.form}>
            {/* Name row */}
            <div className={styles.row2}>
              <div className={styles.fieldWrap}>
                <label className={styles.label} htmlFor="cf-firstName">{labels?.firstName || 'First Name'} *</label>
                <input
                  id="cf-firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={fields.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${touched.firstName && errors.firstName ? styles.inputError : ''}`}
                  placeholder={labels?.firstNamePlaceholder || 'Jean Paul'}
                />
                {touched.firstName && errors.firstName && (
                  <span className={styles.error} role="alert">{validationMessages?.firstName || errors.firstName}</span>
                )}
              </div>

              <div className={styles.fieldWrap}>
                <label className={styles.label} htmlFor="cf-lastName">{labels?.lastName || 'Last Name'} *</label>
                <input
                  id="cf-lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={fields.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${touched.lastName && errors.lastName ? styles.inputError : ''}`}
                  placeholder={labels?.lastNamePlaceholder || 'Ngabonziza'}
                />
                {touched.lastName && errors.lastName && (
                  <span className={styles.error} role="alert">{validationMessages?.lastName || errors.lastName}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className={styles.fieldWrap}>
              <label className={styles.label} htmlFor="cf-email">{labels?.email || 'Email Address'} *</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
                placeholder={labels?.emailPlaceholder || 'you@example.com'}
              />
              {touched.email && errors.email && (
                <span className={styles.error} role="alert">{validationMessages?.email || errors.email}</span>
              )}
            </div>

            {/* Phone (optional) */}
            <div className={styles.fieldWrap}>
              <label className={styles.label} htmlFor="cf-phone">
                {labels?.phone || 'Phone'} <span className={styles.optional}>({t('form.labels.optional') || 'optional'})</span>
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder={labels?.phonePlaceholder || '+32 478 00 00 00'}
              />
            </div>

            {/* Organization — required for partnership */}
            {(subject === 'partnership' || subject === 'investor') && (
              <div className={styles.fieldWrap}>
                <label className={styles.label} htmlFor="cf-organization">
                  {labels?.organization || 'Organization'} {subject === 'partnership' ? '*' : <span className={styles.optional}>({t('form.labels.optional') || 'optional'})</span>}
                </label>
                <input
                  id="cf-organization"
                  name="organization"
                  type="text"
                  value={fields.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.input} ${touched.organization && errors.organization ? styles.inputError : ''}`}
                  placeholder={labels?.organizationPlaceholder || 'Company or organization name'}
                />
                {touched.organization && errors.organization && (
                  <span className={styles.error} role="alert">{validationMessages?.organization || errors.organization}</span>
                )}
              </div>
            )}

            {/* Message */}
            <div className={styles.fieldWrap}>
              <label className={styles.label} htmlFor="cf-message">{labels?.message || 'Message'} *</label>
              <textarea
                id="cf-message"
                name="message"
                rows={4}
                value={fields.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ''}`}
                placeholder={currentSubjectObj?.placeholder || t('form.labels.messagePlaceholder') || 'Your message...'}
              />
              {touched.message && errors.message && (
                <span className={styles.error} role="alert">{validationMessages?.message || errors.message}</span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className={`${styles.submitBtn} ${submitting ? styles.submitBtnLoading : ''}`}
            >
              {submitting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  {t('form.buttons.sending') || 'Sending…'}
                </>
              ) : (
                <>
                  {t('form.buttons.send') || 'Send Message'}
                  <Send size={16} strokeWidth={2.5} aria-hidden="true" />
                </>
              )}
            </button>

            <p className={styles.privacyNote}>
              {t('form.privacy')}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}