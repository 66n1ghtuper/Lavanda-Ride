import React from 'react';
import { useTranslation } from 'react-i18next';
import './VideoSection.css';
import videoFile from './ssW.MOV';

const VideoSection = () => {
  const { t } = useTranslation();

  return (
    <section className="video-section">
      <div className="video-container">
        <div className="text-content">
          <p className="video-description">
            {t('videoSection.question')}
          </p>
          <ul className="features-list">
            <li>{t('videoSection.features.scooters')}</li>
            <li>{t('videoSection.features.easeOfUse')}</li>
            <li>{t('videoSection.features.flexibility')}</li>
            <li>{t('videoSection.features.pricing')}</li>
          </ul>
        </div>
        <div className="video-player-container">
          <video controls className="video-player">
            <source src={videoFile} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;