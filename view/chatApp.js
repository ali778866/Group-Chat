const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');


window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token')
    let oldChat = JSON.parse(localStorage.getItem('localchat')) || []
    let lastMsgId = oldChat.length > 0 ? oldChat[oldChat.length - 1].id : 0;
    console.log('last msgid' , lastMsgId)
    const decoded = parseJwt(token);
    document.getElementById('userName').textContent = decoded.name;
    setInterval(() => {
        axios.get(`http://localhost:2000/chat/get-chat?lastmsgid=${lastMsgId}`, { headers: { "Authorization": token } })
        .then((response) => {
            const newMessages = response.data.allMessage;
            let localChat = oldChat.concat(newMessages)
            if (localChat.length > 10) {
                localChat = localChat.slice(localChat.length - 10);
            }
            localStorage.setItem('localchat', JSON.stringify(localChat))
            console.log(localChat);
            chatMessages.innerHTML = '';
            localChat.forEach((message) => {
              displayMessage(message.name, message.message);
            });
          });
      }, 1000);
})

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}


sendButton.addEventListener('click', () => {
    const userId = localStorage.getItem('userId')
    const message = messageInput.value;
    const token = localStorage.getItem('token')
    const name = parseJwt(token).name;
    const obj = {
        message,
        name,
        userId
    }
    if (message) {
        axios.post("http://localhost:2000/chat/add-chat", obj)
        .then((response)=>{
            displayMessage('You', response.data.message);
        })
        messageInput.value = '';
    }
});


function displayMessage(sender, text) {
    chatMessages.innerHTML += `<b>${sender}:</b> ${text}<br>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}