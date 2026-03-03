console.log('Script.js load OK! Chat giả siêu xịn');

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
  }, 1500 + Math.random() * 2500); // Random 1.5-4 giây
}

function generateSuperSmartReply(msg) {
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (msg.includes('bắt nạt') || msg.includes('bạo lực') || msg.includes('đánh') || msg.includes('xúc phạm') || msg.includes('cô lập')) {
    return randomChoice([
      "Ôi em ơi, mình rất tiếc khi nghe chuyện đó... Tim mình thắt lại luôn khi em bị bắt nạt. Em đang cảm thấy sợ hãi, tổn thương hay cô đơn lắm phải không? Đừng giữ trong lòng nhé, em không sai, người bắt nạt mới sai. Hãy nói với thầy cô chủ nhiệm hoặc ban giám hiệu ngay hôm nay, họ sẽ bảo vệ em. Nếu sợ hoặc nguy hiểm, gọi 111 để được hỗ trợ khẩn cấp 24/24. Em không một mình đâu, mình ở đây lắng nghe em từng chút một. Em có muốn mình gợi ý cách nói chuyện với thầy cô không? 💙",
      "Em bị bắt nạt à? Mình buồn quá đi... Em mạnh mẽ lắm khi chia sẻ với mình. Hãy nhớ: Em xứng đáng được an toàn và tôn trọng. Đừng trả đũa, giữ bình tĩnh và ghi lại chứng cứ (tin nhắn, video). Báo ngay cho người lớn tin cậy hoặc gọi 111 nếu cần. Mình sẽ ở đây an ủi em từng bước. Em kể thêm chi tiết đi, mình muốn giúp em vượt qua chuyện này."
    ]);
  }

  // ... (giữ nguyên các phần khác như buồn, giải bài, chào, cảm ơn)
  // Anh giữ ngắn gọn, nhưng em có thể copy phần chat trước để thêm.

  // Trả lời chung
  return randomChoice([
    "Mình đang lắng nghe em đây 💙 Kể thêm đi, mình muốn hiểu em hơn. Em đang nghĩ gì thế?",
    "Cảm ơn em đã chia sẻ. Em muốn mình giúp gì nào? Mình sẵn sàng luôn!"
  ]);
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
