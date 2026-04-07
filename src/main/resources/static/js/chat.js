function sendMessage() {
    const input = document.getElementById('chat-input');
    const messageText = input.value.trim();

    if (messageText === "") return;

    // 현재 시간 포맷팅 (오후 3:21 형식)
    const now = new Date();
    const timeString = now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });

    const messageRow = document.createElement('div');
    messageRow.className = 'msg-row sent'; 

    // 말풍선과 시간을 함께 넣기
    messageRow.innerHTML = `
        <span class="msg-time">${timeString}</span>
        <div class="bubble">${messageText}</div>
    `;

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageRow);

    input.value = "";
    input.focus();
    scrollToBottom();
}

function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
console.log("자바스크립트 연결 성공!");