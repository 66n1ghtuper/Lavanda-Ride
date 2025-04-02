import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { animateScroll as scroll } from 'react-scroll';
import './ContactSection.css';

import InstagramIcon from './38.png'; 
import TelegramIcon from './37.png';   
import XIcon from './5555.png';    

const ContactSection = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const scrollToTargetSection = () => {
    scroll.scrollTo('target-section', {
      duration: 800,
      smooth: 'easeInOutQuart',
    });
  };

  const sendMessageToTelegram = async (e) => {
    e.preventDefault();

    const botToken = '7643522924:AAGV-e6t-BGn5IObJ3s8_DKXxdmkD98jVY4'; // Замените на токен вашего бота
    const chatId = '6992362772'; // Замените на ваш chat_id
    const text = `Новое сообщение от ${name} (@${username}):\n${message}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
          }),
        }
      );

      if (response.ok) {
        alert(t('contactSection.successMessage'));
        setName('');
        setUsername('');
        setMessage('');
      } else {
        alert(t('contactSection.errorMessage'));
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert(t('contactSection.catchError'));
    }
  };

  return (
    <div className="cs-container">
      <h2 className="cs-title">{t('contactSection.title')}</h2>
      <div className="cs-content">
        <div className="cs-info">
          <div className="cs-info-item">
            <p>{t('contactSection.email')}: ridelavanta@gmail.com</p>
          </div>
          <div className="cs-info-item">
            <p>{t('contactSection.phone')}: +905051038350</p>
          </div>
          <div className="cs-info-item">
            <p>{t('contactSection.address')}: Yenigün, Mevlana Cd. No:76A, 07310 Muratpaşa/Antalya</p>
          </div>
        

          <div className="cs-social-icons">
            <a href="https://www.instagram.com/lavanta_ride?igsh=azBscGtpd2hoaXZz" target="_blank" rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram" className="cs-social-icon" />
            </a>
            <a href="https://t.me/forward369" target="_blank" rel="noopener noreferrer">
              <img src={TelegramIcon} alt="Telegram" className="cs-social-icon" />
            </a>
            <a href="https://www.tiktok.com/@lavanta.ride?_t=ZS-8v8akxHJyMs&_r=1" target="_blank" rel="noopener noreferrer">
              <img src={XIcon} alt="X" className="cs-social-icon" />
            </a>
          </div>
          <p className="cs-install-text">{t('contactSection.installApp')}</p>
          <button className="cs-download-button" onClick={scrollToTargetSection}>
            {t('contactSection.downloadButton')}
          </button>
        </div>

        <div className="cs-form">
          <h3>{t('contactSection.contactUs')}</h3>
          <form onSubmit={sendMessageToTelegram}>
            <input
              type="text"
              placeholder={t('contactSection.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder={t('contactSection.usernamePlaceholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <textarea
              placeholder={t('contactSection.messagePlaceholder')}
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">{t('contactSection.submitButton')}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;