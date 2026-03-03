document.getElementById('nut-khan-cap').addEventListener('click', function() {
  if (confirm('Gọi khẩn cấp 111 nhé?')) {
    window.location.href = 'tel:111';
  }
});

const API_KEY = 'AIzaSyCQrp0MQb6rv1zCbKCMVU5yQao5cmobwBo'; // THAY API KEY GEMINI CỦA EM VÀO ĐÂY
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  addMessage('Em: ' + message, 'user');
  userInput.value = '';

  fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Bạn là bạn thân của học sinh Việt Nam. Trả lời tiếng Việt, hỗ trợ chống bạo lực học đường.\nCâu hỏi: ' + message }] }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.candidates[0].content.parts[0].text;
    addMessage('AI: ' + reply, 'ai');
  })
  .catch(() => addMessage('Lỗi rồi, thử lại nhé!', 'ai'));
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.classList.add(type + '-msg');
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}