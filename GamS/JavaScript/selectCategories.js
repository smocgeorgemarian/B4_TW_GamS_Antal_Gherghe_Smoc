function fnChangeBorder(element) {
    alert(element.style.border);
    if (element.style.border !== "" && !element.style.border.includes("none"))
        element.style.border = "none";
    else
        element.style.border = "solid black";
}
