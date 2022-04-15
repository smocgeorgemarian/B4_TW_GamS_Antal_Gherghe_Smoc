function fnChangeBorder(element) {
    if (element.style.border !== "" && element.style.border !== 'none')
        element.style.border = "none";
    else
        element.style.border = "solid #000000";
}
