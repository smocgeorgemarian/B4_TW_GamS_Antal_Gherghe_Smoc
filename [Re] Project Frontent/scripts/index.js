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
        logoutBtn.setAttribute("onclick","window.location.href = 'login.html';");
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
//true-user logat
initList(true);