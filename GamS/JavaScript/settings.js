
function setAddSettingsPrintable() {
    let parent = document.getElementById("settings");
    let exists = false;
    let foundChild;
    [].forEach.call(parent.childNodes, function(child) {
        console.log(child.tagName);
        if (child.className === "settings") {
            exists = true;
            foundChild = child;
        }
    });
    let button = document.getElementById("settings-button");
    if(!exists){
        button.classList.add("blue-hue");

        let settingsDiv = document.createElement("div");
        settingsDiv.classList.add("settings");
        let blocker = document.createElement("div");
        blocker.classList.add("blocker");
        blocker.setAttribute('onclick', 'hideSettings(this)');

        let ul = document.createElement("ul");
        // <li className="Normal-link">
        //     <button id="badges-button" className="btn co" onClick="setBadgesPrintable()"><em
        //         className="fa fa-sign-out"></em></button>
        // </li>
        let logoutButton = document.createElement("button");
        logoutButton.classList.add("btn");
        logoutButton.classList.add("co");
        logoutButton.classList.add("position-button");
        logoutButton.setAttribute('onclick', "window.location.href='./HTMLdocs/loginPage.html'")
        let em = document.createElement("em");
        em.classList.add("fa");
        em.classList.add("fa-sign-out");
        em.style.fontSize = "48px";


        for (let settingsIndex = 1; settingsIndex <= 4; settingsIndex++) {
            let li = document.createElement("li");
            li.style.verticalAlign = "0px";

            let divButton = document.createElement("div");
            divButton.classList.add("mid");

            let label = document.createElement("label");
            label.classList.add("rocker");
            label.classList.add("rocker-small");

            let inputCheckbox = document.createElement("input");
            inputCheckbox.type = "checkbox";
            inputCheckbox.checked = true;
            inputCheckbox.style.opacity = 0;

            let spanSwitchLeft = document.createElement("span");
            spanSwitchLeft.classList.add("switch-left");
            spanSwitchLeft.textContent = "On";

            let spanSwitchRight = document.createElement("span");
            spanSwitchRight.classList.add("switch-right");
            spanSwitchRight.textContent = "Off";

            let text = document.createElement("p");
            text.textContent = "Setting 1";
            text.style.padding = "10px";

            label.appendChild(inputCheckbox);
            label.appendChild(spanSwitchLeft);
            label.appendChild(spanSwitchRight);

            divButton.appendChild(label);
            divButton.appendChild(text);
            li.appendChild(divButton);
            ul.appendChild(li);
        }
        logoutButton.appendChild(em);
        settingsDiv.appendChild(blocker);
        settingsDiv.appendChild(ul);
        settingsDiv.appendChild(logoutButton);

        parent.appendChild(settingsDiv);
        let settingsButton = document.getElementById("badges");
        let size = settingsButton.children.length;
        if (size !== 0) {
            let settingsDiv = settingsButton.firstChild.firstChild;
            settingsDiv.click();
        }
    }else {
        button.classList.remove("blue-hue");
        parent.removeChild(foundChild);
    }
}

function showSettings(element) {
    let formPopup = element.parentElement.childNodes[3];
    formPopup.style.display = "block";
}

function hideSettings(element) {
    let button = document.getElementById("settings-button");
    button.classList.remove("blue-hue");
    let parent = element.parentElement;
    parent.remove();
}