import React from 'react';
import './IslandSection.css';
import iconA from './A.png';
import iconP from './P.png';
import UsageInstructions from './UsageInstructions';
import InvestmentSlider from './InvestmentSlider';
import TariffsSection from './TariffsSection';
import VideoSection from './VideoSection';
import ContactSection from './ContactSection';
import { useTranslation } from 'react-i18next';

const IslandSection = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="split-screen">
        <div className="left-side">
          <h1>{t('islandSection.title')}</h1>
          <p className="description">
            {t('islandSection.description')}
          </p>
        </div>
        <div className="right-side">
          <div className="right-content">
            <div className="text-block">
              <h2>{t('islandSection.downloadApp')}</h2>
              <p>{t('islandSection.availableOn')}</p>
            </div>
            <div className="button-block">
              <button className="app-button">
                <img src={iconA} alt="Apple Icon" className="icon" />
                <span>{t('islandSection.appStore')}</span>
              </button>
              <button className="app-button">
                <img src={iconP} alt="Google Play Icon" className="icon" />
                <span>{t('islandSection.googlePlay')}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="usage-instructions">
        <UsageInstructions />
      </section>
      <section id="tariffs">
        <TariffsSection />
      </section> 
       <section id="invest">
      < InvestmentSlider/>
      </section>
      <section id="video-section">
        <VideoSection />
      </section>
      <section id="contact-section">
        <ContactSection />
      </section>
    </>
  );
};

export default IslandSection;