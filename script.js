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

  fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GROK_API_KEY
    },
    body: JSON.stringify({
      model: 'grok-beta', // Model miễn phí, trả lời tốt
      messages: [
        { role: 'system', content: 'Bạn là Bạn Thân AI thân thiện của học sinh Việt Nam. Trả lời bằng tiếng Việt, nhẹ nhàng, an ủi, hỗ trợ chống bạo lực học đường, tâm sự, giải bài tập nếu cần. Không phán xét, luôn khuyến khích tìm sự giúp đỡ từ thầy cô hoặc gọi 111 nếu nguy hiểm.' },
        { role: 'user', content: message }
      ],
      temperature: 0.8,
      max_tokens: 500
    })
  })
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
