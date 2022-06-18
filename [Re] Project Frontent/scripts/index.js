function initList(isLogged){
    let ulElement=document.getElementById("OptionList");
    let liElement = document.createElement("li");
    let aboutBtn = document.createElement("button");
    aboutBtn.innerText="About our services";
    aboutBtn.setAttribute("onclick","displayText()");
    ulElement.appendChild(liElement);
    if (isLogged===false){
        let elementDiv=document.createElement("div");
        elementDiv.setAttribute("class","element");
        let elementDiv2=document.createElement("div");
        elementDiv2.setAttribute("class","element");
        let loginBtn = document.createElement("button");
        loginBtn.innerText="Login";
        loginBtn.setAttribute("onclick","window.location.href = 'login.html';")
        let registerBtn = document.createElement("button");
        registerBtn.innerText="Register";
        registerBtn.setAttribute("onclick","window.location.href = 'register.html';")
        elementDiv.appendChild(loginBtn);
        elementDiv2.appendChild(registerBtn)
        liElement.appendChild(elementDiv);
        liElement.appendChild(elementDiv2);
    }
    else{
        let elementDiv = document.createElement("div");
        elementDiv.setAttribute("class","element");
        let elementDiv2 = document.createElement("div");
        elementDiv2.setAttribute("class","element");
        let logoutBtn = document.createElement("button");
        logoutBtn.innerText="Logout";
        logoutBtn.setAttribute("onclick","logout()");
        let controlPanelBtn = document.createElement("button");
        controlPanelBtn.innerText="Control Panel";
        controlPanelBtn.setAttribute("onclick","window.location.href = 'controlPanel.html';");
        elementDiv.appendChild(logoutBtn);
        elementDiv2.appendChild(controlPanelBtn);
        liElement.appendChild(elementDiv);
        liElement.appendChild(elementDiv2);
    }
    let elementDiv=document.createElement("div");
    elementDiv.setAttribute("class","element");
    elementDiv.appendChild(aboutBtn);
    liElement.appendChild(elementDiv);
}
function displayText(){
    let paragraph=document.getElementById("ParagraphContrainer");
    if(paragraph.style.display === 'none')
        paragraph.style.display = 'block';
    else
        paragraph.style.display = 'none';
}

let hashcode = sessionStorage.getItem("hash_code")

function logout(){

    let content = {
        "username" : hashcode,
    }

    console.log(hashcode);

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            sessionStorage.removeItem("hash_code");
            window.location.href = './../sources/login.html';
        }
    };
    xhttp.open("POST", "http://localhost:5000/users/logout")
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(JSON.stringify(content))

}

//true-user logat
initList(hashcode !== null);