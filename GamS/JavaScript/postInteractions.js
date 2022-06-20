//Like Manager
//de forma ca na
let clicks = 50;
let liked_post = false;
let credentials = {
    "hash_code" : "aViRBBjacJ",
    "username" : "demoUser4"
}
let likeThis = new Map();

function liked(element) {
    element.classList.toggle("liked");
    if(!likeThis.has(element)){
        console.log("ROCK");
        likeThis.set(element, 1);
        sendUpdateEventRequest("Like");
    } else {
        if (likeThis.get(element) % 2 === 0) {
            likeThis.set(element, likeThis.get(element) + 1);
            sendUpdateEventRequest("Like");
        }
        else {
            likeThis.set(element, likeThis.get(element) - 1);
        }
    }

    [].forEach.call(element.childNodes, function(child) {
        console.log(child.tagName);
        child.innerText = 50 + likeThis.get(element);
    });
}


function setAddCommentPrintable(element) {
    let parent = element.parentElement.parentElement.parentElement;
    let exists = false;
    let foundChild;
    [].forEach.call(parent.childNodes, function(child) {
        console.log(child.tagName);
        if (child.className === "comment-input") {
            exists = true;
            foundChild = child;
        }
    });
    if (!exists) {
        let commentInputDiv = document.createElement("div");
        commentInputDiv.classList.add("comment-input");

        let profilePhoto = document.createElement("img");
        profilePhoto.src = "./Resources/pig.webp";
        profilePhoto.alt = "profile photo";
        profilePhoto.classList.add("comment-photo");

        let newChild = document.createElement("textarea");
        newChild.classList.add("comment-textarea");
        commentInputDiv.appendChild(profilePhoto);
        commentInputDiv.appendChild(newChild);
        newChild.placeholder = "Add a comment...";
        parent.appendChild(commentInputDiv);
        sendUpdateEventRequest("Comment");
    }
    else {
        parent.removeChild(foundChild);
    }
}

function sendUpdateEventRequest(event_name) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log("request sent");
        } else if(this.readyState === 4) {
            alert("Someting went wrong!");
        }
    };

    xhttp.open("PUT", "http://localhost:5002/services/username/update")
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({
        "event_name" : event_name,
        ...credentials
    }));
}

function showPopup(element) {
    let formPopup = element.parentElement.childNodes[3];
    formPopup.style.display = "block";

}

function hidePopup(element) {
    let parent = element.parentElement;
    parent.style.display = "none";
}