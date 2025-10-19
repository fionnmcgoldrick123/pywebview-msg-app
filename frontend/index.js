const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    messageInput.value = '';
    // TODO: send message to FastAPI backend here
});

messageInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});