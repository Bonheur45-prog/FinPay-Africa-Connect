import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Zap, Globe, Code, CreditCard, Shield, ArrowRight } from "lucide-react";
import { useLangPath } from '../../hooks/useLangPath';
import paymentShowcaseImg from "../../assets/images/solutions-show-case/cross-border-payments-showcase.png";
import physicalVirtualCard from '../../assets/images/physical-virtual-card.png';
import diasporaShowcaseImg from "../../assets/images/solutions-show-case/diaspora-transfers-showcase.png";
import apiShowcaseImg from "../../assets/images/solutions-show-case/payment-api-showcase.png";
import kycShowcaseImg from "../../assets/images/solutions-show-case/kyc-verification-showcase.png";
import styles from "./CoreSolutions.module.css";

const SOLUTIONS = [
  {
    id: "instant-payments",
    featured: true,
    tag: "solutions.instant-payments.tag",
    title: "solutions.instant-payments.title",
    desc: "solutions.instant-payments.desc",
    image: paymentShowcaseImg,
    video: null,
    Illustration: PaymentNetworkIllustration,
    badgeBg: "rgba(245,158,11,0.18)",
    badgeBorder: "rgba(245,158,11,0.35)",
    BadgeIcon: Zap,
    href: "/solutions/payments",
  },
  {
    id: "diaspora",
    tag: "solutions.diaspora.tag",
    title: "solutions.diaspora.title",
    desc: "solutions.diaspora.desc",
    image: diasporaShowcaseImg,
    video: null,
    Illustration: DiasporaIllustration,
    badgeBg: "rgba(140, 26, 19,0.18)",
    badgeBorder: "rgba(140, 26, 19,0.35)",
    BadgeIcon: Globe,
    href: "/solutions/diaspora",
  },
  {
    id: "api",
    tag: "solutions.api.tag",
    title: "solutions.api.title",
    desc: "solutions.api.desc",
    image: apiShowcaseImg,
    video: null,
    Illustration: ApiIllustration,
    badgeBg: "rgba(167,139,250,0.18)",
    badgeBorder: "rgba(167,139,250,0.4)",
    BadgeIcon: Code,
    href: "/solutions/api",
  },
  {
    id: "cards",
    tag: "solutions.cards.tag",
    title: "solutions.cards.title",
    desc: "solutions.cards.desc",
    image: physicalVirtualCard,
    video: null,
    Illustration: CardIllustration,
    badgeBg: "rgba(245,158,11,0.15)",
    badgeBorder: "rgba(245,158,11,0.3)",
    BadgeIcon: CreditCard,
    href: "/solutions/cards",
  },
  {
    id: "kyc",
    tag: "solutions.kyc.tag",
    title: "solutions.kyc.title",
    desc: "solutions.kyc.desc",
    image: kycShowcaseImg,
    video: null,
    Illustration: ShieldIllustration,
    badgeBg: "rgba(107,203,119,0.15)",
    badgeBorder: "rgba(107,203,119,0.4)",
    BadgeIcon: Shield,
    href: "/solutions/kyc",
  },
];

