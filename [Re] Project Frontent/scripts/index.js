function initList(isLogged) {
    let ulElement = document.getElementById("OptionList");
    let liElement = document.createElement("li");
    let aboutBtn = document.createElement("button");
    aboutBtn.innerText = "About our services";
    aboutBtn.setAttribute("onclick", "displayText()");
    ulElement.appendChild(liElement);
    if (isLogged === false) {
        let elementDiv = document.createElement("div");
        elementDiv.setAttribute("class", "element");
        let elementDiv2 = document.createElement("div");
        elementDiv2.setAttribute("class", "element");
        let loginBtn = document.createElement("button");
        loginBtn.innerText = "Login";
        loginBtn.setAttribute("onclick", "myRedirect = true; window.location.href = 'login.html';")
        let registerBtn = document.createElement("button");
        registerBtn.innerText = "Register";
        registerBtn.setAttribute("onclick", "myRedirect = true; window.location.href = 'register.html';")
        elementDiv.appendChild(loginBtn);
        elementDiv2.appendChild(registerBtn)
        liElement.appendChild(elementDiv);
        liElement.appendChild(elementDiv2);
    } else {
        let elementDiv = document.createElement("div");
        elementDiv.setAttribute("class", "element");
        let elementDiv2 = document.createElement("div");
        elementDiv2.setAttribute("class", "element");
        let elementDiv3 = document.createElement("div");
        elementDiv3.setAttribute("class", "element");
        let logoutBtn = document.createElement("button");
        logoutBtn.innerText = "Logout";
        logoutBtn.setAttribute("onclick", "logout()");
        let controlPanelBtn = document.createElement("button");
        controlPanelBtn.innerText = "Control Panel";
        controlPanelBtn.setAttribute("onclick", "myRedirect = true; window.location.href = 'controlPanel.html';");
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete Account";
        deleteBtn.setAttribute("onclick", "myRedirect = true; window.location.href = 'deleteAccount.html';");
        elementDiv.appendChild(logoutBtn);
        elementDiv2.appendChild(controlPanelBtn);
        elementDiv3.appendChild(deleteBtn);
        liElement.appendChild(elementDiv);
        liElement.appendChild(elementDiv2);
        liElement.appendChild(elementDiv3);
    }
    let elementDiv = document.createElement("div");
    elementDiv.setAttribute("class", "element");
    elementDiv.appendChild(aboutBtn);
    liElement.appendChild(elementDiv);
}

function displayText() {
    let paragraph = document.getElementById("ParagraphContrainer");
    if (paragraph.style.display === 'none')
        paragraph.style.display = 'block';
    else
        paragraph.style.display = 'none';
}

let isLogged;
if (document.cookie) {
    hashcode = document.cookie.split(";")[0]
        .split('=')[1];
    isLogged = true;
} else {
    isLogged = false;
}

//CALL TO API LOGOUT
function logout() {

    let content = {
        "hash_code": hashcode,
    }

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.cookie = "hashcode=" + hashcode + ";expires=Thu, 01 Jan 1970 00:00:00 UTC;SameSite=none; Secure";
            window.location.href = './../sources/login.html';
        }
    };
    myRedirect = true;
    xhttp.open("POST", "http://localhost:5000/users/logout")
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify(content))

}

initList(isLogged);