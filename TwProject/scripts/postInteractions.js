//Like Manager
//de forma ca na
let clicks = 50;
let liked_post = false;


function liked() {
    const element = document.getElementById("like");
    element.classList.toggle("liked");
    if(!liked_post){
        clicks += 1;
    }else{
        clicks -=1;
    }
    liked_post = !liked_post;
    document.getElementById("like_points").innerHTML = clicks;
}

function setAddCommentPrintable() {
    let element = document.getElementById("comm");
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