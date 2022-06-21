STATUS_MSG = {
    200: "Action performed successfully",
    403: "Access forbidden, maybe duplicated action",
    404: "Resource could not be found"
}

//VERIFY IF INPUT PROVIDED
function validateService(element, index) {
    let form = element.firstChild;
    let firstInput = form.childNodes[0];
    let secondInput = form.childNodes[2];
    if (firstInput.value.length === 0) return "Service with index " + index + " not provided!";
    if (secondInput.value.length === 0) return "MileStone with index " + index + " not provided!";
    return "OK";
}

function getOptionsList(children) {
    let optionList = [];
    for (let childIndex = 0; childIndex < children.length; childIndex++) {
        let option = children[childIndex].firstChild.firstChild.value;
        optionList.push(option);
    }
    return optionList;
}

function isAnOption(word, wordsList) {
    for (let i = 0; i < wordsList.length;  i++) {
        if (word === wordsList[i]) return true;
    }
    return false;
}

function validateExpression(expression, optionsList, index) {
    expression = expression.firstChild.childNodes[1]
    let content = expression.firstChild.value;
    let regex = /^((\(([A-Za-z]\w*(\s\$\s[A-Za-z]\w*)*)\))(\s\|\s(\(([A-Za-z]\w*(\s\$\s[A-Za-z]\w*)*)\))+)*)$/;
    let letterRegex = /\w/;
    if (!regex.test(content)) return "Invalid expression with index " + index;
    let newWord = "";
    let isLetter = false;
    return "OK";
}

//CALL API CONTROLLER
function sendContent(content, method, url, doSomething = null, doSomethingParameter = null) {
    let xhttp = new XMLHttpRequest();
    let mustBeGreen = false;
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                mustBeGreen = true;
                if (doSomething && doSomethingParameter.hasOwnProperty("table"))
                    doSomething(JSON.parse(xhttp.responseText), doSomethingParameter["table"])
            } else showInfoBox(STATUS_MSG[this.status]);
            if (doSomething && doSomethingParameter.hasOwnProperty("index")) {
                doSomething(doSomethingParameter["index"], mustBeGreen);
            }
        }
    };

    xhttp.open(method, url)
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(content))
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function setIsValidatedPrintable(index, mustBeGreen) {
    let services = document.getElementById("list").childNodes[index].firstChild;
    let lastChild = services.childNodes[services.childNodes.length - 1];

    if (lastChild.nodeName === "I")
        lastChild.remove();

    let check = document.createElement("i");
    let btnType = mustBeGreen === true ? "fa fa-check greenBtn" : "fa fa-times redBtn";
    check.setAttribute("class", btnType);

    check.ariaHidden = true;
    services.appendChild(check);
}

function setIsValidatedExprPrintable(index, mustBeGreen) {
    let services = document.getElementById("expressions").childNodes[index].firstChild;
    let lastChild = services.childNodes[services.childNodes.length - 1];

    if (lastChild.firstChild.nodeName === "I")
        lastChild.remove();

    let li = document.createElement("li");
    let check = document.createElement("i");
    let btnType = mustBeGreen === true ? "fa fa-check greenBtn" : "fa fa-times redBtn";
    check.setAttribute("class", btnType);

    check.ariaHidden = true;
    li.appendChild(check);
    services.appendChild(li);
}

function addNewService(serviceData, index) {
    let inputForm = serviceData.firstChild.childNodes;

    let content = {
        ...credentials,
        'event_name': inputForm[0].value,
        'event_type': inputForm[1].value,
        'event_value': inputForm[2].value,
        'event_xp': inputForm[3].value
    }
    sendContent(content, "PUT","http://localhost:5001/services/add/event", setIsValidatedPrintable, index);
}

//CALL TO API ADD REWARD
function addNewBadge(expressionList, index) {
    let father = expressionList.firstChild;
    expressionList = expressionList.firstChild.childNodes
    let content = {
        ...credentials,
        'reward_name': expressionList[2].firstChild.value,
        'condition': expressionList[1].firstChild.value,
        'reward': expressionList[3].firstChild.value
    }
    let loadingDiv = document.createElement("div");
    loadingDiv.classList.add("lds-roller");
    for (let divIndex = 0; divIndex < 8; divIndex++) {
        let tmpDiv = document.createElement("div");
        loadingDiv.appendChild(tmpDiv);
    }
    if (expressionList[expressionList.length - 1].firstChild.nodeName === 'I')
        expressionList[expressionList.length - 1].remove();
    father.appendChild(loadingDiv);
    sleep(4500).then(() => {
        loadingDiv.remove();
        sendContent(content, "PUT", "http://localhost:5001/services/add/reward", setIsValidatedExprPrintable, index)
    });
}

//CALL TO API ADD LEVEL
function addNewLevel(expressionList, index) {
    let father = expressionList.firstChild;
    expressionList = expressionList.firstChild.childNodes
    let content = {
        ...credentials,
        'level_name': expressionList[2].firstChild.value,
        'level_value': parseInt(expressionList[1].firstChild.value),
        'description': expressionList[3].firstChild.value
    }
    let loadingDiv = document.createElement("div");
    loadingDiv.classList.add("lds-roller");
    for (let divIndex = 0; divIndex < 8; divIndex++) {
        let tmpDiv = document.createElement("div");
        loadingDiv.appendChild(tmpDiv);
    }
    if (expressionList[expressionList.length - 1].firstChild.nodeName === 'I')
        expressionList[expressionList.length - 1].remove();
    father.appendChild(loadingDiv);
    sleep(4500).then(() => {
        loadingDiv.remove();
        sendContent(content, "PUT", "http://localhost:5001/services/add/level", setIsValidatedExprPrintable, index)
    });
}

//VALIDATE FACADE
function validateAll() {
    let childrenServices = document.getElementById("list").childNodes;
    for (let childIndex = 0; childIndex < childrenServices.length; childIndex++) {
        let verdict = validateService(childrenServices[childIndex], childIndex + 1);
        if (verdict !== "OK") {
            showInfoBox(verdict);
            return;
        }
    }

    optionsList = getOptionsList(childrenServices);
    let childrenExpressions = document.getElementById("expressions").childNodes;
    for (let childIndex = 0; childIndex < childrenExpressions.length; childIndex++) {
        if(childrenExpressions[childIndex].childNodes[0].firstChild.value === "Reward"){
            let verdict = validateExpression(childrenExpressions[childIndex], optionsList, childIndex + 1);
            if (verdict !== "OK") {
                showInfoBox(verdict);
                return;
            }
        }
    }

    for (let childIndex = 0; childIndex < childrenServices.length; childIndex++) {
        addNewService(childrenServices[childIndex], {"index": childIndex});
    }

    for (let childIndex = 0; childIndex < childrenExpressions.length; childIndex++) {
        if(childrenExpressions[childIndex].childNodes[0].firstChild.value === "Reward"){
            addNewBadge(childrenExpressions[childIndex], {"index": childIndex});
        }else{
            addNewLevel(childrenExpressions[childIndex], {"index": childIndex});
        }
    }
}