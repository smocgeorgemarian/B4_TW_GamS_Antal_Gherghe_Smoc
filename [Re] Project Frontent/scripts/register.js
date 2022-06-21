if (document.cookie)
    window.location.href = './../sources/index.html';

let hashcode;

function getInputValue(){

    let email = document.getElementById("email").value;
    let cemail = document.getElementById("cemail").value;
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("cpassword").value;

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

//CALL TO API FOR REGISTER
async function register() {
    let link = document.getElementById("link").value;
    let email = document.getElementById("email").value;
    let cemail = document.getElementById("cemail").value;
    let pass = document.getElementById("password").value;
    let cpass = document.getElementById("cpassword").value;

    let content = {
        "username" : email,
        "password" : pass,
        "site" : link
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = await async function() {
        if (this.readyState === 4 && this.status === 200) {
            let obj = JSON.parse(xhttp.response);
            hashcode = obj.message;
            window.location.href = './../sources/login.html';
        }else if(this.readyState === 4 && this.status !== 200){
            alert("Someting went wrong!");
            window.location.href = './../sources/register.html';
        }
    };
    xhttp.open("POST", "http://localhost:5000/users/register")
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(content))
}
