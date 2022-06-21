let isToBeDeleted = false;
let isOpen = {
    "eye": false, "trophy": false
}
let credentials = {};

function setPageUp() {
    if (document.cookie)
        credentials["hash_code"] = document.cookie.split(";")[0]
            .split('=')[1];
    else
        window.location.href = './../sources/uShallNotPass.html';
}

//LIST ARRANGEMENT
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

//ADD EVENT FORM
function setListExample(target) {
    let liExample = document.createElement("li");
    let listExample = document.createElement("form");
    listExample.draggable = true;
    listExample.classList.add("listExample");

    let input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("placeholder", "Service Name")
    input1.setAttribute("maxlength", "20");
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
    input2.setAttribute("type", "number");
    input2.setAttribute("placeholder", "Add new milestone");
    input2.setAttribute("min", "0");
    input2.setAttribute("max", "999999999")
    listExample.appendChild(input2);

    let input3 = document.createElement("input");
    input3.setAttribute("type", "number");
    input3.setAttribute("placeholder", "Add new xp value");
    input3.setAttribute("min", "0");
    input3.setAttribute("max", "999999999")
    listExample.appendChild(input3);

    liExample.setAttribute("onclick", "deleteItselfIfNeeded(this)");
    liExample.appendChild(listExample);
    target.appendChild(liExample);
}

function initList() {
    let target = document.getElementById("list");
    window.addEventListener("DOMContentLoaded", () => {
        setListArrangable(target);
    });
    for (let index = 0; index < 0; index++) setListExample(target, index);
}

let menuOptions = ["fa fa-arrow-left", "fa fa-plus", "fa fa-minus", "fa fa-eye", "fa fa-link", "fa fa-plus", "fa fa-gift", "fa fa-gamepad", "fa fa-trophy"];
let functionsList = ["getBackToIndex()", "addList()", "deleteList(this)", "loadDatabase()", "linkLi()", "createExpr()", "loadRewards()", "loadLevels()", "loadTop()"];
let infoList = ["Get Back To Index", "Add Event", "Remove Any Element", "View Events", "Generate Reward List", "Add Reward", "View Rewards", "View Levels", "Top Users"]

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

//INIT MENU
function initMenu() {
    let menu = document.getElementById("menu");
    menu.classList.add("menu");
    for (let menuIndex = 0; menuIndex < menuOptions.length; menuIndex++) {
        let liMenu = document.createElement("li");
        let iMenu = document.createElement("i");
        iMenu.setAttribute("class", menuOptions[menuIndex]);
        iMenu.setAttribute("onclick", functionsList[menuIndex]);

        iMenu.classList.add("tooltip");
        let span = document.createElement("span");
        span.classList.add("tooltiptext");
        span.textContent = infoList[menuIndex];
        iMenu.appendChild(span);

        liMenu.appendChild(iMenu);
        menu.appendChild(liMenu);
    }
}

