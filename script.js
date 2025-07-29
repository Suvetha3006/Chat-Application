const socket = io();
let username = "";

function setUsername() {
  const input = document.getElementById("usernameInput");
  username = input.value.trim();
  if (username !== "") {
    document.getElementById("usernamePrompt").style.display = "none";
    document.getElementById("chatBox").style.display = "block";
  }
}

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    const timestamp = new Date().toLocaleTimeString();
    socket.emit("chat message", { user: username, msg: input.value, time: timestamp });
    input.value = "";
  }
});

socket.on("chat message", function (data) {
  const item = document.createElement("li");
  item.innerHTML = `<strong>${data.user}</strong> [${data.time}]: ${data.msg}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});