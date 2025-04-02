import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './UsageInstructions.css';
import img1 from './y4.png';
import img2 from './y3.png';
import img3 from './y2.png';
import img4 from './q4.png';
import img5 from './q4.png';
import img6 from './q8.png';
import img7 from './y1.png';
import img8 from './q9.png';
import img9 from './q9.png';

const UsageInstructions = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(img1);
  const [currentText, setCurrentText] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
  const titles = [
    t('usageInstructions.step1'),
    t('usageInstructions.step2'),
    t('usageInstructions.step3'),
    t('usageInstructions.step4'),
    t('usageInstructions.step5'),
    t('usageInstructions.step6'),
    t('usageInstructions.step7'),
    t('usageInstructions.step8'),
    t('usageInstructions.step9'),
  ];
  const texts = [
    [
      t('usageInstructions.text1_1'),
      t('usageInstructions.text1_2'),
    ],
    [
      t('usageInstructions.text2_1'),
      t('usageInstructions.text2_2'),
    ],
    [
      t('usageInstructions.text3_1'),
      t('usageInstructions.text3_2'),
    ],
    [
      t('usageInstructions.text4_1'),
      t('usageInstructions.text4_2'),
      t('usageInstructions.text4_3'),
    ],
    [
      t('usageInstructions.text5_1'),
      t('usageInstructions.text5_2'),
      t('usageInstructions.text5_3'),
    ],
    [
      t('usageInstructions.text6_1'),
      t('usageInstructions.text6_2'),
      t('usageInstructions.text6_3'),
    ],
    [
      t('usageInstructions.text7_1'),
      t('usageInstructions.text7_2'),
      t('usageInstructions.text7_3'),
    ],
    [
      t('usageInstructions.text8_1'),
      t('usageInstructions.text8_2'),
      t('usageInstructions.text8_3'),
    ],
    [
      t('usageInstructions.text9_1'),
      t('usageInstructions.text9_2'),
      t('usageInstructions.text9_3'),
    ],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setCurrentImage(images[currentIndex]);
    setCurrentText(texts[currentIndex]);
    setCurrentTitle(titles[currentIndex]);
  }, [currentIndex, images, texts, titles, t]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="usage-instructions">
      <h1>{t('usageInstructions.title')}</h1>
      <div className="image-text-container">
        <img src={currentImage} alt="Иллюстрация" />
        <div className="qtext-island">
          <h2>{currentTitle}</h2>
          <ul>
            {currentText.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="dots-container">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default UsageInstructions;