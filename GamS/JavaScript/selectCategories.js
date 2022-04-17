function fnChangeBorder(element) {
    if (element.style.border !== "" && !element.style.border.includes("white"))
        element.style.border = "solid white";
    else
        element.style.border = "solid black";
}
