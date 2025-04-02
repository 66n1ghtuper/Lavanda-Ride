import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CommentModal.css';

export default function CommentModal({ onClose, onPublish }) {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    username: '',
    text: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      name: form.name,
      username: form.username,
      text: form.text
    };
    onPublish(newComment);
    onClose();
  };

  return (
    <div className="cm-overlay">
      <div className="cm-modal">
        <h3>{t('commentModal.addComment')}</h3>
        <form onSubmit={handleSubmit}>
          <div className="cm-form-group">
            <label>{t('commentModal.nameLabel')}:</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="cm-form-group">
            <label>{t('commentModal.usernameLabel')}:</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="cm-form-group">
            <label>{t('commentModal.commentLabel')}:</label>
            <textarea
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              required
            />
          </div>
          <div className="cm-buttons-container">
            <button type="button" className="cm-close-btn" onClick={onClose}>
              {t('commentModal.closeButton')}
            </button>
            <button type="submit" className="cm-publish-btn">
              {t('commentModal.publishButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}