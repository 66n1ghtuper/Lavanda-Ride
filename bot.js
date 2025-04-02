const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const PORT = 3001;
const COMMENTS_FILE = path.join(__dirname, 'com.json');

// Telegram Bot Token
const token = '7643522924:AAGV-e6t-BGn5IObJ3s8_DKXxdmkD98jVY4';
const bot = new TelegramBot(token, { polling: true });

// Middleware
app.use(cors());
app.use(express.json());

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Для React/Vue сборки (если используется)
app.use(express.static(path.join(__dirname, 'dist')));

// Создаем файл com.json, если его нет
if (!fs.existsSync(COMMENTS_FILE)) {
  fs.writeFileSync(COMMENTS_FILE, '[]', 'utf-8');
}

// API Routes
app.get('/api/comments', (req, res) => {
  fs.readFile(COMMENTS_FILE, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка чтения файла' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', (req, res) => {
  const newComment = {
    id: Date.now(),
    ...req.body,
    date: new Date().toLocaleString('ru-RU')
  };

  fs.readFile(COMMENTS_FILE, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Ошибка чтения файла' });
    }

    const comments = JSON.parse(data);
    comments.push(newComment);

    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Ошибка записи файла' });
      }

      const message = `Новый комментарий:\nID: ${newComment.id}\nИмя: ${newComment.name}\nUsername: ${newComment.username}\nКомментарий: ${newComment.text}\nДата: ${newComment.date}`;
      bot.sendMessage('6992362772', message)
        .then(() => {
          res.json(newComment);
        })
        .catch(err => {
          console.error('Ошибка при отправке сообщения в Telegram:', err);
          res.json(newComment);
        });
    });
  });
});

// Обработка всех остальных запросов (для SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Telegram Bot Commands
bot.onText(/\/delete (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const commentId = parseInt(match[1], 10);

  fs.readFile(COMMENTS_FILE, 'utf-8', (err, data) => {
    if (err) {
      return bot.sendMessage(chatId, 'Ошибка чтения файла.');
    }

    const comments = JSON.parse(data);
    const filteredComments = comments.filter(comment => comment.id !== commentId);

    if (comments.length === filteredComments.length) {
      return bot.sendMessage(chatId, `Комментарий с ID ${commentId} не найден.`);
    }

    fs.writeFile(COMMENTS_FILE, JSON.stringify(filteredComments, null, 2), (err) => {
      if (err) {
        return bot.sendMessage(chatId, 'Ошибка записи файла.');
      }
      bot.sendMessage(chatId, `Комментарий с ID ${commentId} был успешно удален.`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});