function CardMedia({ image, video, Illustration, badgeBg, badgeBorder, BadgeIcon }) { // eslint-disable-line no-unused-vars
  return (
    <div className={styles["cs__card-media"]}>
      {video ? (
        <video
          className={styles["cs__card-video"]}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : image ? (
        <img
          className={styles["cs__card-img"]}
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
        />
      ) : (
        <div className={styles["cs__card-illustration"]} aria-hidden="true">
          <Illustration />
        </div>
      )}

      <div className={styles["cs__card-overlay"]} aria-hidden="true" />

      <div
        className={styles["cs__card-badge"]}
        style={{ background: badgeBg, border: `1px solid ${badgeBorder}` }}
      >
        <BadgeIcon size={18} strokeWidth={2} />
      </div>
    </div>
  );
}

function SolutionCard({ solution, delay }) {
  const { t } = useTranslation("home");
  const { langPath } = useLangPath();

  const {
    featured,
    href,
    tag,
    title,
    desc,
  } = solution;

  return (
    <article
      className={`${styles["cs__card"]} ${featured ? styles["cs__card--featured"] : ""}`}
      data-delay={delay}
    >
      <CardMedia
        image={solution.image}
        video={solution.video}
        Illustration={solution.Illustration}
        badgeBg={solution.badgeBg}
        badgeBorder={solution.badgeBorder}
        BadgeIcon={solution.BadgeIcon}
      />

      <div className={styles["cs__card-body"]}>
        <span className={styles["cs__card-tag"]}>{t(tag)}</span>
        <h3 className={styles["cs__card-title"]}>{t(title)}</h3>
        <p className={styles["cs__card-text"]}>{t(desc)}</p>

        <Link to={langPath(href)} className={styles["cs__card-link"]}>
          {t("learn-more-btn")}
          <ArrowRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </article>
  );
}

export function CoreSolutions() {
  const { t } = useTranslation("home");
  const { langPath } = useLangPath();

  const labelRef    = useRef(null);
  const headlineRef = useRef(null);
  const descRef     = useRef(null);
  const ctaRef      = useRef(null);
  const gridRef     = useRef(null);

  useEffect(() => {
    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles["visible"]);
            fadeInObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    [labelRef, headlineRef, descRef, ctaRef].forEach((ref) => {
      if (ref.current) fadeInObserver.observe(ref.current);
    });

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.delay || "0", 10);
            setTimeout(() => {
              entry.target.classList.add(styles["visible"]);
            }, delay);
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    if (gridRef.current) {
      // Find children explicitly rather than classname because the CSS module class name is dynamic
      const cards = Array.from(gridRef.current.children);
      cards.forEach((card) => cardObserver.observe(card));
    }

    return () => {
      fadeInObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section className={styles["cs"]} id="solutions" aria-labelledby="cs-headline">
      <div className={styles["cs__wave"]} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C360,80 1080,0 1440,60 L1440,0 L0,0 Z" fill="#8C1A13" />
        </svg>
      </div>

      <div className={styles["cs__inner"]}>
        <header className={styles["cs__header"]}>
          <div className={styles["cs__label"]} ref={labelRef}>
            <span className={styles["cs__label-line"]} />
            {t("core-solutions-heading.label")}
            <span className={styles["cs__label-line"]} />
          </div>

          <h2 className={styles["cs__headline"]} id="cs-headline" ref={headlineRef}>
            {t("core-solutions-heading.title_start")} <em>{t("core-solutions-heading.emphasis")}</em>
            <br />{t("core-solutions-heading.title_end")}
          </h2>

          <p className={styles["cs__desc"]} ref={descRef}>
            {t("core-solutions-heading.description")}
          </p>
        </header>

        <div className={styles["cs__grid"]} ref={gridRef}>
          {SOLUTIONS.map((solution, index) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              delay={index * 100}
            />
          ))}
        </div>

        <div className={styles["cs__cta"]} ref={ctaRef}>
          <Link to={langPath("/solutions")} className={styles["cs__cta-btn"]}>
            {t("core-solution-cta")}
            <ArrowRight color="white" size={16} strokeWidth={2} />
          </Link>

          <p className={styles["cs__trust"]}>
            <span className={styles["cs__trust-dot"]} aria-hidden="true" />
            {t("core-sol-trust-statement")}
          </p>
        </div>
      </div>
    </section>
  );
}



function PaymentNetworkIllustration() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pn-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A1109" />
          <stop offset="100%" stopColor="#8C1A13" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#pn-g)" />
      <circle cx="400" cy="225" r="80"  fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
      <circle cx="400" cy="225" r="130" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
      <circle cx="400" cy="225" r="190" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="1" />
      <circle cx="400" cy="225" r="22"  fill="#f59e0b" opacity="0.9" />
      {[ [220,130],[580,100],[620,330],[180,320],[400,60] ].map(([x,y],i) => (
        <g key={i}>
          <line x1="400" y1="225" x2={x} y2={y} stroke="rgba(245,158,11,0.35)" strokeWidth="1" />
          <circle cx={x} cy={y} r={8+i%3} fill="rgba(255,255,255,0.6)" />
        </g>
      ))}
      <text x="400" y="395" fill="rgba(255,255,255,0.14)" fontSize="11" fontFamily="sans-serif" textAnchor="middle" letterSpacing="4">
        INSTANT PAYMENT NETWORK
      </text>
    </svg>
  );
}

