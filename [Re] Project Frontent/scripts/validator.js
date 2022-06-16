let OK_CHECK = "OK";

function validateService(element, index) {
    let form = element.firstChild;
    let firstInput = form.childNodes[0];
    let secondInput = form.childNodes[2];
    if (firstInput.value.length === 0) return "Service Name with index " + index + " not provided!";
    if (secondInput.value.length === 0) return "MileStone with index " + index + " not provided!";
    return OK_CHECK;
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
    let content = expression.firstChild.value;
    let regex = /^((\((\w+(\s\&\s\w+)*)\))(\s\|\s(\((\w+(\s\&\s\w+)*)\))+)*)$/;
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
    return OK_CHECK;
}

function validateAll() {
    let children = document.getElementById("list").childNodes;
    for (let childIndex = 0; childIndex < children.length; childIndex++) {
        let verdict = validateService(children[childIndex], childIndex + 1);
        if (verdict !== OK_CHECK) {
            showInfoBox(verdict);
            break;
        }
    }


    optionsList = getOptionsList(children);
    children = document.getElementById("expressions").childNodes;
    for (let childIndex = 0; childIndex < children.length; childIndex++) {
        let verdict = validateExpression(children[childIndex], optionsList, childIndex + 1);
        if (verdict !== OK_CHECK) {
            showInfoBox(verdict);
            break;
        }
    }
}