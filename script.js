console.log('Script.js load OK! Giao diện siêu đẹp + chat giả siêu xịn');

// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé?')) {
    window.location.href = 'tel:111';
  }
});

// Chat giả siêu xịn
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

  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-msg typing';
  typingDiv.textContent = 'Bạn Thân AI đang suy nghĩ...';
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    chatBox.removeChild(typingDiv);
    const reply = generateSuperSmartReply(message.toLowerCase());
    addMessage('Bạn Thân AI: ' + reply, 'ai');
  }, 1500 + Math.random() * 2500);
}

function generateSuperSmartReply(msg) {
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (msg.includes('bắt nạt') || msg.includes('bạo lực') || msg.includes('đánh') || msg.includes('xúc phạm') || msg.includes('cô lập')) {
    return randomChoice([
      "Ôi em ơi, mình rất tiếc khi nghe chuyện đó. Em đang cảm thấy thế nào? Đừng im lặng nhé, hãy kể với thầy cô hoặc người lớn tin cậy ngay. Nếu sợ, gọi 111 để được hỗ trợ 24/24, họ sẽ giúp em an toàn. Mình ở đây lắng nghe em đây...",
      "Em bị bắt nạt à? Tim mình thắt lại luôn. Em không đáng bị đối xử vậy đâu. Hãy nói với ai đó em tin tưởng, hoặc gọi 111 nhé. Mình sẽ ở đây an ủi em từng bước một. Em có muốn kể chi tiết không?"
    ]);
  }

  if (msg.includes('buồn') || msg.includes('buồn bã') || msg.includes('áp lực') || msg.includes('stress')) {
    return randomChoice([
      "Em đang buồn hả? Mình ôm em cái nào 💙. Học hành hay bạn bè đôi khi làm mình mệt mỏi lắm. Em thử kể mình nghe xem, mình lắng nghe hết. Nếu nặng, gọi 111 để được tư vấn tâm lý miễn phí nhé. Em xứng đáng được vui vẻ mà!",
      "Buồn thì cứ khóc đi em, khóc xong sẽ nhẹ lòng hơn. Mình ở đây với em, không phán xét gì hết. Em có muốn mình gợi ý cách thư giãn không? Như nghe nhạc, vẽ vời, hoặc thở 4-7-8. Em kể thêm đi nhé!"
    ]);
  }

  if (msg.includes('giải') || msg.includes('toán') || msg.includes('bài tập') || msg.includes('văn') || msg.includes('lý') || msg.includes('hóa')) {
    return randomChoice([
      "Em cần giúp giải bài tập hả? Tuyệt vời! Kể chi tiết bài toán hoặc câu hỏi đi (ví dụ: 2x + 5 = 13, hoặc phân tích đoạn văn), mình sẽ giải từng bước cho em nhé! Em học lớp mấy rồi?",
      "Mình sẵn sàng giúp em giải bài. Gửi đề bài đi, mình sẽ phân tích và giải rõ ràng. Môn gì đây?"
    ]);
  }

  if (msg.includes('chào') || msg.includes('hi') || msg.includes('xin chào')) {
    return randomChoice([
      "Chào em! Mình là Bạn Thân AI thân thiện của học sinh Việt Nam. Hôm nay em thế nào? Kể mình nghe đi!",
      "Hi em! Mình ở đây để lắng nghe và hỗ trợ em. Có chuyện gì vui hay buồn kể mình nghe nhé!"
    ]);
  }

  // Trả lời chung
  return randomChoice([
    "Mình đang lắng nghe em đây. Kể thêm đi, mình muốn hiểu em hơn!",
    "Em đang nghĩ gì thế? Mình ở đây để an ủi và giúp em nhé 💙"
  ]);
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
