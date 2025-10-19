// Grab key elements from the page (chat box, input, and button)
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Function to create and display a new message bubble
function addMessage(text, sender = 'user') {
    // Create a new <div> element for the message
    const msg = document.createElement('div');
    // Add styling classes (base "message" + sender type: user/other)
    msg.classList.add('message', sender);
    // Set the text content of the message
    msg.textContent = text;
    // Add the new message to the chat container
    chatContainer.appendChild(msg);
    // Scroll down so the latest message is visible
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// When the Send button is clicked
sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim(); // remove extra spaces
    if (!text) return; // do nothing if input is empty
    addMessage(text, 'user'); // show the user’s message in chat
    messageInput.value = ''; // clear the input box
    // TODO: later send this message to FastAPI backend
});

// Allow pressing Enter to send the message instead of clicking the button
messageInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
