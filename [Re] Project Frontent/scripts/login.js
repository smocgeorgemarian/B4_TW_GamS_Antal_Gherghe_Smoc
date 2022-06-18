let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
function login() {
    fetch('http://localhost:???/users/login', {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
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

module.exports = {
    hashcode
}