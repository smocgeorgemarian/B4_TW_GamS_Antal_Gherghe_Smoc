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
        if (child.tagName === "TEXTAREA") {
            exists = true;
            foundChild = child;
        }
    });
    if (!exists) {
        let newChild = document.createElement("textarea");
        newChild.style.width = "80%";
        newChild.style.height = "20%";
        newChild.style.resize = "none";
        parent.appendChild(newChild);
    }
    else {
        parent.removeChild(foundChild);
    }

}