
function setAddSettingsPrintable() {
    let parent = document.getElementById("settings");
    let exists = false;
    let foundChild;
    [].forEach.call(parent.childNodes, function(child) {
        console.log(child.tagName);
        if (child.className === "settings") {
            exists = true;
            foundChild = child;
        }
    });
    if(!exists){
        let settingsDiv = document.createElement("div");
        settingsDiv.classList.add("settings");

        let ul = document.createElement("ul");
        let li = document.createElement("li");

        let lable = document.createElement("lable");
        let checkbox = document.createElement("input");
            checkbox.type = "checkbox";

        let text = document.createTextNode("setting_1");
        li.appendChild(checkbox);
        li.appendChild(text);
        ul.appendChild(li);
        settingsDiv.appendChild(ul);
        parent.appendChild(settingsDiv);

    }else{
        parent.removeChild(foundChild);
    }
}

// <ul>
//     <li><label className="ReportRadioButton"><input type="checkbox">Nudity</label></li>
//     <li><label className="ReportRadioButton"> <input type="checkbox">Bad Words</label></li>
//     <li><label className="ReportRadioButton"><input type="checkbox">Religious propaganda</label></li>
// </ul>
