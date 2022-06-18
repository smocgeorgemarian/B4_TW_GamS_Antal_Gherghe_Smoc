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

    let ulInsideLi = document.createElement("ul");
    ulInsideLi.classList.add("menu");

    let tmpLi = document.createElement("li")
    let input = document.createElement("input");
    input.classList.add("expression");
    input.placeholder = "Expression"
    tmpLi.appendChild(input);
    ulInsideLi.appendChild(tmpLi);


    tmpLi = document.createElement("li")
    input = document.createElement("input");
    tmpLi.appendChild(input);
    input.classList.add("badgeName");
    input.placeholder = "Badge Name";
    ulInsideLi.appendChild(tmpLi);

    tmpLi = document.createElement("li")
    input = document.createElement("input");
    tmpLi.appendChild(input);
    input.classList.add("badgeName");
    input.placeholder = "Reward";
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

