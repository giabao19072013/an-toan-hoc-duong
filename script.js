console.log('Script.js đã load thành công!'); // Debug: mở F12 xem dòng này có hiện không

// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé? Đây là tổng đài khẩn cấp!')) {
    window.location.href = 'tel:111';
  }
});

// Chat AI với proxy CORS
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'AIzaSyDzg_4MR8m8b7akvKM-my5BPUCnNB8mfTY'; // Key SafeSchool mới của em

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

  const url = PROXY_URL + 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY;

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
    console.log('API status:', res.status); // Debug
    if (!res.ok) throw new Error('API error: ' + res.status);
    return res.json();
  })
  .then(data => {
    console.log('Data từ Gemini:', data); // Debug
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Oops, AI chưa trả lời được. Thử lại nhé!';
    addMessage('Bạn Thân AI: ' + reply, 'ai');
  })
  .catch(error => {
    console.error('Lỗi chat:', error);
    addMessage('Có lỗi kết nối. Thử lại hoặc kiểm tra proxy/key nhé!', 'ai');
  });
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
