console.log('Script.js load OK! Chat giả siêu thông minh');

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
  typingDiv.textContent = 'Bạn Thân AI đang nghĩ...';
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    chatBox.removeChild(typingDiv);
    const reply = generateSuperSmartReply(message.toLowerCase());
    addMessage('Bạn Thân AI: ' + reply, 'ai');
  }, 1500 + Math.random() * 2000); // Random 1.5-3.5 giây
}

function generateSuperSmartReply(msg) {
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (msg.includes('bắt nạt') || msg.includes('bạo lực') || msg.includes('đánh') || msg.includes('xúc phạm')) {
    return randomChoice([
      "Ôi em ơi, mình rất tiếc khi nghe chuyện đó... Em đang cảm thấy sợ hãi hay tổn thương lắm phải không? Đừng giữ trong lòng nhé, hãy nói với thầy cô hoặc người lớn tin cậy ngay. Nếu nguy hiểm, gọi 111 để được hỗ trợ khẩn cấp 24/24. Em không cô đơn đâu, mình ở đây lắng nghe em từng chút một 💙 Em có muốn kể thêm không?",
      "Em bị bắt nạt à? Tim mình thắt lại luôn... Em mạnh mẽ lắm khi chia sẻ với mình. Hãy nhớ: Em không sai, người bắt nạt mới sai. Đừng trả đũa, giữ bình tĩnh và báo ngay cho giáo viên hoặc gọi 111. Mình sẽ ở đây an ủi em, em muốn mình gợi ý cách nói chuyện với thầy cô không?",
      "Không sao đâu em, mình hiểu cảm giác bị tổn thương và sợ hãi lắm. Em đã rất dũng cảm khi nói ra. Bây giờ em thử thở sâu đi, rồi mình cùng nghĩ cách xử lý nhé. Gọi 111 nếu cần giúp đỡ ngay lập tức. Em kể thêm chi tiết đi, mình muốn giúp em!"
    ]);
  }

  if (msg.includes('buồn') || msg.includes('áp lực') || msg.includes('stress') || msg.includes('khóc')) {
    return randomChoice([
      "Em đang buồn hả? Mình ôm em thật chặt luôn 💙 Học hành, bạn bè hay gia đình đôi khi làm mình mệt mỏi lắm. Em thử kể mình nghe xem, mình lắng nghe hết. Nếu nặng, gọi 111 để được tư vấn tâm lý miễn phí nhé. Em xứng đáng được vui vẻ và được yêu thương mà!",
      "Buồn thì cứ khóc đi em, khóc xong sẽ nhẹ lòng hơn nhiều. Mình ở đây với em, không phán xét gì hết. Em có muốn mình gợi ý cách thư giãn không? Như nghe nhạc yêu thích, vẽ vời, hoặc đi dạo. Em kể thêm đi nhé, mình muốn giúp em cười lại!",
      "Mình hiểu cảm giác áp lực lắm... Em đã cố gắng rất nhiều rồi, đừng tự trách mình nhé. Hãy nghỉ ngơi một chút, tâm sự với mình hoặc người thân. Em không cô đơn đâu, mình luôn ở đây. Em muốn mình kể chuyện vui để em cười không?"
    ]);
  }

  if (msg.includes('giải') || msg.includes('toán') || msg.includes('bài tập') || msg.includes('lý') || msg.includes('hóa') || msg.includes('văn')) {
    return "Em cần giúp giải bài tập hả? Tuyệt vời! Kể chi tiết bài toán hoặc câu hỏi đi (ví dụ: 2x + 5 = 13, hoặc phân tích bài thơ...), mình sẽ giải từng bước dễ hiểu cho em nhé! Em học lớp mấy rồi? Có phần nào khó nhất không?";
  }

  if (msg.includes('chào') || msg.includes('hi') || msg.includes('xin chào') || msg.includes('hello')) {
    return randomChoice([
      "Chào em yêu! Mình là Bạn Thân AI đây 💚 Hôm nay em thế nào? Có chuyện gì vui hay muốn tâm sự không? Mình đang chờ em kể đây!",
      "Hi hi! Mình vui lắm khi em đến chat với mình 😊 Em đang nghĩ gì nào? Kể mình nghe đi, mình lắng nghe hết!",
      "Chào bạn nhỏ! Mình luôn sẵn sàng làm bạn thân của em. Em đang cảm thấy thế nào hôm nay? Vui hay buồn, mình đều ở đây!"
    ]);
  }

  if (msg.includes('cảm ơn') || msg.includes('thanks') || msg.includes('cảm ơn bạn')) {
    return randomChoice([
      "Không có gì đâu em, mình luôn ở đây vì em mà 💕 Có gì cần nữa cứ gọi mình nhé!",
      "Mình vui lắm khi giúp được em! Em cười lên đi nào 😊",
      "Cảm ơn em đã tin tưởng mình. Mình tự hào về em lắm đấy!"
    ]);
  }

  // Trả lời chung siêu xịn
  return randomChoice([
    "Mình đang lắng nghe em đây 💙 Kể thêm đi, mình muốn hiểu em hơn. Em đang nghĩ gì thế?",
    "Cảm ơn em đã chia sẻ. Em muốn mình giúp gì nào? Mình sẵn sàng luôn!",
    "Em kể tiếp đi, mình không phán xét gì hết đâu. Mình là bạn thân mà! Có chuyện gì vui hôm nay không?",
    "Mình thấy em đang cần một người lắng nghe... Mình ở đây rồi. Em muốn tâm sự gì tiếp theo?"
  ]);
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
