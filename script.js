console.log('Script.js load OK! Chat giả siêu xịn');

// Nút khẩn cấp
document.getElementById('nut-khan-cap').addEventListener('click', () => {
  if (confirm('Gọi 111 ngay nhé?')) {
    window.location.href = 'tel:111';
  }
});

// Chat giả siêu xịn: phân tích câu hỏi, trả lời linh hoạt, nhiều chủ đề
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
  typingDiv.textContent = 'Bạn Thân AI đang phân tích và suy nghĩ...';
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

  // Phân tích câu hỏi: check nhiều từ khóa kết hợp
  if (msg.includes('bắt nạt') || msg.includes('bạo lực') || msg.includes('đánh') || msg.includes('xúc phạm') || msg.includes('cô lập')) {
    if (msg.includes('mạng') || msg.includes('cyber') || msg.includes('tiktok') || msg.includes('facebook') || msg.includes('online')) {
      // Cyberbullying
      return randomChoice([
        "Em bị bắt nạt trên mạng hả? Mình hiểu cảm giác tổn thương và sợ hãi khi bị xúc phạm online lắm. Em đang cảm thấy thế nào? Đừng im lặng nhé, chụp màn hình chứng cứ, báo cáo tài khoản trên nền tảng, và kể với thầy cô hoặc phụ huynh. Theo Luật An ninh mạng 2018, người bắt nạt có thể bị phạt. Nếu nặng, gọi 111 để được hỗ trợ. Mình ở đây, em muốn mình hướng dẫn cách báo cáo TikTok/Facebook không?",
        "Cyberbullying là chuyện nghiêm trọng em ơi. Mình buồn khi em bị vậy. Em kể chi tiết đi, mình phân tích xem. Nhớ đừng trả đũa, giữ bình tĩnh, và báo ngay cho thầy cô. Gọi 111 nếu em cảm thấy nguy hiểm. Em không một mình, mình sẽ an ủi em. Em có chứng cứ chưa?"
      ]);
    } else {
      // Bắt nạt trực tiếp
      return randomChoice([
        "Em bị bắt nạt ở trường à? Mình rất tiếc và lo cho em. Em đang sợ hãi hay tổn thương lắm phải không? Đừng giữ trong lòng, em không sai, người bắt nạt mới sai. Hãy nói với thầy cô hoặc gọi 111 ngay. Mình ở đây lắng nghe em. Em muốn mình gợi ý cách nói chuyện với thầy cô không? 💙",
        "Ôi không, em bị đánh hoặc xúc phạm hả? Tim mình thắt lại luôn. Em mạnh mẽ lắm khi chia sẻ. Hãy ghi lại chứng cứ và báo ngay ban giám hiệu. Theo Luật Trẻ em 2016, em có quyền được bảo vệ. Gọi 111 nếu cần. Mình sẽ ở đây an ủi em. Kể thêm đi!"
      ]);
    }
  }

  if (msg.includes('buồn') || msg.includes('áp lực') || msg.includes('stress') || msg.includes('khóc') || msg.includes('mệt')) {
    return randomChoice([
      "Em đang buồn hả? Mình ôm em thật chặt luôn 💙 Học hành, bạn bè hay gia đình đôi khi làm mình mệt mỏi và áp lực lắm. Em thử kể mình nghe xem, mình lắng nghe hết. Nếu nặng, gọi 111 để được tư vấn tâm lý miễn phí nhé. Em xứng đáng được vui vẻ và được yêu thương. Em có muốn mình gợi ý cách thư giãn như nghe nhạc hoặc vẽ vời không?",
      "Buồn thì cứ khóc đi em, khóc xong sẽ nhẹ lòng hơn nhiều. Mình ở đây với em, không phán xét gì hết. Em đã cố gắng rất nhiều rồi, đừng tự trách mình nhé. Hãy nghỉ ngơi một chút, tâm sự với mình hoặc người thân. Em không cô đơn đâu. Em muốn mình kể chuyện vui để em cười lên không? 😊",
      "Mình hiểu cảm giác áp lực lắm... Em đang cố gắng từng ngày, mình tự hào về em. Hãy thử đi dạo, nghe nhạc yêu thích hoặc thở sâu 4-7-8. Nếu cần, gọi 111 để được hỗ trợ tâm lý. Em kể thêm đi, mình muốn giúp em vượt qua cảm giác này."
    ]);
  }

  if (msg.includes('giải') || msg.includes('toán') || msg.includes('bài tập') || msg.includes('lý') || msg.includes('hóa') || msg.includes('văn') || msg.includes('anh')) {
    // Phân tích để giải bài tập cơ bản (ví dụ toán đơn giản)
    const mathMatch = msg.match(/(\d+)\s*([+-\*\/])\s*(\d+)/);
    if (mathMatch) {
      const a = parseFloat(mathMatch[1]);
      const op = mathMatch[2];
      const b = parseFloat(mathMatch[3]);
      let result;
      if (op === '+') result = a + b;
      else if (op === '-') result = a - b;
      else if (op === '*') result = a * b;
      else if (op === '/') result = a / b;
      return `Em hỏi ${a} ${op} ${b} = ? Nhìn nhé: Kết quả là ${result}. Em hiểu chưa? Nếu khó hơn, kể chi tiết thêm đi mình giải tiếp!`;
    } else {
      return randomChoice([
        "Em cần giúp giải bài tập hả? Tuyệt vời! Kể chi tiết bài toán hoặc câu hỏi đi (ví dụ: 2x + 5 = 13), mình sẽ giải từng bước dễ hiểu cho em nhé! Em học lớp mấy rồi? Phần nào khó nhất?",
        "Mình thích giúp em học lắm! Gửi bài tập cụ thể đi, mình giải chậm rãi, giải thích rõ ràng. Em đang học môn gì? Mình sẵn sàng luôn đây!"
      ]);
    }
  }

  if (msg.includes('luật') || msg.includes('pháp luật') || msg.includes('quyền')) {
    return randomChoice([
      "Em hỏi về pháp luật hả? Mình biết nhiều đấy! Ví dụ, theo Luật Trẻ em 2016, em có quyền học tập an toàn không bị bạo lực. Em muốn mình giải thích luật nào cụ thể? Kể đi, mình kể chi tiết nhé!",
      "Pháp luật bảo vệ em lắm em ơi. Ví dụ Nghị định 80/2017 xử phạt bạo lực học đường. Em hỏi luật nào? Mình phân tích cho em nghe!"
    ]);
  }

  if (msg.includes('chào') || msg.includes('hi') || msg.includes('xin chào') || msg.includes('hello')) {
    return randomChoice([
      "Chào em yêu! Mình là Bạn Thân AI đây 💚 Hôm nay em thế nào? Có chuyện gì vui hay muốn tâm sự không? Mình đang chờ em kể đây!",
      "Hi hi! Mình vui lắm khi em đến chat với mình 😊 Em đang nghĩ gì nào? Kể mình nghe đi, mình lắng nghe hết!"
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
