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
                    i.parentNode.insertBefore(current, i);
                }
            }
        };
    }
}

function getNextLi(type) {
    let liEventName = document.createElement("li");
    let labelEventName = document.createElement("label");
    let inputEventName = document.createElement("input");
    inputEventName.placeholder = type;
    labelEventName.appendChild(inputEventName);
    liEventName.appendChild(labelEventName);
    return liEventName;
}

function setListExample(target, type) {
    let liExample = document.createElement("li");
    let listExample = document.createElement("ul");
    listExample.draggable = true;
    listExample.classList.add("listExample");
    listExample.appendChild(getNextLi(type));
    listExample.appendChild(getNextLi(type));
    listExample.appendChild(getNextLi(type));
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

initList();