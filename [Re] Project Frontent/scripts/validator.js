
function validateService(element, index) {
    let form = element.firstChild;
    let firstInput = form.childNodes[0];
    let secondInput = form.childNodes[2];
    if (firstInput.value.length === 0) return "Service Name with index " + index + " not provided!";
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
        console.log("Word: " + wordsList[i]);
        if (word === wordsList[i]) return true;
    }
    return false;
}

function validateExpression(expression, optionsList, index) {
    expression = expression.firstChild.firstChild
    console.log(expression)
    let content = expression.firstChild.value;
    let regex = /^((\((\w+(\s&\s\w+)*)\))(\s\|\s(\((\w+(\s&\s\w+)*)\))+)*)$/;
    let letterRegex = /\w/;
    if (!regex.test(content)) return "Invalid expression with index " + index;
    let newWord = "";
    console.log("test");
    let isLetter = false;
    for (let letter in content) {
        console.log(content[letter]);
        if (letterRegex.test(content[letter])) {
            newWord += content[letter];
            isLetter = true;
        } else {
            console.log("word : " + newWord);
            if (isLetter && !isAnOption(newWord, optionsList))
                return "Invalid badge: " + newWord + " found at index " + index;
            newWord = "";
            isLetter = false;
        }
    }
    return "OK";
}

function addNewService(serviceData) {
    let inputForm = serviceData.firstChild.childNodes;
    let hashcode = "FTWvyYAaAI"

    let content = {
        'hash_code': hashcode,
        'event_name': inputForm[0].value,
        'event_type': inputForm[1].value,
        'event_value': inputForm[2].value
    }

    // fetch("http://localhost:5000/services/add/event", {
    //     method: 'PUT',
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: JSON.stringify(content)
    // })
    //     .then(function(response) {
    //         console.log("O ce tiganca frumoasa")
    //     })
    //     .catch(function(error) {
    //         console.log("Filme de groaza")
    //     })

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log("ready")
        }
    };
    console.log(content)
    xhttp.open("PUT", "http://localhost:5000/services/add/event")
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(content))
}

function validateAll() {
    let childrenServices = document.getElementById("list").childNodes;
    for (let childIndex = 0; childIndex < childrenServices.length; childIndex++) {
        let verdict = validateService(childrenServices[childIndex], childIndex + 1);
        if (verdict !== "OK") {
            showInfoBox(verdict);
            break;
        }
    }

    optionsList = getOptionsList(childrenServices);
    let childrenExpressions = document.getElementById("expressions").childNodes;
    for (let childIndex = 0; childIndex < childrenExpressions.length; childIndex++) {
        let verdict = validateExpression(childrenExpressions[childIndex], optionsList, childIndex + 1);
        if (verdict !== "OK") {
            showInfoBox(verdict);
            break;
        }
    }

    for (let childIndex = 0; childIndex < childrenServices.length; childIndex++) {
        addNewService(childrenServices[childIndex]);
    }

}