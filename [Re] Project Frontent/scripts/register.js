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

function register() {
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

    console.log(content);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let obj = JSON.parse(xhttp.response);
            hashcode = obj.message;
            if(!document.cookie){
                document.cookie = "hashcode=" + hashcode + ";expires=Thu, 01 Jan 2222 00:00:00 UTC;SameSite=none; Secure";
            }
            console.log(document.cookie)
            window.location.href = './../sources/index.html';
        }else if(this.readyState === 4){
            alert("Someting went wrong!");
            window.location.href = './../sources/register.html';
        }
    };
    xhttp.open("POST", "http://localhost:5000/users/register")
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(content))
}
