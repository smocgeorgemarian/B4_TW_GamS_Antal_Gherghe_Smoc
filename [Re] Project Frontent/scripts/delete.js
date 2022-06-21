
let hashcode;

//API CALL TO DELETE ACCOUNT
function deleteAcount() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let content = {
        "username" : email,
        "password" : password
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            hashcode = document.cookie.split(";")[0]
                .split('=')[1];
            document.cookie = "hashcode=" + hashcode + ";expires=Thu, 01 Jan 1970 00:00:00 UTC;SameSite=none; Secure";
            window.location.href = './../sources/index.html';
        }else if(this.readyState === 4 && this.status !== 200){
            alert("Someting went wrong!");
            window.location.href = './../sources/deleteAccount.html';
        }
    };
    xhttp.open("DELETE", "http://localhost:5000/users/delete")
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(content))

}

if (!document.cookie)
    window.location.href = './../sources/index.html';
