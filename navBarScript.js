#NavBar {
    width: 100%;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: grey;
    opacity: 80%;
}

li.Normal-link {
    float: left;
}

li a, .dropbtn {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover, .Dropdown:hover .dropbtn {
    background-color: red;
}

li.Dropdown {
    float: right;
}

.Dropdown-content {
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.Dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.Dropdown-content a:hover {
    background-color: #f1f1f1;
}

.Dropdown:hover .Dropdown-content {
    display: block;
}

.search-container {
    float: right;
}

#NavBar input[type=text] {
    padding: 6px;
    margin-top: 8px;
    font-size: 17px;
    border: none;
}

#NavBar .search-container button {
    float: right;
    padding: 6px 10px;
    margin-top: 8px;
    margin-right: 16px;
    background: #ddd;
    font-size: 17px;
    border: none;
    cursor: pointer;
}

#NavBar .search-container button:hover {
    background: #ccc;
}