const link = document.getElementById("link").value;
const email = document.getElementById("email").value;
const cemail = document.getElementById("cemail").value;
const pass = document.getElementById("password").value;
const cpass = document.getElementById("cpassword").value;
function getInputValue(){
    if(email !== cemail){
        alert("Email differs from confirm email!");
        return;
    }
    if(pass !== cpass) {
        alert("Password differs from confirm password!");
        return;
    }
    register();
}
function register() {
    fetch('http://localhost:???/users/register', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "link" : link,
            "email": email,
            "password": password
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}
