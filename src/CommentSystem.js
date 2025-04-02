import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CommentModal from './CommentModal';
import './CommentSystem.css';

export default function CommentSystem() {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/comments')
      .then(res => res.json())
      .then(data => setUserComments(data))
      .catch(err => console.error(t('commentSystem.loadError'), err));
  }, []);

  const publishComment = (comment) => {
    fetch('http://localhost:3001/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(newComment => {
        setUserComments(prev => [...prev, newComment]);
      })
      .catch(err => console.error(t('commentSystem.publishError'), err));
  };

  return (
    <div className="comment-section-background">
      <div className="comment-interface-container">
        <div className="comment-content-area">
          <button 
            onClick={() => setIsModalVisible(true)}
            className="comment-action-button"
          >
            {t('commentSystem.writeComment')}
          </button>

          <div className="comment-feed">
            {userComments.slice().reverse().map(comment => (
              <div key={comment.id} className="comment-card">
                <div className="comment-meta">
                  <span className="comment-author">{comment.name}</span>
                  <span className="comment-timestamp">{comment.date}</span>
                </div>
                <p className="comment-body">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-info-panel">
          <div className="info-card">
            <h3 className="info-header">{t('commentSystem.contactInfo')}</h3>
            <div className="info-content">
              <p className="info-item"><strong>{t('commentSystem.email')}:</strong>info@lavantaride.com</p>
              <p className="info-item"><strong>{t('commentSystem.phone')}:</strong> +905051038350</p>
              <p className="info-item"><strong>{t('commentSystem.address')}:</strong> Yenigün, Mevlana Cd. No:76A, 07310 Muratpaşa/Antalya</p>
              <p className="info-item"><strong>{t('commentSystem.workingHours')}:</strong> 24/7</p>
            </div>
            <div className="social-links">
              <a href="https://www.instagram.com/lavanta_ride?igsh=azBscGtpd2hoaXZz" className="social-link">Instagram</a>
              <a href="https://www.tiktok.com/@lavanta.ride?_t=ZS-8v8akxHJyMs&_r=1" className="social-link">TikTok</a>
              <a href="https://api.whatsapp.com/send/?phone=905051038350&text&type=phone_number&app_absent=0" className="social-link">WhatsApp</a>
            </div>
          </div>
        </div>
        
        {isModalVisible && (
          <CommentModal 
            onClose={() => setIsModalVisible(false)} 
            onPublish={publishComment}
          />
        )}
      </div>
    </div>
  );
}