//BUTTON HOVER OVER
function showInfoBox(message) {
    let previousBoxes = document.getElementsByClassName("box");
    if (previousBoxes.length !== 0) {
        for (let boxIndex = 0; boxIndex < previousBoxes.length; boxIndex++) previousBoxes[boxIndex].remove();
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

function loadDatabase() {
    sendContent(credentials, "POST", "http://localhost:5000/users/events", setDataPrintable, {"table": "eye"});
}

//PRINT HEADER
function setHeaderPrintableForTable(table, content) {
    let tr = document.createElement("tr");
    if (content.message.length === 0) return;
    let fields = content.message[0];
    for (let field in fields) {
        let th = document.createElement("th");
        th.textContent = field;
        tr.appendChild(th);
    }
    table.appendChild(tr);
}

//PRINT TABLE
function setDataPrintable(content, button) {
    let btn = document.getElementsByClassName("fa fa-" + button)[0];
    btn.classList.toggle("redEye");
    let buttonTmp = button;
    if (isOpen[buttonTmp]) {
        isOpen[buttonTmp] = false;
        let table = document.getElementById(buttonTmp);
        table.remove();
        let buttonToBeRemoved = document.getElementById("button" + buttonTmp);
        buttonToBeRemoved.remove();
        return;
    }
    isOpen[buttonTmp] = true;
    let table = document.createElement("table")
    table.id = buttonTmp;
    setHeaderPrintableForTable(table, content);
    for (let i = 0; i < content.message.length; i++) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        for (let key in content.message[i]) {
            let td = document.createElement("td");
            td.textContent = content.message[i][key];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.body.appendChild(table);

    let exportButton = document.createElement("button");
    exportButton.textContent = "Export";
    exportButton.id = "button" + buttonTmp;
    exportButton.onclick = (e) => {
        let table = document.getElementById(buttonTmp);
        let children = table.childNodes;
        let content = '';
        for (let trIndex = 0; trIndex < children.length; trIndex++) {
            for (let tdIndex = 0; tdIndex < children[trIndex].childNodes.length; tdIndex++) {
                content += children[trIndex].childNodes[tdIndex].textContent;
                if (tdIndex !== children[trIndex].childNodes.length - 1)
                    content += ', ';
            }
            content += '\n';
        }

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', 'bd.csv');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };
    document.body.appendChild(exportButton);
}


//CALL TO API GET REWARDS
function loadRewards() {
    sendContent(credentials, "POST", "http://localhost:5000/users/rewards", setDataPrintable, {"table": "gift"});
}

//CALL TO API GET LEVELS
function loadLevels() {
    sendContent(credentials, "POST", "http://localhost:5000/users/levels", setDataPrintable, {"table": "gamepad"});
}

//CALL TO API GET TOP
function loadTop() {
    sendContent(credentials, "POST", "http://localhost:5000/users/top", setDataPrintable, {"table": "trophy"});
}

//CALL TO API FOR DELETE
function deleteElement() {
    let inputs = document.getElementsByClassName("deleteInput");
    let inputValue = inputs[0].value;

    let deleteOption = document.getElementById("deleteOption").value;

    let content, url;
    if (deleteOption === "Service") {
        content = {"event_name": inputValue, ...credentials};
        url = "http://localhost:5001/services/delete/event";
    }
    else if (deleteOption === "Level"){
        content = {"level_name": inputValue, ...credentials};
        url = "http://localhost:5001/services/delete/level";
    }
    else if (deleteOption === 'Reward') {
        content = {"reward_name": inputValue, ...credentials};
        url = "http://localhost:5001/services/delete/reward";
    }
    else{
        content = {...credentials, "username": inputValue};
        url = "http://localhost:5002/services/username/delete";
    }
    sendContent(content, "DELETE", url);
}

function initDelete() {
    let doc = document.getElementById("deleteData");
    let input = document.createElement("input");
    input.placeholder = "Name of element...";
    input.classList.add("deleteInput");
    doc.appendChild(input);
    doc.classList.add("deleteData");

    let selectDeleteOption = document.createElement("select");
    selectDeleteOption.id = "deleteOption";
    let deleteOptions = ["Service", "Reward", "Level", "User"];
    for (let index = 0; index < deleteOptions.length; index++) {
        let option = document.createElement("option");
        option.textContent = deleteOptions[index];
        selectDeleteOption.appendChild(option);
    }
    doc.appendChild(selectDeleteOption);

    let i = document.createElement("i");
    i.setAttribute("class", "fa fa-trash");
    i.setAttribute("onclick", "deleteElement()");
    i.ariaHidden = true;

    i.classList.add("tooltip");
    let span = document.createElement("span");
    span.classList.add("tooltiptext");
    span.textContent = "Delete Element";
    i.appendChild(span);

    doc.appendChild(i);
}

//CALL TO API FOR UPDATE REWARD
function updateElement() {
    let inputs = document.getElementsByClassName("deleteInput");
    let inputValue = inputs[1].value;

    let updateValue = inputs[2].value;
    let content = {
        "reward_name" : inputValue,
        ...credentials,
        "new_reward" : updateValue
    }

    sendContent(content, "PUT", "http://localhost:5001/services/update/reward");
}

//CALL TO API FOR UPDATE LEVEL
function updateLevelElement() {
    let inputs = document.getElementsByClassName("deleteLevelInput");
    let inputValue = inputs[0].value;

    let updateName = inputs[1].value ? inputs[1].value : 'NULL';
    let updateValue = inputs[2].value ? inputs[2].value : -1;
    let updateDesc = inputs[3].value ? inputs[3].value : 'NULL';
    let content = {
        "level_name" : inputValue,
        ...credentials,
        "new_name" : updateName,
        "new_value" : updateValue,
        "new_description" : updateDesc
    }

    sendContent(content, "PUT", "http://localhost:5001/services/update/level");
}

function initUpdate() {
    let doc = document.getElementById("updateData");
    doc.classList.add("deleteData");

    let input = document.createElement("input");
    input.placeholder = "Reward...";
    input.classList.add("deleteInput");
    doc.appendChild(input);

    input = document.createElement("input");
    input.placeholder = "New reward name...";
    input.classList.add("deleteInput");
    doc.appendChild(input);

    let i = document.createElement("i");
    i.setAttribute("class", "fa fa-refresh");
    i.setAttribute("onclick", "updateElement()");
    i.ariaHidden = true;
    i.classList.add("tooltip");
    let span = document.createElement("span");
    span.classList.add("tooltiptext");
    span.textContent = "Update Element";
    i.appendChild(span);

    doc.appendChild(i);
}

function initLevelUpdate() {
    let doc = document.getElementById("updateDataLevel");
    doc.classList.add("deleteLevelData");

    let input = document.createElement("input");
    input.placeholder = "Level name...";
    input.classList.add("deleteLevelInput");
    doc.appendChild(input);

    input = document.createElement("input");
    input.placeholder = "New name...";
    input.classList.add("deleteLevelInput");
    doc.appendChild(input);

    input = document.createElement("input");
    input.setAttribute("type", "number");
    input.placeholder = "New value...";
    input.classList.add("deleteLevelInput");
    doc.appendChild(input);

    input = document.createElement("input");
    input.placeholder = "New description...";
    input.classList.add("deleteLevelInput");
    doc.appendChild(input);

    let i = document.createElement("i");
    i.setAttribute("class", "fa fa-refresh");
    i.setAttribute("onclick", "updateLevelElement()");
    i.ariaHidden = true;
    i.classList.add("tooltip");
    let span = document.createElement("span");
    span.classList.add("tooltiptext");
    span.textContent = "Update Element";
    i.appendChild(span);

    doc.appendChild(i);
}

function getBackToIndex() {
    window.location.href = './../sources/index.html';
}
setPageUp();
initList();
initMenu();
initDelete();
initUpdate();
initLevelUpdate();