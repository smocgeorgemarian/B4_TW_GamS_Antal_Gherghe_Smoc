let isToBeDeleted = false;

function setListArrangable(target) {
    target.classList.add("list");
    let items = target.querySelectorAll(":scope > *"), current = null;
    for (let i of items) {
        i.draggable = true;
        i.ondragstart = () => {
            current = i;
            for (let it of items) {
                if (it !== current) {
                    it.classList.add("hint");
                }
            }
        };

        i.ondragenter = () => {
            if (i !== current) {
                i.classList.add("active");
            }
        };

        i.ondragleave = () => {
            i.classList.remove("active");
        };

        i.ondragend = () => {
            for (let it of items) {
                it.classList.remove("hint");
                it.classList.remove("active");
            }
        };

        i.ondragover = (evt) => {
            evt.preventDefault();
        };

        i.ondrop = (evt) => {
            evt.preventDefault();
            if (i !== current) {
                let currentpos = 0, droppedpos = 0;
                for (let it = 0; it < items.length; it++) {
                    if (current === items[it]) {
                        currentpos = it;
                    }
                    if (i === items[it]) {
                        droppedpos = it;
                    }
                }

                if (currentpos < droppedpos) {
                    i.parentNode.insertBefore(current, i.nextSibling);
                } else {
                    i.parentNode.insertBefore(i, current.nextSibling);
                }
            }
        };
    }
}

function setListExample(target, type) {
    let liExample = document.createElement("li");
    let listExample = document.createElement("form");
    listExample.draggable = true;
    listExample.classList.add("listExample");

    let input1=document.createElement("input");
    input1.setAttribute("type","text");
    input1.setAttribute("placeholder","Service Name")
    input1.setAttribute("maxlength","20");
    listExample.appendChild(input1);

    let inputExample = document.createElement("select");
    let options = ["Time", "Sum", "Count"];
    for (let index = 0; index < options.length; index++) {
        let option = document.createElement("option");
        option.textContent = options[index];
        inputExample.appendChild(option);
    }
    listExample.appendChild(inputExample);

    let input2 = document.createElement("input");
    input2.setAttribute("type","number");
    input2.setAttribute("placeholder","Add new milestone");
    input2.setAttribute("min","0");
    input2.setAttribute("max","999999999")
    listExample.appendChild(input2);

    let saveButton = document.createElement("input");
    saveButton.setAttribute("type","submit");
    saveButton.setAttribute("value","Save");
    listExample.appendChild(saveButton);

    liExample.setAttribute("onclick", "deleteItselfIfNeeded(this)");
    liExample.appendChild(listExample);
    target.appendChild(liExample);
}

function initList() {
    let target = document.getElementById("list");
    window.addEventListener("DOMContentLoaded", () => {
        setListArrangable(target);
    });
    for (let index = 0; index < 3; index++)
        setListExample(target, index);
    // setListExample(target);
    // setListExample(target);
}

let menuOptions = ["fa fa-plus", "fa fa-minus", "fa fa-link", "fa fa-plus"];
let functionsList = ["addList()", "deleteList(this)", "linkLi()", "createExpr()"];

function addList() {
    showInfoBox("Badge created successfully!");
    let target = document.getElementById("list");
    setListExample(target, "test");
}

function deleteItselfIfNeeded(target) {
    if (isToBeDeleted) {
        target.remove();
        showInfoBox("Badge deleted successfully!");
        document.getElementById("pressedDelete").removeAttribute("id");
    }
    isToBeDeleted = false;
}

function deleteList(target) {
    showInfoBox("Select the badge to be deleted.");
    isToBeDeleted = true;
    target.id = "pressedDelete";
}


let optionsList = ["and", "or", "not"];


function initMenu() {
    let menu = document.getElementById("menu");
    menu.classList.add("menu");
    for (let menuIndex = 0; menuIndex < menuOptions.length; menuIndex++) {
        let liMenu = document.createElement("li");
        let iMenu = document.createElement("i");
        iMenu.setAttribute("class", menuOptions[menuIndex]);
        iMenu.setAttribute("onclick", functionsList[menuIndex]);
        liMenu.appendChild(iMenu);
        menu.appendChild(liMenu);
    }
}

function showInfoBox(message) {
    let previousBoxes = document.getElementsByClassName("box");
    if (previousBoxes.length !== 0) {
        for (let boxIndex = 0; boxIndex < previousBoxes.length; boxIndex++)
            previousBoxes[boxIndex].remove();
    }

    let box = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = message;
    box.classList.add("box");
    box.appendChild(p);
    document.body.appendChild(box);
    setTimeout(() => {
        box.remove();
    }, 3000);
}

initList();
initMenu();