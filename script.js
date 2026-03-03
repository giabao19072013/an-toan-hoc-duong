// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé? Đây là tổng đài khẩn cấp!')) {
    window.location.href = 'tel:111';
  }
});

// Chuyển tab section
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}
showSection('emergency');

// Chat AI với proxy CORS
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'AIzaSy...'; // THAY API KEY GEMINI THẬT VÀO ĐÂY!!!
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

  fetch(PROXY_URL + 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Bạn là Bạn Thân AI thân thiện của học sinh Việt Nam. Trả lời tiếng Việt nhẹ nhàng, an ủi, hỗ trợ chống bạo lực học đường, tâm sự, giải bài tập. Không phán xét, khuyến khích tìm giúp đỡ nếu cần.\nCâu hỏi: ' + message }] }]
    })
  })
  .then(res => res.json())
  .then(data => {
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Oops, AI bận rồi! Thử lại nhé.';
    addMessage('Bạn Thân AI: ' + reply, 'ai');
  })
  .catch(() => addMessage('Lỗi kết nối (có thể CORS hoặc key). Thử lại hoặc kiểm tra key!', 'ai'));
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type + '-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Quiz đơn giản
const quizData = [
  { q: "Nếu bị bạn bắt nạt, em nên làm gì đầu tiên?", a: "Nói với thầy cô hoặc người lớn tin cậy", options: ["Im lặng chịu đựng", "Trả đũa", "Nói với thầy cô hoặc người lớn tin cậy"] },
  { q: "Cyberbullying là gì?", a: "Bắt nạt qua mạng xã hội, tin nhắn", options: ["Chơi game online", "Bắt nạt qua mạng xã hội, tin nhắn", "Học nhóm"] },
  // Thêm 3 câu nữa nếu muốn
];

let score = 0;
const quizContainer = document.getElementById('quiz-questions');
quizData.forEach((item, index) => {
  const p = document.createElement('p');
  p.innerHTML = `<strong>Câu ${index+1}:</strong> ${item.q}<br>`;
  item.options.forEach(opt => {
    p.innerHTML += `<label><input type="radio" name="q${index}" value="${opt}"> ${opt}</label><br>`;
  });
  quizContainer.appendChild(p);
});

document.getElementById('quiz-submit').addEventListener('click', () => {
  score = 0;
  quizData.forEach((item, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === item.a) score++;
  });
  document.getElementById('quiz-result').innerHTML = `Em được ${score}/${quizData.length} điểm! ${score === quizData.length ? 'Siêu giỏi!' : 'Cố lên, em làm tốt lắm!'}`;
});

// Mood Tracker (lưu localStorage)
function saveMood(mood) {
  const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  history.push({ date: new Date().toLocaleDateString(), mood });
  localStorage.setItem('moodHistory', JSON.stringify(history));
  showMoodHistory();
}

function showMoodHistory() {
  const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
  document.getElementById('mood-history').innerHTML = '<h3>Lịch sử cảm xúc:</h3>' + history.map(h => `<p>${h.date}: ${h.mood}</p>`).join('');
}
showMoodHistory(); // Load khi mở

// Tìm kiếm lời khuyên đơn giản
document.getElementById('search-advise').addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const items = document.querySelectorAll('#advise-list li');
  items.forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});
