console.log('Script.js load OK! Sidebar menu bên trái + chat giả siêu xịn');

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

  // Phân tích câu hỏi: check nhiều từ khóa kết hợp
  if (msg.includes('bắt nạt') || msg.includes('bạo lực') || msg.includes('đánh') || msg.includes('xúc phạm') || msg.includes('cô lập')) {
    if (msg.includes('mạng') || msg.includes('cyber') || msg.includes('tiktok') || msg.includes('facebook') || msg.includes('online')) {
      return randomChoice([
        "Em bị bắt nạt trên mạng hả? Mình hiểu cảm giác tổn thương và sợ hãi khi bị xúc phạm online lắm. Em đang cảm thấy thế nào? Đừng im lặng nhé, chụp màn hình chứng cứ, báo cáo tài khoản trên nền tảng, và kể với thầy cô hoặc phụ huynh. Theo Luật An ninh mạng 2018, người bắt nạt có thể bị phạt. Nếu nặng, gọi 111 để được hỗ trợ. Mình ở đây, em muốn mình hướng dẫn cách báo cáo TikTok/Facebook không?",
        "Cyberbullying là chuyện nghiêm trọng em ơi. Mình buồn khi em bị vậy. Em kể chi tiết đi, mình phân tích xem. Nhớ đừng trả đũa, giữ bình tĩnh, và báo ngay cho thầy cô. Gọi 111 nếu em cảm thấy nguy hiểm. Em không một mình, mình sẽ an ủi em."
      ]);
    } else {
      return randomChoice([
        "Em bị bắt nạt ở trường à? Mình rất tiếc và lo cho em. Em đang sợ hãi hay tổn thương lắm phải không? Đừng giữ trong lòng, em không sai, người bắt nạt mới sai. Hãy nói với thầy cô hoặc gọi 111 ngay. Mình ở đây lắng nghe em. Em muốn mình gợi ý cách nói chuyện với thầy cô không? 💙",
        "Ôi không, em bị đánh hoặc xúc phạm hả? Tim mình thắt lại luôn. Em mạnh mẽ lắm khi chia sẻ. Hãy ghi lại chứng cứ và báo ngay ban giám hiệu. Theo Luật Trẻ em 2016, em có quyền được bảo vệ. Gọi 111 nếu cần. Mình sẽ ở đây an ủi em. Kể thêm đi!"
      ]);
    }
  }

  // ... (giữ nguyên phần còn lại của generateSuperSmartReply như trước, anh không lặp lại để ngắn gọn)

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
