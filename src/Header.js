import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Header.css';
import burgerIcon from './123.png';
import logoImage from './0909.png'; // Импортируем изображение логотипа

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const languages = ['ru', 'en', 'tr'];
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);

  const handleLanguageChange = () => {
    const nextLangIndex = (currentLangIndex + 1) % languages.length;
    i18n.changeLanguage(languages[nextLangIndex]);
    setCurrentLangIndex(nextLangIndex);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId = '') => {
    if (!isHomePage && sectionId) {
      window.location.href = `/#${sectionId}`;
    }
    closeMenu();
  };

  const handleInvestorClick = (e) => {
    if (isHomePage) {
      e.preventDefault();
      window.location.href = '/investments';
    }
    closeMenu();
  };

  return (
    <header 
      className="header__container" 
      style={isHomePage ? { background: 'linear-gradient(135deg,#A239EA, #eaeaea72)' } : {}}
    >
      <div className="header__logo">
        <Link to="/" className="header__logo-link" onClick={closeMenu}>
          {/* Заменяем текстовый логотип на изображение */}
          <img 
            src={logoImage} 
            alt="Lavanta Ride" 
            className="header__logo-image"
          />
        </Link>
      </div>
      <div className="header__right-section">
        <div className="header__left-group">
          <Link 
            to={isHomePage ? "/investments" : "/"} 
            className="header__investor-button" 
            onClick={handleInvestorClick}
          >
            {isHomePage ? t('header.investmentOpportunities') : t('header.becomeInvestor')}
          </Link>
          <div className="header__burger-menu" onClick={toggleMenu}>
            <img src={burgerIcon} alt="Menu" className="header__burger-icon" />
          </div>
        </div>
        <div className="header__language-switcher">
          <button onClick={handleLanguageChange}>
            {languages[currentLangIndex].toUpperCase()}
          </button>
        </div>
      </div>
      <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
        <ul className="header__nav-list">
          <li className="header__nav-item header__nav-item--investor">
            <Link 
              to={isHomePage ? "/investments" : "/"} 
              className="header__investor-button-mobile" 
              onClick={handleInvestorClick}
            >
              {isHomePage ? t('header.investmentOpportunities') : t('header.becomeInvestor')}
            </Link>
          </li>
          {isHomePage && (
            <>
              <li className="header__nav-item">
                <ScrollLink 
                  to="tariffs" 
                  smooth={true} 
                  duration={500} 
                  offset={-87} 
                  onClick={closeMenu} 
                  className="header__nav-link"
                >
                  {t('header.tariffs')}
                </ScrollLink>
              </li>
              <li className="header__nav-item">
                <ScrollLink 
                  to="usage-instructions" 
                  smooth={true} 
                  duration={500} 
                  onClick={closeMenu} 
                  className="header__nav-link"
                >
                  {t('header.usageInstructions')}
                </ScrollLink>
              </li>
              <li className="header__nav-item">
                <ScrollLink 
                  to="contact-section" 
                  smooth={true} 
                  duration={500} 
                  onClick={closeMenu} 
                  className="header__nav-link"
                >
                  {t('header.contact')}
                </ScrollLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;