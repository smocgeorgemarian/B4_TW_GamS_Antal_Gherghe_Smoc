function initList(isLogged){
    let ulElement=document.getElementById("OptionList");
    let liElement = document.createElement("li");
    let aboutBtn = document.createElement("button");
    aboutBtn.innerText="About our services";
    aboutBtn.setAttribute("onclick","displayText()");
    ulElement.appendChild(liElement);
    if (isLogged===false){
        let loginBtn = document.createElement("button");
        loginBtn.innerText="Login";
        loginBtn.setAttribute("onclick","window.location.href = 'login.html';")
        let registerBtn = document.createElement("button");
        registerBtn.innerText="Register";
        registerBtn.setAttribute("onclick","window.location.href = 'register.html';")
        liElement.appendChild(loginBtn);
        liElement.appendChild(registerBtn);
    }
    else{
        let logoutBtn = document.createElement("button");
        logoutBtn.innerText="Logout";
        logoutBtn.setAttribute("onclick","window.location.href = 'login.html';");
        let controlPanelBtn = document.createElement("button");
        controlPanelBtn.innerText="Control Panel";
        controlPanelBtn.setAttribute("onclick","window.location.href = 'controlPanel.html';");
        liElement.appendChild(controlPanelBtn);
        liElement.appendChild(logoutBtn);
    }
    liElement.appendChild(aboutBtn);
}
function displayText(){
    let paragraph=document.getElementById("ParagraphContrainer");
    if(paragraph.style.display === 'none')
        paragraph.style.display = 'block';
    else
        paragraph.style.display = 'none';
}
//true-user logat
initList(true);