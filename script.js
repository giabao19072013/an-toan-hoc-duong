console.log('Script.js load OK! Chat giả siêu xịn');

// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé?')) {
    window.location.href = 'tel:111';
  }
});

// Chat giả siêu xịn: đa dạng, cảm xúc, random, hỗ trợ nhiều chủ đề
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
      "Em ơi, mình rất tiếc khi nghe chuyện đó... Tim mình thắt lại luôn khi em bị bắt nạt. Em đang cảm thấy sợ hãi, tổn thương hay cô đơn lắm phải không? Đừng giữ trong lòng nhé, em không sai, người bắt nạt mới sai. Hãy nói với thầy cô chủ nhiệm hoặc ban giám hiệu ngay hôm nay, họ sẽ bảo vệ em. Nếu sợ hoặc nguy hiểm, gọi 111 để được hỗ trợ khẩn cấp 24/24. Em không một mình đâu, mình ở đây lắng nghe em từng chút một. Em có muốn mình gợi ý cách nói chuyện với thầy cô không? 💙",
      "Ôi không, em bị bắt nạt à? Mình buồn quá đi... Em mạnh mẽ lắm khi chia sẻ với mình. Hãy nhớ: Em xứng đáng được an toàn và tôn trọng. Đừng trả đũa, giữ bình tĩnh và ghi lại chứng cứ (tin nhắn, video). Báo ngay cho người lớn tin cậy hoặc gọi 111 nếu cần. Mình sẽ ở đây an ủi em từng bước. Em kể thêm chi tiết đi, mình muốn giúp em vượt qua chuyện này.",
      "Em bị tổn thương rồi... Mình hiểu cảm giác sợ hãi và muốn trốn tránh lắm. Nhưng em dũng cảm lắm khi nói ra. Bây giờ em thử thở sâu đi: hít vào 4 giây, giữ 7 giây, thở ra 8 giây. Sau đó, hãy tìm thầy cô hoặc gọi 111 nhé. Em không đáng bị đối xử vậy đâu. Mình ở đây, em muốn mình kể chuyện vui để em cười lên không?"
    ]);
  }

  if (msg.includes('buồn') || msg.includes('áp lực') || msg.includes('stress') || msg.includes('khóc') || msg.includes('mệt')) {
    return randomChoice([
      "Em đang buồn hả? Mình ôm em thật chặt luôn 💙 Học hành, bạn bè hay gia đình đôi khi làm mình mệt mỏi và áp lực lắm. Em thử kể mình nghe xem, mình lắng nghe hết. Nếu nặng, gọi 111 để được tư vấn tâm lý miễn phí nhé. Em xứng đáng được vui vẻ và được yêu thương. Em có muốn mình gợi ý cách thư giãn như nghe nhạc hoặc vẽ vời không?",
      "Buồn thì cứ khóc đi em, khóc xong sẽ nhẹ lòng hơn nhiều. Mình ở đây với em, không phán xét gì hết. Em đã cố gắng rất nhiều rồi, đừng tự trách mình nhé. Hãy nghỉ ngơi một chút, tâm sự với mình hoặc người thân. Em không cô đơn đâu. Em muốn mình kể chuyện vui để em cười lên không? 😊",
      "Mình hiểu cảm giác áp lực lắm... Em đang cố gắng từng ngày, mình tự hào về em. Hãy thử đi dạo, nghe nhạc yêu thích hoặc thở sâu 4-7-8. Nếu cần, gọi 111 để được hỗ trợ tâm lý. Em kể thêm đi, mình muốn giúp em vượt qua cảm giác này."
    ]);
  }

  if (msg.includes('giải') || msg.includes('toán') || msg.includes('bài tập') || msg.includes('lý') || msg.includes('hóa') || msg.includes('văn') || msg.includes('anh')) {
    return randomChoice([
      "Em cần giúp giải bài tập hả? Tuyệt vời! Kể chi tiết bài toán hoặc câu hỏi đi (ví dụ: 2x + 5 = 13, hoặc phân tích bài thơ...), mình sẽ giải từng bước dễ hiểu cho em nhé! Em học lớp mấy rồi? Phần nào khó nhất?",
      "Mình thích giúp em học lắm! Gửi bài tập cụ thể đi, mình giải chậm rãi, giải thích rõ ràng. Em đang học môn gì? Mình sẵn sàng luôn đây!",
      "Bài tập khó hả em? Đừng lo, mình ở đây giúp em từng bước. Kể mình nghe đề bài nhé, mình sẽ hướng dẫn em tự làm được luôn!"
    ]);
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

  // Trả lời chung siêu xịn, giữ cuộc trò chuyện
  return randomChoice([
    "Mình đang lắng nghe em đây 💙 Kể thêm đi, mình muốn hiểu em hơn. Em đang nghĩ gì thế?",
    "Cảm ơn em đã chia sẻ. Em muốn mình giúp gì nào? Mình sẵn sàng luôn!",
    "Em kể tiếp đi, mình không phán xét gì hết đâu. Mình là bạn thân mà! Có chuyện gì vui hôm nay không?",
    "Mình thấy em đang cần một người lắng nghe... Mình ở đây rồi. Em muốn tâm sự gì tiếp theo? Hoặc em muốn mình kể chuyện vui không?"
  ]);
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
