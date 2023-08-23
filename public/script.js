const socket = io();
const emojiPicker = new EmojiPicker({ emojiSize: 20, title: 'Pick an emoji' });

// Handle form submission
const form = document.getElementById('form');
const input = document.getElementById('input');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
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
