const socket = io();
const emojiPicker = new EmojiPicker({ emojiSize: 20, title: 'Pick an emoji' });

const emojiKeywords = {
  cool: "😎",
  like: "👍",
  boy: "👦",
  girl: "👧",
  smile: "😂"
}

// Handle form submission
const form = document.getElementById('form');
const input = document.getElementById('input');
const sendButton = document.getElementById('send-button');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

sendButton.addEventListener('click', () => {
  sendMessage();
});

// Handle emoji insertion
const emojiButton = document.getElementById('emoji-button');
emojiButton.addEventListener('click', () => {
  emojiPicker.togglePicker(emojiButton);
});

emojiPicker.on('emoji-click', (event) => {
  const emoji = event.emoji.native;
  input.value += emoji;
});

// Handle incoming chat messages
const messages = document.getElementById('messages');
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('li');
  const messageWithEmojis = emojione.toImage(msg);
  messageElement.innerHTML = messageWithEmojis;
  messages.appendChild(messageElement);
});

function sendMessage() {
  const message = input.value.trim();
  if (message) {
    socket.emit('chat message', message);
    input.value = '';
  }
}

function replaceKeywordsWithEmojis(text) {
  Object.keys(emojiKeywords).forEach(keyword => {
    const emoji = emojiKeywords[keyword];
    const pattern = new RegExp(keyword, 'g');
    text = text.replace(pattern, emoji);
  });
  return text;
}
