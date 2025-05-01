let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");
const sign = document.getElementById("sign");

sign.onclick = () => {
    if (sign.textContent == 'Sign Up') {
        document.querySelector(".login-section").style.display = "none";
        document.querySelector(".signup-section").style.display = "flex";
        document.querySelector(".seperator-text").style.display = "none"
        document.querySelector(".social-login").style.display = "none"
        document.querySelector(".p").textContent = "Have an account!";
        sign.textContent = "logIn";
    } else if (sign.textContent == 'logIn') {
        document.querySelector(".signup-section").style.display = "none";
        document.querySelector(".login-section").style.display = "flex";
        document.querySelector(".seperator-text").style.display = "block"
        document.querySelector(".social-login").style.display = "block"
        document.querySelector(".p").textContent = "Don't have an account?";
        sign.textContent = "Sign Up";
    }
}

async function logInUser(event) {
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    const user = {
        email, password
    }
    await axios.post("http://localhost:2000/user/login", user)
        .then(response => {
            if (response.data.success) {
                alert(response.data.message)
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                window.location.href = "./chatApp.html"
            } else {
                alert(response.data.message)
            }

        })
        .catch(err => console.log(err))
}

function saveUser(event) {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email1.value;
    const phone = event.target.phone.value
    const password = event.target.password1.value;
    const user = {
        name, email, phone, password
    }
    axios.post("http://localhost:2000/user/signup", user)
    
        .then(response => {
            alert(response.data.message)
            window.location.href="./index.html"
        })
        .catch(err => console.log(err))
}