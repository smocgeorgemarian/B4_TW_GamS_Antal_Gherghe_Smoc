let badgesList = ["./Resources/alien.png", "./Resources/alien1.png",
    "./Resources/alien2.png", "./Resources/alien3.png", "./Resources/spaceship.png"];

function setBadgesPrintable() {
    let parent = document.getElementById("badges");
    let exists = false;
    let foundChild;
    [].forEach.call(parent.childNodes, function(child) {
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

        let blocker = document.createElement("div");
        blocker.classList.add("blocker");
        blocker.setAttribute('onclick', "hideBadges(this)");

        let ul = document.createElement("ul");
        ul.classList.add("inline-list");
        for (let badgeIndex in badgesList) {
            let li = document.createElement("li");
            let div = document.createElement("div");
            div.classList.add("badge");
            div.setAttribute('onclick', 'setBorderPrintable(this)');
            let img = document.createElement("img");
            img.src = badgesList[badgeIndex];
            div.appendChild(img);
            li.appendChild(div);
            ul.appendChild(li);
        }

        badgesDiv.appendChild(blocker);
        badgesDiv.appendChild(ul);
        parent.appendChild(badgesDiv);

        let settingsButton = document.getElementById("settings");
        let size = settingsButton.children.length;
        if (size !== 0) {
            let settingsDiv = settingsButton.firstChild.firstChild;
            settingsDiv.click();
        }
    } else {
        button.classList.remove("blue-hue");
        parent.removeChild(foundChild);
    }
}

function hideBadges(element) {
    let settingsDiv = document.getElementById("settings").firstChild.firstChild;
    console.log(settingsDiv);
    let button = document.getElementById("badges-button");
    button.classList.remove("blue-hue");
    let parent = element.parentElement;
    parent.remove();
}

function setBorderPrintable(element) {
    if (element.style.border !== "" && !element.style.border.includes("white"))
        element.style.border = "solid white";
    else
        element.style.border = "solid black";
}