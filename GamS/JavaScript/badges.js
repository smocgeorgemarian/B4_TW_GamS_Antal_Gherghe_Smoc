let badgesList = [];

function addUserToLevel() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("request sent");
        }

    }
    xhttp.open("PUT", "http://localhost:5002/services/username/addlevel");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        ...credentials
    }));
}

function getUserLevel() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("request sent");
            let link = document.getElementById("firstUl").children[4].firstChild;
            link.textContent = JSON.parse(xhttp.response)['message'];
        }
    }
    xhttp.open("POST", "http://localhost:5002/services/username/level");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        ...credentials
    }));
}

function drawItself(button, parent) {
    button.classList.add("blue-hue");
    let badgesDiv = document.createElement("div");
    badgesDiv.classList.add("badges");

    let blocker = document.createElement("div");
    blocker.classList.add("blocker");
    blocker.setAttribute('onclick', "hideBadges(this)");

    let ul = document.createElement("ul");
    ul.classList.add("inline-list");
    console.log("badges list size: " + badgesList.length);
    for (let badgeIndex in badgesList) {
        console.log("test");
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
}

function setBadgesList(button, parent) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("request sent");
            let tmpBadgesList = JSON.parse(xhttp.response);
            if (tmpBadgesList['message'] === "NULL")
                badgesList = ['./Resources/pig.webp'];
            else
                for (let i = 0; i < tmpBadgesList['message'].length; i++) {
                    badgesList.push(tmpBadgesList['message'][i]['reward']);
                }
            drawItself(button, parent);
        } else if (this.readyState === 4) {
            alert("Someting went wrong!");
        }
    };

    xhttp.open("POST", "http://localhost:5002/services/username/rewards/all");
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        ...credentials
    }));
}

function setBadgesPrintable() {
    let parent = document.getElementById("badges");
    let exists = false;
    let foundChild;
    [].forEach.call(parent.childNodes, function (child) {
        if (child.className === "badges") {
            exists = true;
            foundChild = child;
        }
    });
    let button = document.getElementById("badges-button");
    if (!exists) {
        setBadgesList(button, parent);
        return;
    }
    button.classList.remove("blue-hue");
    parent.removeChild(foundChild);
    badgesList = []

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
    if (element.style.border !== "" && !element.style.border.includes("white")) element.style.border = "solid white"; else element.style.border = "solid black";
}