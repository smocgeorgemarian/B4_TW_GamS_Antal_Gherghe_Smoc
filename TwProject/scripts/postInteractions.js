//Like Manager
//de forma ca na
let clicks = 50;
let liked_post = false;


function liked(element) {
    element.classList.toggle("liked");
    if(!liked_post){
        clicks += 1;
    }else{
        clicks -=1;
    }
    liked_post = !liked_post;

    [].forEach.call(element.childNodes, function(child) {
        console.log(child.tagName);
        child.innerText = clicks;
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
        profilePhoto.src = "./images/profilePhoto.webp"
        profilePhoto.alt = "profile photo";
        profilePhoto.classList.add("comment-photo");

        let newChild = document.createElement("textarea");
        newChild.classList.add("comment-textarea");
        commentInputDiv.appendChild(profilePhoto);
        commentInputDiv.appendChild(newChild);
        newChild.placeholder = "Add a comment...";
        parent.appendChild(commentInputDiv);
    }
    else {
        parent.removeChild(foundChild);
    }
}

function showPopup(element) {
    let formPopup = element.parentElement.childNodes[3];
    formPopup.style.display = "block";

}

function hidePopup(element) {
    let parent = element.parentElement;
    parent.style.display = "none";
}