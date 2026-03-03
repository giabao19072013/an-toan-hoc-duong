console.log('Script.js load OK! Key đang dùng:', API_KEY);

// Nút khẩn cấp (giữ nguyên)
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé?')) {
    window.location.href = 'tel:111';
  }
});

// Chat AI
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'; // Hoặc giữ proxy cũ nếu đang unlock
const API_KEY = 'AIzaSyDzg_4MR8m8b7akvKM-my5BPUCnNB8mfTY'; // Key của em

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

  // THAY MODEL Ở ĐÂY: dùng gemini-2.5-flash (mới nhất 2026)
  const url = PROXY_URL + 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY;

  console.log('Gửi request đến Gemini với model gemini-2.5-flash...');

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
    console.log('API status:', res.status);
    if (!res.ok) {
      return res.text().then(text => { throw new Error(`API error ${res.status}: ${text}`); });
    }
    return res.json();
  })
  .then(data => {
    console.log('Data từ Gemini:', data);
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Oops, AI chưa trả lời được. Thử lại nhé!';
    addMessage('Bạn Thân AI: ' + reply, 'ai');
  })
  .catch(error => {
    console.error('Lỗi chi tiết:', error.message);
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
