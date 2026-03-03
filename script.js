console.log('Script.js đã load thành công! Key đang dùng:', 'AIzaSyDzg_4MR8m8b7akvKM-my5BPUCnNB8mfTY');

// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé? Đây là tổng đài khẩn cấp!')) {
    window.location.href = 'tel:111';
  }
});

// Chat AI
const PROXY_URL = 'https://corsproxy.io/?'; // Proxy mới, hỗ trợ POST tốt hơn
const API_KEY = 'AIzaSyDzg_4MR8m8b7akvKM-my5BPUCnNB8mfTY'; // Key của em

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

  // URL đầy đủ với proxy
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY;
  const url = PROXY_URL + encodeURIComponent(apiUrl);

  console.log('Gửi request đến Gemini qua proxy:', url);

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
    console.log('API status từ proxy:', res.status);
    if (!res.ok) {
      return res.text().then(text => {
        throw new Error(`API error ${res.status}: ${text}`);
      });
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
    addMessage('Lỗi kết nối: ' + error.message + '. Thử lại hoặc kiểm tra proxy nhé!', 'ai');
  });
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
