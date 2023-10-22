let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = () => {
    if(password.type === "password") {
        password.type = "text";
        eyeicon.src = "/css/eye-open.png"
    } else {
        password.type = "password";
        eyeicon.src="/css/eye-close.png"
    }
}

function saveUser(event) {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value
    const password = event.target.password.value;
    const user = {
        name, email, phone, password
    }
    axios.post("http://localhost:4500/user/signup", user)
    
        .then(response => {
            alert(response.data.message)
            window.location.href="./login.html"
        })
        .catch(err => console.log(err))
}