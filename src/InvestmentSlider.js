import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './InvestmentSlider.css';

// Import images
import slide1 from './u1.png';
import slide2 from './u2.png';
import slide3 from './u3.png';
import slide4 from './u4.png';
import slide6 from './u6.png';
import slide7 from './u7.png';
import slide8 from './u8.png';
import slide9 from './u9.png';

const InvestmentSlider = () => {
  const { t } = useTranslation();
  const slides = [
    { 
      image: slide1, 
      description: [
        t('investmentSlider.slide1.text1'),
        t('investmentSlider.slide1.text2')
      ] 
    },
    { 
      image: slide2, 
      description: [t('investmentSlider.slide2.text1')] 
    },
    { 
      image: slide3, 
      description: [t('investmentSlider.slide3.text1')] 
    },
    { 
      image: slide4, 
      description: [t('investmentSlider.slide4.text1')] 
    },
    { 
      image: slide6, 
      description: [t('investmentSlider.slide6.text1')] 
    },
    { 
      image: slide7, 
      description: [t('investmentSlider.slide7.text1')] 
    },
    { 
      image: slide8, 
      description: [t('investmentSlider.slide8.text1')] 
    },
    { 
      image: slide9, 
      description: [t('investmentSlider.slide9.text1')] 
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="invest-gallery">
      {/* Left part - slider */}
      <div className="visual-presentation">
        <div className="image-container">
          <img 
            src={slides[currentSlide].image} 
            alt={`Slide ${currentSlide + 1}`}
            className="presentation-image"
          />
        </div>
        <div className="image-caption">
          {slides[currentSlide].description.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
        <div className="slider-controls">
          <button onClick={prevSlide} className="slider-button prev-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="ws-container">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          
          <button onClick={nextSlide} className="slider-button next-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <button onClick={toggleAutoPlay} className="autoplay-button">
          {isAutoPlaying ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
              <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Right part - action button */}
      <div className="action-panel">
        <div className="promo-content">
          <h2 className="promo-heading">
            {t('investmentSlider.promoHeading')}
          </h2>
          <p className="promo-text">
            {t('investmentSlider.promoText')}
          </p>
          <button 
            onClick={() => window.location.href = '/investments'}
            className="cta-button"
          >
            {t('investmentSlider.ctaButton')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentSlider;