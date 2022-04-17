
function getInputValue(){
    var name = document.getElementById("nickname").value;
    var email = document.getElementById("email").value;
    var cemail = document.getElementById("cemail").value;
    var pass = document.getElementById("password").value;
    var cpass = document.getElementById("cpassword").value;

    if(!name || !email || !cemail || !pass || !cpass){
        alert("All fields must be ");
        return;
    }

    if(email != cemail){
        alert("Email differs from confirm email!");
        return;
    }
    if(pass != cpass) {
        alert("Password differs from confirm password!");
        return;
    }
    document.getElementById("refresh").click();
}