// ... (giữ phần nút khẩn cấp)

// Proxy để bypass CORS (chỉ dùng cho demo, miễn phí)
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';  // Nếu hết hạn, thay bằng https://api.allorigins.win/raw?url=

const API_KEY = 'AIzaSy...'; // THAY API KEY GEMINI CỦA EM VÀO ĐÂY (lấy mới từ https://ai.google.dev nếu cần)

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

  const fullUrl = PROXY_URL + 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY;

  fetch(fullUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Bạn là Bạn Thân AI, hỗ trợ học sinh Việt Nam chống bạo lực học đường, tâm sự, giải bài. Trả lời tiếng Việt nhẹ nhàng, không phán xét.\nCâu hỏi: ' + message }] }]
    })
  })
  .then(res => {
    if (!res.ok) throw new Error('API error: ' + res.status);
    return res.json();
  })
  .then(data => {
    if (data.candidates && data.candidates[0]) {
      const reply = data.candidates[0].content.parts[0].text;
      addMessage('Bạn Thân AI: ' + reply, 'ai');
    } else {
      addMessage('Oops, AI chưa trả lời được. Thử lại nhé!', 'ai');
    }
  })
  .catch(error => {
    console.error(error); // Để em mở F12 xem lỗi chi tiết
    addMessage('Có lỗi kết nối (có thể CORS hoặc key). Thử lại hoặc kiểm tra key!', 'ai');
  });
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.classList.add(type === 'user' ? 'user-msg' : 'ai-msg');
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