function DiasporaIllustration() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="d-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a2f6b" />
          <stop offset="100%" stopColor="#2d4f9e" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#d-g)" />
      <rect x="155" y="28" width="90" height="170" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
      <rect x="163" y="42" width="74" height="110" rx="5" fill="rgba(140, 26, 19,0.4)" />
      <rect x="170" y="52" width="60" height="8" rx="3" fill="rgba(255,255,255,0.5)" />
      <rect x="170" y="66" width="45" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="200" cy="108" r="18" fill="rgba(245,158,11,0.85)" />
      <path d="M193 108 l5 5 9-9" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="170" y="138" width="60" height="8" rx="3" fill="rgba(255,255,255,0.22)" />
      <path d="M100 112 Q130 90 155 112" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      <circle cx="100" cy="112" r="7" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
}

function ApiIllustration() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="api-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a1540" />
          <stop offset="100%" stopColor="#8C1A13" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#api-g)" />
      <rect x="40" y="40" width="320" height="145" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <rect x="40" y="40" width="320" height="24" rx="8" fill="rgba(255,255,255,0.07)" />
      <circle cx="56"  cy="52" r="4" fill="#ff6b6b" opacity="0.8" />
      <circle cx="70"  cy="52" r="4" fill="#f59e0b" opacity="0.8" />
      <circle cx="84"  cy="52" r="4" fill="#6bcb77" opacity="0.8" />
      <rect x="54"  y="78"  width="55" height="7" rx="2" fill="#f59e0b"  opacity="0.7" />
      <rect x="116" y="78"  width="30" height="7" rx="2" fill="rgba(255,255,255,0.4)" />
      <rect x="54"  y="96"  width="30" height="7" rx="2" fill="#6baaff"  opacity="0.8" />
      <rect x="90"  y="96"  width="50" height="7" rx="2" fill="rgba(255,255,255,0.3)" />
      <rect x="54"  y="114" width="40" height="7" rx="2" fill="#a78bfa"  opacity="0.8" />
      <rect x="100" y="114" width="35" height="7" rx="2" fill="rgba(255,255,255,0.25)" />
      <rect x="54"  y="132" width="60" height="7" rx="2" fill="#6bcb77"  opacity="0.7" />
      <rect x="270" y="88"  width="74" height="28" rx="6" fill="rgba(107,203,119,0.2)" stroke="rgba(107,203,119,0.5)" strokeWidth="1" />
      <text x="307" y="106" fill="#6bcb77" fontSize="9" fontFamily="monospace" textAnchor="middle">200 OK</text>
    </svg>
  );
}

function CardIllustration() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="card-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A1109" /><stop offset="100%" stopColor="#1e4da0" />
        </linearGradient>
        <linearGradient id="card-f" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8C1A13" /><stop offset="100%" stopColor="#8C1A13" />
        </linearGradient>
        <linearGradient id="card-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" /><stop offset="100%" stopColor="#8C1A13" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#card-bg)" />
      <rect x="110" y="70" width="200" height="120" rx="12" fill="url(#card-b)" transform="rotate(-6 200 135)" opacity="0.7" />
      <rect x="90" y="55" width="200" height="120" rx="12" fill="url(#card-f)" transform="rotate(4 190 115)" />
      <circle cx="210" cy="100" r="30" fill="rgba(255,255,255,0.06)" />
      <circle cx="240" cy="100" r="30" fill="rgba(245,158,11,0.2)" />
      <rect x="110" y="88" width="28" height="22" rx="4" fill="#f59e0b" opacity="0.85" />
      <line x1="115" y1="95" x2="132" y2="95" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <line x1="115" y1="101" x2="132" y2="101" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      {[110,118,126,134,148,156,164,172].map((x,i) => (
        <circle key={i} cx={x} cy="126" r="2.5" fill="rgba(255,255,255,0.55)" />
      ))}
      <rect x="186" y="122" width="30" height="8" rx="2" fill="rgba(255,255,255,0.85)" />
    </svg>
  );
}

function ShieldIllustration() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="sh-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0a1a4e" /><stop offset="100%" stopColor="#1a3070" />
        </linearGradient>
      </defs>
      <rect width="400" height="225" fill="url(#sh-g)" />
      <path d="M200 36 L250 58 L250 110 Q250 150 200 175 Q150 150 150 110 L150 58 Z" fill="rgba(140, 26, 19,0.22)" stroke="rgba(140, 26, 19,0.7)" strokeWidth="1.5" />
      <path d="M182 107 L195 120 L220 95" stroke="#6bcb77" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="80"  y1="112" x2="148" y2="112" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="252" y1="112" x2="320" y2="112" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M80 85 L80 65 L100 65"  stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M320 85 L320 65 L300 65" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M80 140 L80 160 L100 160" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M320 140 L320 160 L300 160" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
