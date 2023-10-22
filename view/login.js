let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = () => {
    if(password.type === "password") {
        password.type = "text";
        eyeicon.src = "./css/eye-open.png"
    } else {
        password.type = "password";
        eyeicon.src="./css/eye-close.png"
    }
}

async function logInUser(event) {
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    const user = {
        email, password
    }
}