console.log('Script.js load OK!');

document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé?')) {
    window.location.href = 'tel:111';
  }
});

const API_KEY = 'AIzaSyDzg_4MR8m8b7akvKM-my5BPUCnNB8mfTY';

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

  // Bỏ proxy hoàn toàn, dùng model cũ gemini-1.0-pro (ít bị chặn CORS hơn)
  const url = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=' + API_KEY;

  console.log('Gửi request đến Gemini (model 1.0-pro, bỏ proxy):', url);

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: 'Bạn là Bạn Thân AI thân thiện của học sinh Việt Nam. Trả lời bằng tiếng Việt, nhẹ nhàng, an ủi, hỗ trợ chống bạo lực học đường, tâm sự, giải bài tập nếu cần. Không phán xét, luôn khuyến khích tìm sự giúp đỡ từ thầy cô hoặc gọi 111 nếu nguy hiểm.\nCâu hỏi của em: ' + message
        }]
      }]
    })
  })
  .then(res => {
    console.log('Status:', res.status);
    if (!res.ok) return res.text().then(text => { throw new Error(`Error ${res.status}: ${text}`); });
    return res.json();
  })
  .then(data => {
    console.log('Data:', data);
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Oops, AI chưa trả lời được.';
    addMessage('Bạn Thân AI: ' + reply, 'ai');
  })
  .catch(error => {
    console.error('Lỗi:', error.message);
    addMessage('Lỗi: ' + error.message + '. Thử lại nhé!', 'ai');
  });
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
