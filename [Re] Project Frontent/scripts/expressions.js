function getOperandsList() {
    // let list = document.getElementById("list").childNodes;
    // let returnList = [];
    // list.forEach((child) => returnList.push(child.));
    // return returnList;
    return ["a", "b", "c"];
}

operandsOptions = ["and", "or", "not"];

function createExpr() {
    let ulExpressions = document.getElementById("expressions");
    // ulExpressions.classList.add("expressions");

    let liExpression = document.createElement("li");
    liExpression.classList.add("exprList")

    let ulInsideLi = document.createElement("ul");
    ulInsideLi.classList.add("menu");

    let inputExample2 = document.createElement("select");
    let options2 = ["Reward", "Level"];
    for (let index = 0; index < options2.length; index++) {
        let option = document.createElement("option");
        option.textContent = options2[index];
        inputExample2.appendChild(option);
    }
    ulInsideLi.appendChild(inputExample2);

    let tmpLi = document.createElement("li")
    let input = document.createElement("input");
    input.classList.add("expression");
    input.placeholder = "Expression/Level Value"
    tmpLi.appendChild(input);
    ulInsideLi.appendChild(tmpLi);


    tmpLi = document.createElement("li")
    input = document.createElement("input");
    tmpLi.appendChild(input);
    input.classList.add("badgeName");
    input.placeholder = "Badge Name/Level Name";
    ulInsideLi.appendChild(tmpLi);

    tmpLi = document.createElement("li")
    input = document.createElement("input");
    tmpLi.appendChild(input);
    input.classList.add("badgeName");
    input.placeholder = "Reward/Description";
    ulInsideLi.appendChild(tmpLi);


    // let tmpLi = document.createElement("li")
    // let input = document.createElement("input");
    // input.classList.add("expression");
    // tmpLi.appendChild(input);
    // ulInsideLi.appendChild(tmpLi);

    liExpression.appendChild(ulInsideLi);
    liExpression.setAttribute("onclick", "deleteItselfIfNeeded(this)");
    ulExpressions.appendChild(liExpression);

}

function clearPreviousList() {
    let expression = document.getElementById("expressions");
    while (expression.firstChild) {
        expression.removeChild(expression.lastChild);
    }
}

function linkLi() {
    showInfoBox("Generating expression table...");
    clearPreviousList();
    let operandsList = getOperandsList();
    createExpr();
}

