function setBadgesPrintable() {
    let parent = document.getElementById("badges");
    let exists = false;
    let foundChild;
    [].forEach.call(parent.childNodes, function(child) {
        console.log(child.tagName);
        if (child.className === "badges") {
            exists = true;
            foundChild = child;
        }
    });
    let button = document.getElementById("badges-button");
    if(!exists) {
        button.classList.add("blue-hue");
        let badgesDiv = document.createElement("div");
        badgesDiv.classList.add("badges");
        let blocker = document.createElement("blocker");
        blocker.setAttribute('onclick', "hideBadges(this)");
        // create list
        let ul = document.createElement("ul");
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

        badgesDiv.appendChild(blocker);
        badgesDiv.appendChild(ul);
        parent.appendChild(badgesDiv);
    } else {
        button.classList.remove("blue-hue");
        parent.removeChild(foundChild);
    }
}