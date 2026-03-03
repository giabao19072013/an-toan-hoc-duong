console.log('Script.js load OK! Sử dụng chat giả thông minh');

// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé?')) {
    window.location.href = 'tel:111';
  }
});

// Chat giả "xịn": đa dạng, cảm xúc, random, hỗ trợ nhiều chủ đề
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

  // Hiệu ứng typing (chờ 1-2 giây như AI thật đang nghĩ)
  const typingDiv = document.createElement('div');
  typingDiv.className = 'ai-msg typing';
  typingDiv.textContent = 'Bạn Thân AI đang nghĩ...';
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  setTimeout(() => {
    chatBox.removeChild(typingDiv); // Xóa typing
    const reply = generateSmartReply(message.toLowerCase());
    addMessage('Bạn Thân AI: ' + reply, 'ai');
  }, 1500 + Math.random() * 1500); // Random thời gian 1.5-3 giây
}

function generateSmartReply(msg) {
  // Danh sách từ khóa và câu trả lời đa dạng (random để giống thật)
  if (msg.includes('bắt nạt') || msg.includes('bạo lực') || msg.includes('bị đánh') || msg.includes('bắt nạt')) {
    const replies = [
      "Ôi em ơi, mình rất tiếc khi nghe chuyện đó. Em đang cảm thấy thế nào? Đừng im lặng nhé, hãy kể với thầy cô hoặc người lớn tin cậy ngay. Nếu sợ, gọi 111 để được hỗ trợ 24/24, họ sẽ giúp em an toàn. Mình ở đây lắng nghe em đây...",
      "Em bị bắt nạt à? Tim mình thắt lại luôn. Em không đáng bị đối xử vậy đâu. Hãy nói với ai đó em tin tưởng, hoặc gọi 111 nhé. Mình sẽ ở đây an ủi em từng bước một. Em có muốn kể chi tiết không?",
      "Không sao đâu em, mình hiểu cảm giác sợ hãi và cô đơn lắm. Em mạnh mẽ lắm khi chia sẻ với mình. Bây giờ em thử thở sâu đi, rồi mình cùng nghĩ cách xử lý nhé. Gọi 111 nếu cần giúp đỡ khẩn cấp. Em không một mình đâu!"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  if (msg.includes('buồn') || msg.includes('buồn bã') || msg.includes('áp lực') || msg.includes('stress')) {
    const replies = [
      "Em đang buồn hả? Mình ôm em cái nào 💙. Học hành hay bạn bè đôi khi làm mình mệt mỏi lắm. Em thử kể mình nghe xem, mình lắng nghe hết. Nếu nặng, gọi 111 để được tư vấn tâm lý miễn phí nhé. Em xứng đáng được vui vẻ mà!",
      "Buồn thì cứ khóc đi em, khóc xong sẽ nhẹ lòng hơn. Mình ở đây với em, không phán xét gì hết. Em có muốn mình gợi ý cách thư giãn không? Như nghe nhạc, vẽ vời, hoặc thở 4-7-8. Em kể thêm đi nhé!",
      "Mình hiểu cảm giác áp lực lắm... Em đã cố gắng rất nhiều rồi. Đừng tự trách mình nhé. Hãy nghỉ ngơi một chút, tâm sự với mình hoặc người thân. Em không cô đơn đâu, mình luôn ở đây."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  if (msg.includes('giải') || msg.includes('toán') || msg.includes('bài tập') || msg.includes('văn') || msg.includes('lý') || msg.includes('hóa')) {
    return "Em cần giúp giải bài tập hả? Tuyệt vời! Kể chi tiết bài toán hoặc câu hỏi đi (ví dụ: 2x + 5 = 13, hoặc phân tích đoạn văn), mình sẽ giải từng bước cho em nhé! Em học lớp mấy rồi?";
  }

  if (msg.includes('chào') || msg.includes('hi') || msg.includes('xin chào') || msg.includes('hello')) {
    const replies = [
      "Chào em yêu! Mình là Bạn Thân AI đây 💚 Hôm nay em thế nào? Có chuyện gì vui hay muốn tâm sự không?",
      "Hi hi! Mình đang chờ em đây nè 😊 Kể mình nghe em đang nghĩ gì nào?",
      "Chào bạn nhỏ! Mình vui lắm khi em đến chat với mình. Em đang cảm thấy thế nào hôm nay?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }

  if (msg.includes('cảm ơn') || msg.includes('cảm ơn bạn')) {
    return "Không có gì đâu em, mình luôn ở đây vì em mà 💕 Có gì cần nữa cứ gọi mình nhé!";
  }

  // Trả lời chung nếu không khớp từ khóa
  const generalReplies = [
    "Mình đang lắng nghe em đây. Kể thêm đi, mình muốn hiểu em hơn!",
    "Em đang nghĩ gì thế? Mình ở đây để an ủi và giúp em nhé 💙",
    "Cảm ơn em đã chia sẻ. Em muốn mình giúp gì nào? Mình sẵn sàng luôn!",
    "Em kể tiếp đi, mình không phán xét gì hết đâu. Mình là bạn thân mà!"
  ];
  return generalReplies[Math.floor(Math.random() * generalReplies.length)];
}

function addMessage(text, type) {
  const div = document.createElement('div');
  div.textContent = text;
  div.className = type === 'user' ? 'user-msg' : 'ai-msg';
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
