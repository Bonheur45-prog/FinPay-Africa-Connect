import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLangPath } from '../../hooks/useLangPath';
import { CreditCard, Send, Code, Shield, ArrowRight } from "lucide-react";
import { useNavigate, useParams, useLocation, Link } from "react-router";

import LogoIcon from "./LogoIcon";
import Hamburger from "./Hamburger";
import MobileMenu from "./MobileMenu";
import SolutionsDropdown from "./SolutionsDropdown";
import LanguageModal from "./LanguageModal";
import { LANGUAGES } from "./constants";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "header.home", href: "/" },
  { label: "header.solutions", href: "/solutions" },
  { label: "header.about", href: "/about" },
  { label: "header.partners", href: "/partners" },
  { label: "header.investors", href: "/investors" },
  { label: "header.contact", href: "/contact-us" },
];

const SOLUTION_ITEMS = [
  { label: "Instant Cross-Border Payments", desc: "Send and receive money across 54 African markets in under 2 seconds.", href: "/solutions/payments", icon: Send, bgColor: "#8C1A13" },
  { label: "Diaspora Money Transfers", desc: "Low-fee, high-speed remittances from Europe, North America, and the Middle East.", href: "/solutions/diaspora", icon: Send, bgColor: "#8C1A13" },
  { label: "Payment API & Infrastructure", desc: "Integrate our payment rails into any app with a single PCI-compliant SDK.", href: "/solutions/api", icon: Code, bgColor: "#7c3aed" },
  { label: "Virtual & Physical Cards", desc: "Issue branded cards with real-time controls and global acceptance.", href: "/solutions/cards", icon: CreditCard, bgColor: "#8C1A13" },
  { label: "Identity & KYC Verification", desc: "Automated onboarding with AML screening for individuals and businesses.", href: "/solutions/kyc", icon: Shield, bgColor: "#7c3aed" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const { t } = useTranslation("common");
  const { langPath } = useLangPath();
  const { lang } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setLanguageModalOpen(false);
  };
  const toggleLanguageModal = () => {
    setLanguageModalOpen((prev) => !prev);
    setMenuOpen(false);
  };
  const selectLanguage = (code) => {
    setLanguageModalOpen(false);
    if (code === lang) return;
    const newPath = pathname.replace(`/${lang}`, `/${code}`);
    navigate(newPath);
  };

  const localizedNavLinks = NAV_LINKS.map(link => ({
    ...link,
    href: langPath(link.href)
  }));
  const localizedSolutionItems = SOLUTION_ITEMS.map(item => ({
    ...item,
    href: langPath(item.href)
  }));

  return (
    <>
      <header className={`${styles["header"]} ${scrolled ? styles["scrolled"] : ""}`}>
        <div className={styles["header__inner"]}>
          <Link to={langPath("/")} className={styles["header__logo"]} aria-label="FinPay Africa home">
            <LogoIcon />
            <span className={styles["logo__text"]}>
              Fin<span>Pay</span> Africa
            </span>
          </Link>

          <nav className={styles["header__nav"]} aria-label="Main navigation">
            {localizedNavLinks.map((link) => {
              if (link.label === "header.solutions") {
                return (
                  <SolutionsDropdown
                    key={link.label}
                    href={link.href}
                    open={solutionsOpen}
                    onToggle={setSolutionsOpen}
                    items={localizedSolutionItems}
                  />
                );
              }
              return (
                <Link key={link.label} to={link.href} className={styles["nav__link"]}>
                  {t(link.label)}
                </Link>
              );
            })}
          </nav>

          <div className={styles["header__actions"]}>
            <div className={styles["lang-selector"]}>
              <button className={styles["btn-ghost"]} onClick={toggleLanguageModal}>
                {LANGUAGES.find((l) => l.code === lang)?.flag}{" "}
                {lang?.toUpperCase()}
              </button>
              <LanguageModal open={languageModalOpen} onClose={() => setLanguageModalOpen(false)} onSelect={selectLanguage} selected={lang} />
            </div>

            <a href="#get-started" className={styles["btn-cta"]}>
              Get Started
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>

            <Hamburger open={menuOpen} onToggle={toggleMenu} />
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} onSelectLanguage={selectLanguage} selectedLanguage={lang} navLinks={localizedNavLinks} />
    </>
  );
}
