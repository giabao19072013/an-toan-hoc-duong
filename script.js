console.log('Script.js load OK! Sử dụng Grok API thật');

// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé?')) {
    window.location.href = 'tel:111';
  }
});

// Chat với Grok API (endpoint hỗ trợ CORS tốt hơn)
const GROK_API_KEY = 'xai-OhQTeRQTQgp3r5E3HnVvVGgKfvg7S7fqNuDBck6mdUDxNRVxJJ7C8REL0QINfpY9NIytF5ft7MzyL9fq'; // DÁN KEY GROK CỦA EM VÀO ĐÂY (gsk_ bắt đầu)

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage('Em: ' + message, 'user');
  userInput.value = '';

 fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message })
})
.then(res => res.json())
.then(data => {
  if (data.error) {
    addMessage('Lỗi: ' + data.error, 'ai');
  } else {
    addMessage('Bạn Thân AI: ' + data.reply, 'ai');
  }
})
.catch(error => {
  addMessage('Lỗi kết nối proxy: ' + error.message, 'ai');
});
  .then(res => {
    console.log('Grok status:', res.status);
    if (!res.ok) {
      return res.text().then(text => { throw new Error(`Error ${res.status}: ${text}`); });
    }
    return res.json();
  })
  .then(data => {
    console.log('Data từ Grok:', data);
    const reply = data.choices?.[0]?.message?.content || 'Oops, AI chưa trả lời được. Thử lại nhé!';
    addMessage('Bạn Thân AI (Grok): ' + reply, 'ai');
  })
  .catch(error => {
    console.error('Lỗi Grok:', error.message);
    addMessage('Lỗi kết nối Grok: ' + error.message + '. Kiểm tra key hoặc thử lại!', 'ai');
  });
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

