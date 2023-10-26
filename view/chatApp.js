const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

document.getElementById("groupButton").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "flex";
})
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".popup").style.display = "none";
})
document.querySelector(".close2").addEventListener("click", () => {
    document.querySelector(".popup2").style.display = "none";
})
function redirectLogin() {
    window.location.href = "./login.html"
}

window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token')
    const decoded = parseJwt(token);
    document.getElementById('userName').textContent = decoded.name;
    axios.get(`http://localhost:2000/group/show-group`, { headers: { "Authorization": token } })
        .then(res => {
            const userGroups = res.data.groups
            userGroups.forEach((group) => {
                getGroup(group.groupname, group.id)
            })
     })
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
    const token = localStorage.getItem('token')
    const groupId = localStorage.getItem('groupId')
    const message = messageInput.value;
    const userId = parseJwt(token).userId
    const name = parseJwt(token).name;
    const obj = {
        message,
        name,
        userId,
        groupId
    }
    if (message) {
        axios.post("http://localhost:2000/chat/add-chat", obj)
            .then((response) => {
                displayMessage('You', response.data.message);
            })
        messageInput.value = '';
    }
});


function displayMessage(sender, text) {
    chatMessages.innerHTML += `<b>${sender}:</b> ${text}<br>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function createGroup(event) {
    const token = localStorage.getItem('token')
    event.preventDefault();
    const groupName = event.target.groupName.value;
    axios.post("http://localhost:2000/group/create-group", { groupName }, { headers: { "Authorization": token } })
        .then(response => {
            alert(response.data.message)
            console.log(response.data.group)
            document.querySelector(".popup").style.display = "none";
            getGroup(response.data.group.groupname, response.data.group.id)
        }).catch(err => console.log(err))
}


function getGroup(groups, id) {
    const menuElm = document.getElementById("menu")
    menuElm.innerHTML += `<div class="group" onclick="showGroup(${id})">${groups}</div>`
}

function showGroup(id) {
    showGroupMessage(id);
    localStorage.setItem("groupId", id)
    const token = localStorage.getItem('token')
    const groupElm = document.getElementById("group")
    groupElm.innerHTML = '';
    axios.get(`http://localhost:2000/group/get-group/${id}`, { headers: { "Authorization": token } })
        .then(response => {
            groupElm.innerHTML += `<h2>${response.data.group.groupname}</h2>
                                <button onclick="showParticipants(${response.data.group.id})">Add Participants</button>`
            const users = response.data.users;
            users.forEach(user => {
                groupElm.innerHTML += `<div>${user.name}</div>`
            })
        })
}

function showParticipants(groupid) {
    document.querySelector(".popup2").style.display = "flex";
    const usersElm = document.getElementById("participant")
    usersElm.innerHTML = '';
    axios.get(`http://localhost:2000/user/show-participants/${groupid}`)
        .then(response => {
            const participants = response.data.users;
            participants.forEach(user => {
                usersElm.innerHTML += `<div><input type="checkbox" name="user" value="${user.id}">${user.name}</div>`
            })
            usersElm.innerHTML += `<input type="hidden" name="groupid" value="${groupid}">`
            usersElm.innerHTML += `<button type="submit">Add</button>`
        })

}

function addParticipant(event) {
    event.preventDefault();
    const groupid = event.target.groupid.value
    const form = event.target;
    const checkboxes = form.querySelectorAll('input[type="checkbox"][name="user"]:checked');
    const selectedIds = Array.from(checkboxes).map(checkbox => checkbox.value);
    console.log(selectedIds)
    axios.post(`http://localhost:2000/group/add-participants/${groupid}`, selectedIds)
        .then(reponse => {
            if (reponse.status === 201) {
                alert(reponse.data.message)
                document.querySelector(".popup2").style.display = "none";
            }
        }).catch(err => console.log(err))

}

function showGroupMessage(groupid) {
    const token = localStorage.getItem('token')
    let oldChat = JSON.parse(localStorage.getItem(`localchat${groupid}`)) || []
    let lastMsgId = oldChat.length > 0 ? oldChat[oldChat.length - 1].id : 0;
    const name = parseJwt(token).name;
    // setInterval(() => {
    axios.get(`http://localhost:2000/chat/get-group-chat/${groupid}?lastmsgid=${lastMsgId}`, { headers: { "Authorization": token } })
        .then((response) => {
            const newMessages = response.data.allMessage;
            chatMessages.innerHTML = '';
            let localChat = oldChat.concat(newMessages)
            if (localChat.length > 10) {
                localChat = localChat.slice(localChat.length - 10);
            }
            localStorage.setItem(`localchat${groupid}`, JSON.stringify(localChat))
            localChat.forEach((message) => {
                if (message.groupId === groupid) {
                    if(message.name == name){
                        displayMessage('You', message.message);
                    } else {
                        displayMessage(message.name, message.message);
                    }
                }
            });
        });
    //   }, 1000);
}