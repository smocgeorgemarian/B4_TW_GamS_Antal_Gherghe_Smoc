
let hashcode

//CALL TO API FOR LOGIN
function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let content = {
        "username" : email,
        "password" : password
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let obj = JSON.parse(xhttp.response);
            hashcode = obj.message;

            document.cookie = "hashcode=" + hashcode + ";expires=Thu, 01 Jan 2222 00:00:00 UTC;SameSite=none; Secure";
            window.location.href = './../sources/index.html';
        }else if(this.readyState === 4 && this.status !== 200){
            alert("Someting went wrong!");
            window.location.href = './../sources/login.html';
        }
    };
    xhttp.open("POST", "http://localhost:5000/users/login")
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(content))

}

if (document.cookie)
    window.location.href = './../sources/index.html';
