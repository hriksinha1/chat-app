const socket = io();

// Handle form submission
const form = document.getElementById('form');
const input = document.getElementById('input');
const buttonEmoji = document.getElementById('emoji-button');
const emojiPickerBox = document.getElementById('emoji-picker-box');

const help = () => {
  alert('Commands:\n/help - show this message\n/clear - clear all messages\n /random - send a random message');
}

const clear = () => {
  const messages = document.getElementById('messages');
  socket.emit('clear messages', messages);
  messages.innerHTML = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
 
  const emojiFormat = {
    'smile': '😀',
    'smiley': '😃',
    'grinning': '😁',
    'blush': '😊',
    'wink': '😉',
    'heart_eyes': '😍',
    'kissing_heart': '😘',
    'kissing_closed_eyes': '😚',
    'lol': '😆',
  };


  const emojiKeys = Object.keys(emojiFormat);
  const userInput = input.value.trim();
  
  if (emojiKeys.includes(userInput)) {
    const emoji = emojiFormat[userInput];
    socket.emit('chat message', emoji);
  }
  else if (userInput.startsWith('/')) {
    if (userInput === '/help') {
      help();
    }
    else if (userInput === '/random') {
      socket.emit('chat message','random message' + Math.random());
    }
    else if (userInput === '/ping') {
      socket.emit('chat message', 'pong');
    }
    else if (userInput === '/clear') {
      clear();
    }
  }
  else {
    socket.emit('chat message', userInput);
  }
  
  input.value = '';
});

// Handle incoming chat messages
const messages = document.getElementById('messages');
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});


buttonEmoji.addEventListener('click', () => {
  const pickerOptions = {
    onEmojiSelect: console.log
  }
  const picker = new EmojiMart.Picker(pickerOptions)

  console.log(picker)
  emojiPickerBox.appendChild(picker)
  emojiPickerBox.style.display = 'block'
  emojiPickerBox.style.position = 'absolute'
  emojiPickerBox.style.zIndex = '1'
  emojiPickerBox.style.bottom = '0'
});
